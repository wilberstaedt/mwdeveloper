import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
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
          aria-label="MW Dev — início"
        >
          <Logo size={32} />
          <span className="mono text-sm font-semibold tracking-[0.3em] text-[color:var(--color-text-bright)]">
            MW DEV
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-text-bright)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Badge variant="success" pulse>
            Available
          </Badge>
        </div>
      </div>
    </header>
  );
}
