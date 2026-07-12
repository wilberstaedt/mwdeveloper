import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useCvPath } from "@/i18n/useCvPath";
import { cn } from "@/lib/utils";

const navKeys = ["work", "experience", "about", "contact"] as const;

export function Navbar() {
  const { t } = useTranslation();
  const cvPath = useCvPath();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--color-void)]/70 border-b border-[color:var(--color-border)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Logo size={32} />
          <span className="mono text-sm font-semibold tracking-[0.3em] text-[color:var(--color-text-bright)]">
            MW DEV
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navKeys.map((k) => (
            <a
              key={k}
              href={`#${k}`}
              className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-text-bright)]"
            >
              {t(`p.nav.${k}`)}
            </a>
          ))}
          <a
            href={cvPath}
            target="_blank"
            rel="noreferrer"
            className="mono inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[color:var(--color-cyan)] transition-colors hover:text-[color:var(--color-text-bright)]"
          >
            <FileText className="h-3 w-3" />
            {t("nav.cv")}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* TODO-i18n: palette trigger label (EN-only, like the palette chrome). */}
          <button
            type="button"
            aria-label="Open command palette"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("mw:open-palette"))
            }
            className="mono hidden items-center gap-1 rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.02] px-3 py-1.5 text-[11px] tracking-[0.1em] text-[color:var(--color-text-dim)] transition-all hover:border-[color:var(--color-cyan)] hover:text-[color:var(--color-text-bright)] md:inline-flex"
          >
            ⌘K
          </button>
          <LanguageSwitcher />
          <div className="hidden md:block">
            <Badge variant="success" pulse>
              {t("common.available")}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
