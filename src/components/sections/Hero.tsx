import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { GridBackground, GlowOrb } from "@/components/ui/GridBackground";
import { mailto, waLink } from "@/data/contact";

export function Hero() {
  const { t } = useTranslation();
  const stats = ["years", "products", "remote", "solo"] as const;

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden pt-32 md:pt-36"
    >
      <GridBackground />
      <GlowOrb
        className="-top-40 left-1/2 -translate-x-1/2"
        size={720}
        color="rgba(0,102,255,0.2)"
      />
      <GlowOrb
        className="top-1/3 -right-40"
        size={480}
        color="rgba(0,212,255,0.1)"
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="blue" pulse>
            {t("hero.badge")}
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mt-10"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-[color:var(--color-blue-glow)] blur-3xl" />
          <Logo size={148} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-10 max-w-4xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-[color:var(--color-text-bright)] md:text-6xl lg:text-7xl"
        >
          {t("hero.titleA")}
          <br className="hidden md:block" />{" "}
          <span className="bg-gradient-to-br from-[color:var(--color-text-bright)] via-[color:var(--color-cyan)] to-[color:var(--color-blue)] bg-clip-text text-transparent">
            {t("hero.titleB")}
          </span>
          <br className="hidden md:block" /> {t("hero.titleC")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-[color:var(--color-text)] md:text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-blue)] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.3)] transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] focus-visible:outline-offset-4"
          >
            {t("hero.ctaWork")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.02] px-6 py-3 text-sm font-medium text-[color:var(--color-text-bright)] transition-all hover:border-[color:var(--color-cyan)] hover:bg-white/[0.05]"
          >
            <MessageCircle className="h-4 w-4" />
            {t("hero.ctaWhatsapp")}
          </a>
          <a
            href={mailto("Contato via mwdeveloper.tech")}
            className="mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-dim)] underline underline-offset-[6px] transition-colors hover:text-[color:var(--color-text)]"
          >
            {t("hero.ctaEmail")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-[color:var(--color-border)] pt-8 md:justify-between"
        >
          {stats.map((key) => (
            <div key={key} className="flex flex-col items-center md:items-start">
              <span className="mono text-sm font-semibold text-[color:var(--color-text-bright)]">
                {t(`hero.stats.${key}.value`)}
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
                {t(`hero.stats.${key}.label`)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
