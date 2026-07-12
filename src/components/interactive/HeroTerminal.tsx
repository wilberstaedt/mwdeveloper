import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCvPath } from "@/i18n/useCvPath";

/**
 * Hero terminal (redesign 2026-07): a REAL, usable mini-terminal — the site's
 * "the interactive details must work" principle made literal. Commands answer
 * from i18n (`p.terminal.*`), navigate the page, download the CV and switch
 * languages. No autofocus on load: focus only happens on explicit user intent
 * (click, chip, `mw:focus-terminal` event from the command palette).
 *
 * Integration point for the future in-browser AI: if `src/lib/ask.ts` exists
 * and exports `askPortfolio(q)`, the `ask` command uses it (picked up via
 * import.meta.glob so the build stays green until that module lands).
 */

type Line = { id: number; kind: "input" | "output"; text: string };

type AskModule = {
  askPortfolio: (
    q: string,
    siteLang?: string,
  ) => Promise<{ answer: string; sources: string[] }>;
  preloadAsk?: () => Promise<void>;
};

// Resolves to {} while src/lib/ask.ts doesn't exist — zero build coupling.
const askLoaders = import.meta.glob([
  "../../lib/ask.ts",
  "../../lib/ask/index.ts",
]) as Record<string, () => Promise<AskModule>>;

const KNOWN_COMMANDS = new Set([
  "help", "work", "contact", "cv", "uptime", "joke", "langs", "lang", "clear", "ask",
]);

// Free text that isn't a command is a question for `ask` — visitors shouldn't
// need to learn the syntax for the terminal to feel functional.
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

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function HeroTerminal({ focusOnMount = false }: { focusOnMount?: boolean }) {
  const { t, i18n } = useTranslation();
  const cvPath = useCvPath();

  const idRef = useRef(1);
  const nextId = () => idRef.current++;

  const [lines, setLines] = useState<Line[]>(() => [
    { id: 0, kind: "output", text: t("p.terminal.welcome") },
  ]);
  const [value, setValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // cvPath changes with language; keep the latest for async handlers.
  const cvPathRef = useRef(cvPath);
  cvPathRef.current = cvPath;

  const append = (kind: Line["kind"], text: string) =>
    setLines((prev) => [...prev, { id: nextId(), kind, text }]);

  const replaceLine = (id: number, text: string) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, text } : l)));

  const goTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const downloadCv = () => {
    const a = document.createElement("a");
    a.href = cvPathRef.current;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Warm the embedding model on first real intent (focus), so the first
  // question answers fast instead of paying the model download.
  const preloadedRef = useRef(false);
  const preloadAskModule = () => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;
    const loader = Object.values(askLoaders)[0];
    void loader?.()
      .then((mod) => mod.preloadAsk?.())
      .catch(() => {
        preloadedRef.current = false;
      });
  };

  const handleAsk = async (question: string) => {
    const loader = Object.values(askLoaders)[0];
    if (!loader) {
      append("output", t("p.terminal.askFail"));
      return;
    }
    if (!question) {
      append("output", t("p.terminal.askUsage"));
      return;
    }
    const pendingId = nextId();
    setLines((prev) => [...prev, { id: pendingId, kind: "output", text: "…" }]);
    try {
      const mod = await loader();
      const { answer, sources } = await mod.askPortfolio(
        question,
        i18n.resolvedLanguage ?? "en",
      );
      replaceLine(pendingId, answer);
      if (sources.length > 0) append("output", `· ${sources.join(" · ")}`);
    } catch {
      replaceLine(pendingId, t("p.terminal.askFail"));
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
      case "cv":
        downloadCv();
        append("output", t("p.terminal.cvDone"));
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
          // fr/de have no locale files yet — i18next falls back to EN, and the
          // switch still registers (documented in the redesign brief).
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
        // Anything that reads as natural language is a question for `ask` —
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
      // TODO-i18n: widget label.
      aria-label="Interactive terminal"
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
          matheus@mwdeveloper:~
        </span>
      </div>

      {/* Output log */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        // TODO-i18n: log label.
        aria-label="Terminal output"
        onClick={focusPrompt}
        className="max-h-44 min-h-[7.5rem] cursor-text space-y-1.5 overflow-y-auto px-3.5 py-3 lg:max-h-60 lg:min-h-[11rem]"
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
      {/* TODO-i18n: suggestions group label. */}
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
          <input
            ref={inputRef}
            type="text"
            value={value}
            onFocus={preloadAskModule}
            onChange={(e) => {
              setValue(e.target.value);
              setHistIdx(null);
            }}
            onKeyDown={onKeyDown}
            // TODO-i18n: input label.
            aria-label="Terminal input"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="send"
            className="mono w-full bg-transparent text-xs text-[color:var(--color-text-bright)] outline-none [caret-color:transparent]"
          />
          {/* Block cursor sits after the last character (mono ⇒ 1ch per char);
              the native caret is transparent so the block reads as the caret. */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 h-[1.05rem] w-[1ch] -translate-y-1/2 bg-[color:var(--color-ember)]"
            style={{
              left: `${value.length}ch`,
              animation: "mw-term-blink 1.1s step-end infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
