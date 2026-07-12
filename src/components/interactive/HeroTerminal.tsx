import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Lúmen terminal (redesign 2026-07, v2): the site's proof-of-craft is a REAL
 * conversation with Matheus's AI agent. Three answer layers:
 *
 *   1. Commands (help/work/contact/langs/uptime/joke/clear) — instant, local.
 *   2. Confident semantic match — the in-browser embedding engine
 *      (src/lib/ask) answers from the human-written fact corpus, in the
 *      asker's language. Free, offline after first load, hallucination-proof.
 *   3. Everything else escalates to the live bridge (chat.mwdeveloper.tech →
 *      Matheus's machine), where a rate-limited Claude worker answers from
 *      the same corpus in seconds. If the bridge is unreachable, we fall
 *      back to the best weak local match instead of failing.
 *
 * Free text auto-routes to layer 2/3 — visitors never need `ask` syntax.
 * No autofocus on load: focus only happens on explicit user intent.
 */

type Line = { id: number; kind: "input" | "output"; text: string };

type AskModule = {
  askPortfolio: (
    q: string,
    siteLang?: string,
  ) => Promise<{ answer: string; sources: string[]; confidence: number }>;
  preloadAsk?: () => Promise<void>;
};

// Resolves to {} while src/lib/ask.ts doesn't exist — zero build coupling.
const askLoaders = import.meta.glob([
  "../../lib/ask.ts",
  "../../lib/ask/index.ts",
]) as Record<string, () => Promise<AskModule>>;

const BRIDGE_URL = "https://chat.mwdeveloper.tech";
// Above this the local corpus answers alone; below it we go live first.
const LOCAL_CONFIDENT = 0.45;
// Weak-but-usable local floor (mirrors MIN_CONFIDENCE in the ask engine).
const LOCAL_FLOOR = 0.22;
const POLL_MS = 2500;
const POLL_BUDGET_MS = 75_000;
const SLOW_HINT_AFTER_MS = 12_000;

const KNOWN_COMMANDS = new Set([
  "help", "work", "contact", "langs", "lang", "uptime", "joke", "clear", "ask",
]);

// Free text that isn't a command is a question for Lúmen — visitors
// shouldn't need to learn syntax for the terminal to feel functional.
const looksLikeQuestion = (cmd: string) =>
  cmd.includes(" ") || cmd.endsWith("?") || cmd.length > 14;

const LANG_MAP: Record<string, string> = {
  en: "en",
  es: "es",
  pt: "pt-BR",
  "pt-br": "pt-BR",
  fr: "fr",
  de: "de",
};

const CHIPS = ["ask", "help", "uptime", "joke"] as const;

// Braille spinner, the real-CLI thinking indicator.
const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"] as const;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function getSessionId(): string {
  try {
    const existing = window.localStorage.getItem("mw-lumen-sid");
    if (existing && /^[a-z0-9]{16,32}$/.test(existing)) return existing;
    const sid = Array.from(crypto.getRandomValues(new Uint8Array(12)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    window.localStorage.setItem("mw-lumen-sid", sid);
    return sid;
  } catch {
    return `anon${Date.now().toString(16)}`;
  }
}

export function HeroTerminal({ focusOnMount = false }: { focusOnMount?: boolean }) {
  const { t, i18n } = useTranslation();

  const idRef = useRef(1);
  const nextId = () => idRef.current++;

  const [lines, setLines] = useState<Line[]>(() => [
    { id: 0, kind: "output", text: t("p.terminal.welcome") },
  ]);
  const [value, setValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  // Real terminals hold the caret solid while you type and resume blinking
  // when you pause — small detail, big "this is real" signal.
  const [typing, setTyping] = useState(false);
  const typingTimerRef = useRef<number>(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);

  const markTyping = () => {
    setTyping(true);
    window.clearTimeout(typingTimerRef.current);
    typingTimerRef.current = window.setTimeout(() => setTyping(false), 600);
  };

  const append = (kind: Line["kind"], text: string) =>
    setLines((prev) => [...prev, { id: nextId(), kind, text }]);

  const replaceLine = (id: number, text: string) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, text } : l)));

  // ── answer streaming (typewriter) + thinking spinner ──
  const spinnerRef = useRef<number | null>(null);
  const stopSpinner = () => {
    if (spinnerRef.current !== null) {
      window.clearInterval(spinnerRef.current);
      spinnerRef.current = null;
    }
  };
  const startSpinner = (lineId: number, label: () => string) => {
    stopSpinner();
    if (prefersReducedMotion()) {
      replaceLine(lineId, label());
      return;
    }
    let frame = 0;
    spinnerRef.current = window.setInterval(() => {
      frame = (frame + 1) % SPINNER.length;
      replaceLine(lineId, `${SPINNER[frame]} ${label()}`);
    }, 90);
  };

  const typeOut = (lineId: number, text: string) =>
    new Promise<void>((resolve) => {
      stopSpinner();
      if (prefersReducedMotion()) {
        replaceLine(lineId, text);
        resolve();
        return;
      }
      let i = 0;
      const step = () => {
        i = Math.min(text.length, i + 2 + Math.floor(Math.random() * 2));
        replaceLine(lineId, text.slice(0, i));
        if (i < text.length) window.setTimeout(step, 12);
        else resolve();
      };
      step();
    });

  const goTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  // Warm the embedding model on first real intent (focus). `askWarmRef` only
  // flips once model + index are fully ready — until then questions go
  // bridge-first so a cold visitor never waits for a 50MB model download.
  const preloadedRef = useRef(false);
  const askWarmRef = useRef(false);
  const askModRef = useRef<AskModule | null>(null);
  const preloadAskModule = () => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;
    const loader = Object.values(askLoaders)[0];
    void loader?.()
      .then(async (mod) => {
        askModRef.current = mod;
        await mod.preloadAsk?.();
        askWarmRef.current = true;
      })
      .catch(() => {
        preloadedRef.current = false;
      });
  };

  // ── live bridge (chat.mwdeveloper.tech → Lúmen on Matheus's machine) ──
  const askBridge = async (
    question: string,
    lang: string,
    onSlow: () => void,
  ): Promise<string> => {
    const post = await fetch(`${BRIDGE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question, sessionId: getSessionId(), lang }),
    });
    if (!post.ok && post.status !== 429) throw new Error(`bridge ${post.status}`);
    const data = (await post.json()) as
      | { status: "done"; answer: string }
      | { status: "queued"; id: string };
    if (data.status === "done") return data.answer;

    const started = Date.now();
    let slowShown = false;
    while (Date.now() - started < POLL_BUDGET_MS) {
      await new Promise((r) => setTimeout(r, POLL_MS));
      if (!slowShown && Date.now() - started > SLOW_HINT_AFTER_MS) {
        slowShown = true;
        onSlow();
      }
      const poll = await fetch(`${BRIDGE_URL}/reply/${data.id}`);
      if (!poll.ok) continue;
      const body = (await poll.json()) as { status: string; answer?: string };
      if (body.status === "done" && body.answer) return body.answer;
    }
    throw new Error("bridge timeout");
  };

  const handleAsk = async (question: string) => {
    if (!question) {
      append("output", t("p.terminal.askUsage"));
      return;
    }
    if (busy) {
      append("output", t("p.terminal.busy"));
      return;
    }
    setBusy(true);
    preloadAskModule();

    const lang = i18n.resolvedLanguage ?? "en";
    const pendingId = nextId();
    setLines((prev) => [...prev, { id: pendingId, kind: "output", text: "…" }]);

    const answerLocal = async () => {
      const mod = askModRef.current ?? (await Object.values(askLoaders)[0]?.());
      if (!mod) return null;
      return mod.askPortfolio(question, lang);
    };
    const showLocal = async (local: { answer: string; sources: string[] }) => {
      await typeOut(pendingId, local.answer);
      if (local.sources.length > 0) append("output", `· ${local.sources.join(" · ")}`);
    };
    const askLive = async () => {
      let slow = false;
      startSpinner(pendingId, () =>
        t(slow ? "p.terminal.thinkingSlow" : "p.terminal.thinking"),
      );
      const answer = await askBridge(question, lang, () => {
        slow = true;
      });
      await typeOut(pendingId, answer);
    };

    try {
      if (askWarmRef.current) {
        // Warm model: local corpus first (instant + free), bridge for the rest.
        let local: Awaited<ReturnType<typeof answerLocal>> = null;
        try {
          local = await answerLocal();
        } catch {
          local = null;
        }
        if (local && local.confidence >= LOCAL_CONFIDENT) {
          await showLocal(local);
        } else {
          try {
            await askLive();
          } catch {
            stopSpinner();
            if (local && local.confidence >= LOCAL_FLOOR) {
              replaceLine(pendingId, t("p.terminal.offline"));
              const answerId = nextId();
              setLines((prev) => [...prev, { id: answerId, kind: "output", text: "" }]);
              await typeOut(answerId, local.answer);
            } else {
              replaceLine(pendingId, t("p.terminal.askFail"));
            }
          }
        }
      } else {
        // Cold model: the live bridge answers in seconds while the model
        // downloads in the background for the next questions.
        try {
          await askLive();
        } catch {
          stopSpinner();
          try {
            const local = await answerLocal();
            if (local && local.confidence >= LOCAL_FLOOR) await showLocal(local);
            else replaceLine(pendingId, t("p.terminal.askFail"));
          } catch {
            replaceLine(pendingId, t("p.terminal.askFail"));
          }
        }
      }
    } finally {
      stopSpinner();
      setBusy(false);
    }
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    append("input", cmd);
    setCmdHistory((prev) => [...prev, cmd]);
    setHistIdx(null);

    const [head = "", ...rest] = cmd.split(/\s+/);
    switch (head.toLowerCase()) {
      case "help":
        append("output", t("p.terminal.help"));
        break;
      case "work":
        goTo("#work");
        append("output", "→ #work");
        break;
      case "contact":
        goTo("#contact");
        append("output", "→ #contact");
        break;
      case "uptime":
        append("output", t("p.terminal.uptime"));
        break;
      case "joke":
        append("output", t("p.terminal.joke"));
        break;
      case "langs":
        append("output", t("p.terminal.langs"));
        break;
      case "lang": {
        const target = LANG_MAP[(rest[0] ?? "").toLowerCase()];
        if (target) {
          void i18n.changeLanguage(target).then(() => {
            append("output", t("p.terminal.langDone"));
          });
        } else {
          append("output", t("p.terminal.langs"));
        }
        break;
      }
      case "clear":
        setLines([]);
        break;
      case "ask":
        void handleAsk(rest.join(" "));
        break;
      default:
        // Anything that reads as natural language is a question for Lúmen —
        // "quantos anos de experiência?" must just work, no syntax required.
        if (!KNOWN_COMMANDS.has(head.toLowerCase()) && looksLikeQuestion(cmd)) {
          void handleAsk(cmd);
        } else {
          append("output", t("p.terminal.unknown"));
        }
    }
  };

  // Keep the log pinned to the latest line.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines]);

  // Long input: keep the caret end of the mirror in view.
  useEffect(() => {
    const m = mirrorRef.current;
    if (m) m.scrollLeft = m.scrollWidth;
  }, [value]);

  // Never leak the spinner interval or the typing timer.
  useEffect(
    () => () => {
      stopSpinner();
      window.clearTimeout(typingTimerRef.current);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Command palette → "open terminal". The hidden breakpoint twin no-ops
  // (focus/scroll on display:none elements do nothing).
  useEffect(() => {
    const onFocusRequest = () => {
      rootRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "center",
      });
      inputRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener("mw:focus-terminal", onFocusRequest);
    return () => window.removeEventListener("mw:focus-terminal", onFocusRequest);
  }, []);

  // Only used by the mobile disclosure: opening it is an explicit user action,
  // so focusing is expected (never fires on page load).
  useEffect(() => {
    if (focusOnMount) inputRef.current?.focus({ preventScroll: true });
  }, [focusOnMount]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      if (cmdHistory.length === 0) return;
      e.preventDefault();
      const next = histIdx === null ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setValue(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      if (histIdx === null) return;
      e.preventDefault();
      const next = histIdx + 1;
      if (next >= cmdHistory.length) {
        setHistIdx(null);
        setValue("");
      } else {
        setHistIdx(next);
        setValue(cmdHistory[next]);
      }
    }
  };

  // Clicking anywhere on the terminal focuses the prompt, unless the user is
  // selecting text to copy.
  const focusPrompt = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Lúmen terminal"
      className="w-full overflow-hidden rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)] text-left shadow-[var(--shadow-card)]"
    >
      {/* Blink keyframes are scoped here so no shared CSS file is touched; the
          global prefers-reduced-motion rule freezes it into a solid block. */}
      <style>{`@keyframes mw-term-blink{0%,49%{opacity:1}50%,100%{opacity:0}}`}</style>

      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-[color:var(--color-border)] bg-white/[0.02] px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/60" />
        </span>
        <span className="mono ml-2 select-none text-[11px] text-[color:var(--color-text-dim)]">
          lumen@mwdeveloper:~
        </span>
        <span className="mono ml-auto select-none text-[10px] text-[color:var(--color-text-dim)]">
          Claude · Anthropic
        </span>
      </div>

      {/* Output log */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Lúmen terminal output"
        onClick={focusPrompt}
        className="max-h-52 min-h-[7.5rem] cursor-text space-y-1.5 overflow-y-auto px-3.5 py-3 lg:max-h-72 lg:min-h-[11rem]"
      >
        {lines.map((line) => (
          <p
            key={line.id}
            className="mono whitespace-pre-wrap break-words text-xs leading-relaxed"
          >
            {line.kind === "input" ? (
              <>
                <span className="text-[color:var(--color-ember-dim)]" aria-hidden>
                  ${" "}
                </span>
                <span className="text-[color:var(--color-text-bright)]">{line.text}</span>
              </>
            ) : (
              <span className="text-[color:var(--color-text)]">{line.text}</span>
            )}
          </p>
        ))}
      </div>

      {/* Suggestion chips */}
      <div aria-label="Suggested commands" className="flex flex-wrap gap-1.5 px-3.5 pb-2.5">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => {
              run(chip);
              inputRef.current?.focus({ preventScroll: true });
            }}
            className="mono rounded-full border border-[color:var(--color-border)] bg-white/[0.02] px-2.5 py-0.5 text-[10px] text-[color:var(--color-text-dim)] transition-colors hover:border-[color:var(--color-border-strong)] hover:text-[color:var(--color-text-bright)]"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Prompt */}
      <div
        className="flex cursor-text items-center gap-2 border-t border-[color:var(--color-border)] px-3.5 py-2.5"
        onClick={focusPrompt}
      >
        <span className="mono select-none text-xs text-[color:var(--color-ember)]" aria-hidden>
          $
        </span>
        <div className="relative min-w-0 flex-1">
          {/* Invisible real input on top (focus, keys, IME); the visible text
              + block caret live in a mirror BELOW it, so the caret sits in the
              text flow itself — it can never drift from the last character. */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onFocus={preloadAskModule}
            onChange={(e) => {
              setValue(e.target.value);
              setHistIdx(null);
              markTyping();
            }}
            onKeyDown={onKeyDown}
            aria-label="Ask Lúmen"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="send"
            className="mono absolute inset-0 h-full w-full bg-transparent text-xs opacity-0 outline-none"
          />
          <div
            ref={mirrorRef}
            aria-hidden
            className="mono pointer-events-none flex min-h-[1.05rem] items-center overflow-hidden text-xs"
          >
            <span className="whitespace-pre text-[color:var(--color-text-bright)]">
              {value}
            </span>
            <span
              className="h-[1.05rem] w-[1ch] shrink-0 bg-[color:var(--color-ember)]"
              style={{
                animation: typing ? "none" : "mw-term-blink 1.1s step-end infinite",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
