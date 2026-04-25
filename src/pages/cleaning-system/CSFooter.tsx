import { Logo } from "@/components/ui/Logo";
import { contact } from "@/data/contact";

export function CSFooter() {
  return (
    <footer className="border-t border-[color:var(--color-border)] py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between md:px-10">
        <a href="/" className="flex items-center gap-3 opacity-60 transition-opacity hover:opacity-90">
          <Logo size={24} />
          <span className="mono text-xs font-semibold tracking-[0.3em] text-[color:var(--color-text-bright)]">
            MW DEV
          </span>
        </a>

        <div className="flex items-center gap-6">
          <a
            href={`https://github.com/${contact.github}`}
            target="_blank"
            rel="noreferrer"
            className="mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-dim)] transition-colors hover:text-[color:var(--color-text)]"
          >
            GitHub
          </a>
          <a
            href={`https://linkedin.com/in/${contact.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-dim)] transition-colors hover:text-[color:var(--color-text)]"
          >
            LinkedIn
          </a>
          <a
            href="/"
            className="mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-dim)] transition-colors hover:text-[color:var(--color-text)]"
          >
            mwdeveloper.tech
          </a>
        </div>

        <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-dim)]">
          MW Dev · Made with Claude Code
        </p>
      </div>
    </footer>
  );
}
