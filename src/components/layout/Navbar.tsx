import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

const navKeys = ["work", "services", "about", "contact"] as const;

export function Navbar() {
  const { t } = useTranslation();
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
          aria-label={t("nav.home")}
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
              href={`#${k === "work" ? "work" : k}`}
              className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-text-bright)]"
            >
              {t(`nav.${k}`)}
            </a>
          ))}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="mono inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[color:var(--color-cyan)] transition-colors hover:text-[color:var(--color-text-bright)]"
          >
            <FileText className="h-3 w-3" />
            {t("nav.cv")}
          </a>
        </nav>

        <div className="flex items-center gap-3">
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
