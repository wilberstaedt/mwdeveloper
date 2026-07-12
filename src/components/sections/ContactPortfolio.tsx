import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GridBackground";
import { contact, mailto } from "@/data/contact";

/**
 * Contact (redesign 2026-07): the hire-me finale. Centered on purpose — a
 * deliberate break from the page's left-aligned rhythm. Freelance is a quiet
 * one-liner at the bottom, never the pitch.
 */

const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-[color:var(--color-text-bright)] transition-all hover:border-[color:var(--color-blue)] hover:bg-white/[0.05]";

export function ContactPortfolio() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-[color:var(--color-border)] py-32 md:py-44"
    >
      <GlowOrb
        className="-bottom-56 left-1/2 -translate-x-1/2"
        size={720}
        color="rgba(0,102,255,0.12)"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-10">
        <Reveal>
          <p className="text-eyebrow">{t("p.contact.eyebrow")}</p>
          <h2 className="font-display mt-5 text-balance text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[1.04] tracking-[-0.02em] text-[color:var(--color-cloud)]">
            {t("p.contact.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-[color:var(--color-text)]">
            {t("p.contact.sub")}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={mailto("Hiring inquiry via mwdeveloper.tech")}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-blue)] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.3)] transition-all hover:shadow-[0_8px_44px_rgba(0,102,255,0.45)] focus-visible:outline-offset-4"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {t("p.contact.email")}
          </a>
          <a
            href={`https://linkedin.com/in/${contact.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className={secondaryButton}
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            {t("p.contact.linkedin")}
          </a>
          <a
            href={`https://github.com/${contact.github}`}
            target="_blank"
            rel="noreferrer"
            className={secondaryButton}
          >
            <Github className="h-4 w-4" aria-hidden />
            {t("p.contact.github")}
          </a>
        </Reveal>

        {/* Freelance: deliberately quiet — one small line, no visual weight. */}
        <Reveal delay={0.2}>
          <p className="mt-16 text-[13px] text-[color:var(--color-text-dim)]">
            {t("p.contact.freelance")}{" "}
            <a
              href={mailto("Project quote request")}
              className="underline underline-offset-4 transition-colors hover:text-[color:var(--color-text-bright)]"
            >
              {t("p.contact.freelanceCta")}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
