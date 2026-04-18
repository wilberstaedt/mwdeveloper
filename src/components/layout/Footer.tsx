import { useTranslation } from "react-i18next";
import { Logo } from "@/components/ui/Logo";
import { contact } from "@/data/contact";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[color:var(--color-border)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-4">
          <Logo size={36} />
          <div>
            <div className="mono text-sm font-semibold tracking-[0.3em] text-[color:var(--color-text-bright)]">
              MW DEV
            </div>
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
              {t("footer.role")}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href={`mailto:${contact.email}`}
            className="mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-cyan)]"
          >
            {t("footer.links.email")}
          </a>
          <a
            href={`https://github.com/${contact.github}`}
            target="_blank"
            rel="noreferrer"
            className="mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-cyan)]"
          >
            {t("footer.links.github")}
          </a>
          <a
            href={`https://linkedin.com/in/${contact.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-cyan)]"
          >
            {t("footer.links.linkedin")}
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-cyan)]"
          >
            {t("footer.links.cv")}
          </a>
        </div>

        <div className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
          © {year} · {t("footer.copy")}
        </div>
      </div>
    </footer>
  );
}
