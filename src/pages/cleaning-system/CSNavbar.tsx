import { useEffect, useState } from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { waLink } from "@/data/contact";

export function CSNavbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  const WA_TEXT = t("cleaning.nav.cta");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { labelKey: "cleaning.nav.modules", href: "#portals" },
    { labelKey: "cleaning.nav.features", href: "#features" },
    { labelKey: "cleaning.nav.whiteLabel", href: "#white-label" },
    { labelKey: "cleaning.nav.pricing", href: "#pricing" },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--color-void)]/80 border-b border-[color:var(--color-border)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label={t("cleaning.nav.back")}
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[color:var(--color-text-dim)] transition-transform group-hover:-translate-x-0.5" />
          <Logo size={28} />
          <span className="mono text-sm font-semibold tracking-[0.3em] text-[color:var(--color-text-bright)]">
            MW DEV
          </span>
        </a>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 md:flex" aria-label="Sistema Cleaning">
            {navLinks.map(({ labelKey, href }) => (
              <a
                key={href}
                href={href}
                className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-text-bright)]"
              >
                {t(labelKey)}
              </a>
            ))}
          </nav>
          <LanguageSwitcher />
          <a
            href={waLink(WA_TEXT)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-blue)] px-4 py-2 text-xs font-medium text-white transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_4px_20px_rgba(0,212,255,0.3)]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t("cleaning.nav.cta")}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
