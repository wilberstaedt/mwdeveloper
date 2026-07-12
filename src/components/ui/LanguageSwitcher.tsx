import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { SUPPORTED_LANGS } from "@/i18n";
import { cn } from "@/lib/utils";

const labels: Record<(typeof SUPPORTED_LANGS)[number], string> = {
  en: "EN",
  es: "ES",
  "pt-BR": "PT",
  fr: "FR",
  de: "DE",
};

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = (SUPPORTED_LANGS.find((l) => i18n.resolvedLanguage === l) ??
    "en") as (typeof SUPPORTED_LANGS)[number];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`${t("language.label")}: ${labels[current]}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.02] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-text)] transition-all hover:border-[color:var(--color-cyan)] hover:text-[color:var(--color-text-bright)]"
      >
        <Globe className="h-3 w-3" />
        <span>{labels[current]}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)]/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          {SUPPORTED_LANGS.map((lng) => {
            const active = current === lng;
            return (
              <li key={lng}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    i18n.changeLanguage(lng);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                    active
                      ? "text-[color:var(--color-text-bright)]"
                      : "text-[color:var(--color-text)] hover:text-[color:var(--color-text-bright)]",
                    "hover:bg-white/[0.04]",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="mono w-6 text-[11px] uppercase tracking-widest text-[color:var(--color-text-dim)]">
                      {labels[lng]}
                    </span>
                    <span>{t(`language.${lng}`)}</span>
                  </span>
                  {active && (
                    <Check className="h-3.5 w-3.5 text-[color:var(--color-cyan)]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
