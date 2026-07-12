import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Check,
  Copy,
  FileText,
  Github,
  Globe,
  Linkedin,
  Search,
  SquareTerminal,
} from "lucide-react";
import { useCvPath } from "@/i18n/useCvPath";
import { contact } from "@/data/contact";

/**
 * Command palette (redesign 2026-07). Hand-rolled — no cmdk. Opens on
 * Cmd+K / Ctrl+K or on the window CustomEvent "mw:open-palette" (dispatched by
 * the Navbar ⌘K button). "Open terminal" dispatches "mw:focus-terminal",
 * which HeroTerminal listens for. Not mounted here — Home mounts it.
 *
 * A11y: role="dialog" + aria-modal, combobox/listbox pattern with
 * aria-activedescendant (focus stays on the input; Tab/arrows move the active
 * option, which doubles as a trivially-correct focus trap), Esc closes,
 * backdrop click closes, body scroll locked while open, focus restored to the
 * previously focused element on close.
 */

type Group = "navigate" | "actions" | "language";

type PaletteAction = {
  id: string;
  group: Group;
  label: string;
  hint?: string;
  keywords: string;
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void | "keep-open";
};

// TODO-i18n: palette chrome labels (group headings, placeholder, empty state,
// copy feedback, dialog label) are EN-only for now.
const GROUP_LABELS: Record<Group, string> = {
  navigate: "Navigate",
  actions: "Actions",
  language: "Language",
};

const LANGS: Array<{ code: string; label: string }> = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt-BR", label: "Português (BR)" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
};

/** Run after the palette has closed and the body scroll lock is released. */
const afterClose = (fn: () => void) => {
  requestAnimationFrame(() => requestAnimationFrame(fn));
};

export function CommandPalette() {
  const { t, i18n } = useTranslation();
  const cvPath = useCvPath();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const copyTimerRef = useRef<number>(0);

  // Global shortcuts + Navbar event. Registered once, for the app's lifetime.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mw:open-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mw:open-palette", onOpenEvent);
    };
  }, []);

  // Open/close side effects: reset state, lock scroll, manage focus.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    setCopied(false);
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(copyTimerRef.current), []);

  const actions = useMemo<PaletteAction[]>(() => {
    const nav = (id: string, labelKey: string): PaletteAction => ({
      id: `nav-${id}`,
      group: "navigate",
      label: t(labelKey),
      hint: `#${id}`,
      keywords: `go to section ${id}`,
      icon: ArrowRight,
      perform: () => afterClose(() => scrollTo(`#${id}`)),
    });

    return [
      nav("work", "p.nav.work"),
      nav("experience", "p.nav.experience"),
      nav("about", "p.nav.about"),
      nav("contact", "p.nav.contact"),
      {
        id: "cv",
        group: "actions",
        label: t("p.hero.ctaCv"),
        hint: "pdf",
        keywords: "download cv resume curriculum pdf",
        icon: FileText,
        perform: () => {
          const a = document.createElement("a");
          a.href = cvPath;
          a.download = "";
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
      },
      {
        id: "copy-email",
        group: "actions",
        // TODO-i18n: "Copy email".
        label: "Copy email",
        hint: contact.email,
        keywords: "copy email mail address contact",
        icon: Copy,
        perform: () => {
          void navigator.clipboard.writeText(contact.email).catch(() => {});
          setCopied(true);
          window.clearTimeout(copyTimerRef.current);
          copyTimerRef.current = window.setTimeout(() => setOpen(false), 900);
          return "keep-open";
        },
      },
      {
        id: "github",
        group: "actions",
        label: t("p.contact.github"),
        hint: `↗ github.com/${contact.github}`,
        keywords: "github open source code profile",
        icon: Github,
        perform: () => {
          window.open(`https://github.com/${contact.github}`, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "linkedin",
        group: "actions",
        label: t("p.contact.linkedin"),
        hint: "↗ linkedin.com",
        keywords: "linkedin profile hire connect",
        icon: Linkedin,
        perform: () => {
          window.open(
            `https://linkedin.com/in/${contact.linkedin}`,
            "_blank",
            "noopener,noreferrer",
          );
        },
      },
      {
        id: "terminal",
        group: "actions",
        // TODO-i18n: "Open terminal".
        label: "Open terminal",
        hint: "$",
        keywords: "open terminal console cli play",
        icon: SquareTerminal,
        perform: () =>
          afterClose(() => window.dispatchEvent(new CustomEvent("mw:focus-terminal"))),
      },
      ...LANGS.map(
        (lang): PaletteAction => ({
          id: `lang-${lang.code}`,
          group: "language",
          label: lang.label,
          hint: lang.code.toLowerCase(),
          keywords: `language switch idioma ${lang.code} ${lang.label}`,
          icon: Globe,
          // fr/de locales may not exist yet — i18next falls back to EN.
          perform: () => void i18n.changeLanguage(lang.code),
        }),
      ),
    ];
  }, [t, i18n, cvPath]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.keywords.toLowerCase().includes(q),
    );
  }, [actions, query]);

  const groups = useMemo(
    () =>
      (["navigate", "actions", "language"] as const)
        .map((g) => ({ group: g, items: filtered.filter((a) => a.group === g) }))
        .filter((g) => g.items.length > 0),
    [filtered],
  );

  const clampedIndex = Math.min(activeIndex, Math.max(0, filtered.length - 1));
  const activeAction = filtered[clampedIndex];

  useEffect(() => {
    if (!activeAction) return;
    listRef.current
      ?.querySelector(`#mw-palette-opt-${activeAction.id}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeAction]);

  const execute = (action: PaletteAction) => {
    if (action.perform() !== "keep-open") setOpen(false);
  };

  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
      e.preventDefault();
      if (filtered.length > 0) setActiveIndex((clampedIndex + 1) % filtered.length);
    } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      if (filtered.length > 0)
        setActiveIndex((clampedIndex - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeAction) execute(activeAction);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[16vh] backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        // TODO-i18n: dialog label.
        aria-label="Command palette"
        onKeyDown={onDialogKeyDown}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-[color:var(--color-border)] px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-[color:var(--color-text-dim)]" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="mw-palette-list"
            aria-activedescendant={
              activeAction ? `mw-palette-opt-${activeAction.id}` : undefined
            }
            aria-autocomplete="list"
            // TODO-i18n: search placeholder + label.
            aria-label="Search commands"
            placeholder="Type a command or search…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-sm text-[color:var(--color-text-bright)] outline-none placeholder:text-[color:var(--color-text-dim)]"
          />
          <kbd className="mono shrink-0 rounded border border-[color:var(--color-border)] px-1.5 py-0.5 text-[10px] text-[color:var(--color-text-dim)]">
            esc
          </kbd>
        </div>

        {/* Results */}
        <ul
          ref={listRef}
          id="mw-palette-list"
          role="listbox"
          // TODO-i18n: list label.
          aria-label="Commands"
          className="max-h-[46vh] overflow-y-auto py-2"
        >
          {filtered.length === 0 && (
            <li
              className="mono px-4 py-6 text-center text-xs text-[color:var(--color-text-dim)]"
              role="presentation"
            >
              {/* TODO-i18n: empty state. */}
              no results. try 'work' or 'cv'.
            </li>
          )}
          {groups.map(({ group, items }) => (
            <li key={group} role="presentation">
              <p
                role="presentation"
                className="mono px-4 pb-1 pt-3 text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-text-dim)]"
              >
                {GROUP_LABELS[group]}
              </p>
              <ul role="presentation">
                {items.map((action) => {
                  const isActive = activeAction?.id === action.id;
                  const isCopied = copied && action.id === "copy-email";
                  const Icon = action.icon;
                  return (
                    <li
                      key={action.id}
                      id={`mw-palette-opt-${action.id}`}
                      role="option"
                      aria-selected={isActive}
                    >
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => execute(action)}
                        onMouseMove={() =>
                          setActiveIndex(filtered.findIndex((a) => a.id === action.id))
                        }
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-white/[0.05] text-[color:var(--color-text-bright)]"
                            : "text-[color:var(--color-text)]"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            isActive
                              ? "text-[color:var(--color-blue)]"
                              : "text-[color:var(--color-text-dim)]"
                          }`}
                          aria-hidden
                        />
                        <span className="flex-1 truncate">{action.label}</span>
                        {isCopied ? (
                          <span className="mono inline-flex items-center gap-1 text-[11px] text-[color:var(--color-ember)]">
                            <Check className="h-3 w-3" aria-hidden />
                            {/* TODO-i18n: copy feedback. */}
                            copied
                          </span>
                        ) : (
                          action.hint && (
                            <span className="mono max-w-[45%] truncate text-[11px] text-[color:var(--color-text-dim)]">
                              {action.hint}
                            </span>
                          )
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        {/* Footer hint */}
        <div className="mono flex items-center gap-4 border-t border-[color:var(--color-border)] px-4 py-2 text-[10px] text-[color:var(--color-text-dim)]">
          <span>↑↓ navigate</span>
          <span>⏎ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
