import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { contact } from "@/data/contact";

/**
 * Footer (redesign 2026-07): minimal. One line of credit, one line pointing
 * at the site-as-work-sample, socials, rights. No link farm.
 */
export function FooterPortfolio() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[color:var(--color-border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10">
        <div className="flex items-start gap-4">
          <Logo size={32} />
          <div className="max-w-md space-y-1.5">
            <p className="text-sm text-[color:var(--color-text)]">
              {t("p.footer.built")}
            </p>
            <p className="mono text-xs leading-relaxed text-[color:var(--color-text-dim)]">
              {t("p.footer.source")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-4">
          <div className="flex items-center gap-1">
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="rounded-full p-2 text-[color:var(--color-text-dim)] transition-colors hover:text-[color:var(--color-text-bright)]"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={`https://github.com/${contact.github}`}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full p-2 text-[color:var(--color-text-dim)] transition-colors hover:text-[color:var(--color-text-bright)]"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={`https://linkedin.com/in/${contact.linkedin}`}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full p-2 text-[color:var(--color-text-dim)] transition-colors hover:text-[color:var(--color-text-bright)]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
          <p className="mono text-[11px] text-[color:var(--color-text-dim)]">
            {t("p.footer.rights", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
