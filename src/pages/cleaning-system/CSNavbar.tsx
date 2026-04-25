import { useEffect, useState } from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { waLink } from "@/data/contact";

const WA_TEXT = "Oi Matheus, quero saber mais sobre o Sistema Cleaning white-label.";

export function CSNavbar() {
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
          ? "backdrop-blur-xl bg-[color:var(--color-void)]/80 border-b border-[color:var(--color-border)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label="Voltar ao site"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[color:var(--color-text-dim)] transition-transform group-hover:-translate-x-0.5" />
          <Logo size={28} />
          <span className="mono text-sm font-semibold tracking-[0.3em] text-[color:var(--color-text-bright)]">
            MW DEV
          </span>
        </a>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex" aria-label="Cleaning system">
            {[
              { label: "Módulos", href: "#portals" },
              { label: "Funcionalidades", href: "#features" },
              { label: "White-label", href: "#white-label" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-text-bright)]"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href={waLink(WA_TEXT)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-blue)] px-4 py-2 text-xs font-medium text-white transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_4px_20px_rgba(0,212,255,0.3)]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Falar sobre white-label</span>
            <span className="sm:hidden">White-label</span>
          </a>
        </div>
      </div>
    </header>
  );
}
