import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Lock,
  Globe2,
  Wallet,
  Target,
  Plane,
  Zap,
  Smartphone,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { GridBackground, GlowOrb } from "@/components/ui/GridBackground";
import { mailto } from "@/data/contact";

const FLOW_URL = "https://flow.mwdeveloper.tech";
const ACCESS_MAILTO = mailto("Acesso ao Flow — beta fechado");

const FEATURES = [
  {
    icon: Globe2,
    title: "Multi-moeda real",
    body: "BRL, AUD e EUR com cotações ECB ao vivo via Frankfurter. Conversão automática em transferências entre carteiras.",
  },
  {
    icon: Wallet,
    title: "Carteiras flexíveis",
    body: "Quantas contas você quiser, em moedas diferentes. Saldo calculado pelas transações, não digitado.",
  },
  {
    icon: Target,
    title: "Metas linkadas",
    body: "Crie metas em qualquer moeda e linke transações a elas. Atualização atômica — meta e saldo andam juntos.",
  },
  {
    icon: Plane,
    title: "Itens de viagem",
    body: "Para mudanças e viagens longas: lista de itens com custo estimado vs. real, status pago e progresso visual.",
  },
  {
    icon: Zap,
    title: "Quick add e ⌘K",
    body: "FAB no mobile pra lançar despesa em 2 toques. Atalho global ⌘K abre busca em tudo: transações, metas, contas.",
  },
  {
    icon: Smartphone,
    title: "PWA mobile-first",
    body: "Instalável como app no iOS e Android. Pull-to-refresh, swipe gestures e layout otimizado pro celular.",
  },
] as const;

const STACK = [
  "React 19",
  "Vite",
  "TypeScript",
  "Tailwind",
  "Express",
  "Prisma",
  "PostgreSQL",
  "Docker",
  "Cloudflare Tunnel",
];

export default function Flow() {
  useEffect(() => {
    document.title = "Flow — Finanças multi-moeda · MW Dev";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Flow — tracker pessoal multi-moeda em produção real. BRL/AUD/EUR com cotações ECB ao vivo, transferências automáticas e metas linkadas. Em teste fechado.",
      );
    }
    return () => {
      document.title =
        "MW Dev — Construo produtos do primeiro commit ao primeiro cliente";
    };
  }, []);

  return (
    <>
      <FlowNavbar />
      <main>
        <FlowHero />
        <FlowFeatures />
        <FlowStack />
        <FlowAccess />
      </main>
      <FlowFooter />
    </>
  );
}

function FlowNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-[color:var(--color-void)]/70 border-b border-[color:var(--color-border)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          to="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Logo size={32} />
          <span className="mono text-sm font-semibold tracking-[0.3em] text-[color:var(--color-text-bright)]">
            MW DEV
          </span>
        </Link>
        <Link
          to="/"
          className="mono inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[color:var(--color-text)] transition-colors hover:text-[color:var(--color-text-bright)]"
        >
          <ArrowLeft className="h-3 w-3" />
          Voltar ao site
        </Link>
      </div>
    </header>
  );
}

function FlowHero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 md:pt-40">
      <GridBackground />
      <GlowOrb
        className="-top-40 left-1/2 -translate-x-1/2"
        size={800}
        color="rgba(0,102,255,0.18)"
      />
      <GlowOrb
        className="top-1/2 -right-60"
        size={500}
        color="rgba(0,212,255,0.10)"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3"
        >
          <Badge variant="blue" pulse>
            <Lock className="h-3 w-3" />
            Beta fechado · Acesso por convite
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-8 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-[color:var(--color-text-bright)] md:text-5xl lg:text-6xl"
        >
          Suas finanças em três moedas,{" "}
          <span className="bg-gradient-to-br from-[color:var(--color-text-bright)] via-[color:var(--color-cyan)] to-[color:var(--color-blue)] bg-clip-text text-transparent">
            sem planilha.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-text)] md:text-lg"
        >
          Flow é uma aplicação de finanças pessoais multi-moeda construída do
          zero. BRL, AUD e EUR no mesmo lugar, com cotações ECB ao vivo,
          transferências entre carteiras com conversão automática e metas
          linkadas a transações reais. Em uso diário, em teste fechado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href={ACCESS_MAILTO}
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-blue)] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.3)] transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)]"
          >
            <Mail className="h-4 w-4" />
            Solicitar acesso
          </a>
          <a
            href={FLOW_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.02] px-6 py-3 text-sm font-medium text-[color:var(--color-text-bright)] transition-all hover:border-[color:var(--color-cyan)] hover:bg-white/[0.05]"
          >
            Ver landing pública
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-20 flex w-full max-w-3xl flex-wrap items-center gap-x-10 gap-y-4 border-t border-[color:var(--color-border)] pt-8"
        >
          <Stat value="3 moedas" label="BRL · AUD · EUR" />
          <Stat value="ECB" label="cotações ao vivo" />
          <Stat value="PWA" label="instalável no celular" />
          <Stat value="Self-hosted" label="back rodando 24/7" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="mono text-sm font-semibold text-[color:var(--color-text-bright)]">
        {value}
      </span>
      <span className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
        {label}
      </span>
    </div>
  );
}

function FlowFeatures() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <span className="mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-cyan)]">
            / o que tem dentro
          </span>
          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-5xl">
            Construído pra quem vive entre{" "}
            <span className="text-[color:var(--color-cyan)]">moedas e fusos.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 transition-all hover:border-[color:var(--color-blue)]/40 hover:bg-[color:var(--color-card-hover)]"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--color-blue)]/10 text-[color:var(--color-cyan)] transition-colors group-hover:bg-[color:var(--color-blue)]/20">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-[color:var(--color-text-bright)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text)]">
                {f.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowStack() {
  return (
    <section className="relative border-y border-[color:var(--color-border)] bg-white/[0.01] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-cyan)]">
              / stack
            </span>
            <h2 className="mt-3 text-2xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-3xl">
              Mesma stack dos outros produtos.{" "}
              <span className="text-[color:var(--color-text)]">
                Bater no padrão é mais importante que estrear ferramenta nova.
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <span
                key={tech}
                className="mono rounded-md border border-[color:var(--color-border)] bg-white/[0.02] px-3 py-1.5 text-[11px] uppercase tracking-wider text-[color:var(--color-text)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowAccess() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10 text-center">
        <span className="mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-cyan)]">
          / acesso
        </span>
        <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
          Em teste fechado.{" "}
          <span className="text-[color:var(--color-text)]">
            Acesso liberado caso a caso.
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[color:var(--color-text)] md:text-base">
          Flow nasceu como ferramenta de uso diário e está estabilizando antes de
          abrir cadastro público. Se você quiser experimentar como beta tester,
          me manda um email — vou liberando aos poucos.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={ACCESS_MAILTO}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-blue)] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.3)] transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)]"
          >
            <Mail className="h-4 w-4" />
            Solicitar acesso ao beta
          </a>
          <a
            href={FLOW_URL}
            target="_blank"
            rel="noreferrer"
            className="mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-dim)] underline underline-offset-[6px] transition-colors hover:text-[color:var(--color-text)]"
          >
            ou acessar a landing pública
          </a>
        </div>
      </div>
    </section>
  );
}

function FlowFooter() {
  return (
    <footer className="border-t border-[color:var(--color-border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-xs text-[color:var(--color-text-dim)] md:flex-row md:items-center md:justify-between md:px-10">
        <p className="mono">
          Flow · Projeto pessoal · {new Date().getFullYear()}
        </p>
        <Link
          to="/"
          className="mono uppercase tracking-[0.22em] transition-colors hover:text-[color:var(--color-text)]"
        >
          ← MW Dev
        </Link>
      </div>
    </footer>
  );
}
