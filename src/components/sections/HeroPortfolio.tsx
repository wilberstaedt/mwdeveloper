import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { GridBackground, GlowOrb } from "@/components/ui/GridBackground";
import { CetClock } from "@/components/ui/CetClock";
import { HeroTerminal } from "@/components/interactive/HeroTerminal";
import { contact } from "@/data/contact";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Hire-me hero (redesign 2026-07): left-aligned, typography-led. The name is
 * the composition; the badge row answers the recruiter's first three
 * questions (open? where? authorized?) before the fold. No gradient text,
 * no centered symmetry — see docs/redesign-brief-2026-07.md.
 */
export function HeroPortfolio() {
  const { t } = useTranslation();

  // Mobile-only disclosure for the terminal (desktop renders it in the right
  // grid column). The command palette's "open terminal" action also expands it.
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const openTerminal = () => setTerminalOpen(true);
    window.addEventListener("mw:focus-terminal", openTerminal);
    return () => window.removeEventListener("mw:focus-terminal", openTerminal);
  }, []);

  const proof = ["years", "invoices", "users", "customers"] as const;

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <GridBackground />
      <GlowOrb
        className="-top-52 -right-40"
        size={680}
        color="rgba(0,102,255,0.16)"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-16 pt-32 md:px-10 md:pt-36">
        {/* Badge row: open-to-work + authorization + live clock */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.03] py-1.5 pl-3 pr-4">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-success)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-success)]" />
            </span>
            <span className="mono text-xs font-medium tracking-wide text-[color:var(--color-text-bright)]">
              {t("p.hero.open")}
            </span>
          </span>
          <span className="mono text-xs text-[color:var(--color-text-dim)]">
            {t("p.hero.authorized")}
          </span>
          <CetClock />
        </motion.div>

        {/* Eyebrow + name */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mono mt-12 text-xs uppercase tracking-[0.3em] text-[color:var(--color-blue)] md:text-sm"
        >
          {t("p.hero.eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.16 }}
          className="text-display-hero mt-4 -ml-[0.04em]"
        >
          {t("p.hero.firstName")}
          <br />
          <span className="ml-[0.6ch]">{t("p.hero.lastName")}</span>
          <span className="text-[color:var(--color-ember)]">.</span>
        </motion.h1>

        {/* Below the name: lead + CTAs on the left, terminal on the right
            (desktop only — the name itself keeps the full container width). */}
        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:items-start lg:gap-14">
          <div>
            {/* Lead: the approved positioning line, verbatim from the CV */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="max-w-[38rem] text-pretty text-lg leading-[1.65] text-[color:var(--color-text)] md:text-xl"
            >
              {t("p.hero.lead")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
              className="mono mt-3 text-sm text-[color:var(--color-text-dim)]"
            >
              {t("p.hero.sub")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-blue)] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.3)] transition-all hover:shadow-[0_8px_44px_rgba(0,102,255,0.45)] focus-visible:outline-offset-4"
              >
                {t("p.hero.ctaWork")}
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <span
                className="mx-1 hidden h-6 w-px bg-[color:var(--color-border-strong)] sm:block"
                aria-hidden
              />
              <a
                href={`https://github.com/${contact.github}`}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-full border border-transparent p-2.5 text-[color:var(--color-text-dim)] transition-colors hover:border-[color:var(--color-border-strong)] hover:text-[color:var(--color-text-bright)]"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={`https://linkedin.com/in/${contact.linkedin}`}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-full border border-transparent p-2.5 text-[color:var(--color-text-dim)] transition-colors hover:border-[color:var(--color-border-strong)] hover:text-[color:var(--color-text-bright)]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          {/* Desktop terminal: the playful proof-of-craft, right column only */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="hidden lg:block"
          >
            <HeroTerminal />
            <p className="mono mt-3 text-center text-[11px] text-[color:var(--color-text-dim)]">
              {t("p.hero.terminalHint")}
            </p>
          </motion.div>
        </div>

        {/* Mobile/tablet: terminal behind an explicit disclosure, so the fold
            stays typography-first and focus never moves without user intent. */}
        <div className="mt-12 lg:hidden">
          {terminalOpen ? (
            <HeroTerminal focusOnMount />
          ) : (
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              className="mono inline-flex items-center gap-2 rounded-lg border border-[color:var(--color-border-strong)] bg-white/[0.02] px-4 py-2.5 text-xs text-[color:var(--color-text-dim)] transition-colors hover:border-[color:var(--color-blue)] hover:text-[color:var(--color-text-bright)]"
            >
              <span className="text-[color:var(--color-ember)]" aria-hidden>
                $
              </span>
              {t("p.hero.terminalHint")}
            </button>
          )}
        </div>

        {/* Proof strip: the four approved numbers, nothing else */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-[color:var(--color-border)] pt-8 md:grid-cols-4"
        >
          {proof.map((key) => (
            <div key={key} className="flex flex-col">
              <dt className="mono order-2 mt-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
                {t(`p.proof.${key}.label`)}
              </dt>
              <dd className="order-1 font-display text-3xl font-bold tracking-tight text-[color:var(--color-text-bright)] [font-variant-numeric:tabular-nums] md:text-4xl">
                {t(`p.proof.${key}.value`)}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
