import { motion } from "framer-motion";
import { ArrowDown, MessageCircle, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GridBackground, GlowOrb } from "@/components/ui/GridBackground";
import { waLink, mailto } from "@/data/contact";

const WA_TEXT = "Oi Matheus, quero saber mais sobre o Sistema Cleaning white-label.";

const stats = [
  { value: "3 portais", label: "admin · cleaner · cliente" },
  { value: "80+", label: "endpoints REST" },
  { value: "237+", label: "testes automatizados" },
  { value: "Live AU", label: "em produção desde 2026" },
];

export function CSHero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden pt-32 md:pt-40"
    >
      <GridBackground />
      <GlowOrb
        className="-top-40 left-1/2 -translate-x-1/2"
        size={800}
        color="rgba(0,102,255,0.18)"
      />
      <GlowOrb
        className="top-1/2 -right-60"
        size={500}
        color="rgba(63,217,127,0.07)"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3"
        >
          <Badge variant="success" pulse>
            Live em produção
          </Badge>
          <span className="mono inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
            <MapPin className="h-3 w-3" />
            Brisbane, Austrália · GlowArt
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-8 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-[color:var(--color-text-bright)] md:text-5xl lg:text-6xl"
        >
          Gestão completa para{" "}
          <span className="bg-gradient-to-br from-[color:var(--color-text-bright)] via-[color:var(--color-cyan)] to-[color:var(--color-blue)] bg-clip-text text-transparent">
            empresas de limpeza.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-text)] md:text-lg"
        >
          Sistema web para admins, app para cleaners e portal para clientes.
          Deploy em VPS com Docker, domínio e marca da sua empresa, suporte
          técnico incluído. Hoje rodando na{" "}
          <span className="text-[color:var(--color-text-bright)]">
            GlowArt (Brisbane, AU)
          </span>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#portals"
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-blue)] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.3)] transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)]"
          >
            Ver os módulos
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href={waLink(WA_TEXT)}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.02] px-6 py-3 text-sm font-medium text-[color:var(--color-text-bright)] transition-all hover:border-[color:var(--color-cyan)] hover:bg-white/[0.05]"
          >
            <MessageCircle className="h-4 w-4" />
            Falar sobre white-label
          </a>
          <a
            href={mailto("Sistema Cleaning — white-label")}
            className="mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-dim)] underline underline-offset-[6px] transition-colors hover:text-[color:var(--color-text)]"
          >
            ou email
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-20 flex w-full max-w-3xl flex-wrap items-center gap-x-10 gap-y-4 border-t border-[color:var(--color-border)] pt-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="mono text-sm font-semibold text-[color:var(--color-text-bright)]">
                {s.value}
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
