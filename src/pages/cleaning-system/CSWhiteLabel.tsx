import { Check, Server, Paintbrush, Users, Headphones } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { waLink, mailto } from "@/data/contact";
import { GlowOrb } from "@/components/ui/GridBackground";

const WA_TEXT = "Oi Matheus, quero saber mais sobre o Sistema Cleaning white-label.";

const includes = [
  {
    icon: Server,
    title: "Deploy no seu servidor",
    description:
      "Setup completo em VPS próprio com Docker Compose + Caddy. Dados seus, no seu domínio.",
  },
  {
    icon: Paintbrush,
    title: "Sua marca",
    description:
      "Logo, cores e nome da empresa aplicados. Seus clientes veem só a sua identidade.",
  },
  {
    icon: Users,
    title: "Onboarding da equipe",
    description:
      "Sessão de treinamento para admin e cleaners. Documentação entregue em PT-BR e EN.",
  },
  {
    icon: Headphones,
    title: "Suporte técnico",
    description:
      "Plantão de suporte no período de estabilização. Bugs críticos corrigidos com prioridade.",
  },
];

export function CSWhiteLabel() {
  return (
    <section
      id="white-label"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <GlowOrb
        className="-left-40 top-1/2 -translate-y-1/2"
        size={500}
        color="rgba(0,212,255,0.06)"
      />
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-2 md:items-start">
          <div>
            <Reveal>
              <p className="text-eyebrow">White-label</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
                Seu sistema.{" "}
                <span className="text-[color:var(--color-text)]">
                  Nossa base de código.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-[color:var(--color-text)]">
                O Sistema Cleaning já existe, já foi testado com uma empresa
                real, já passou por deploy em produção. Você não paga para
                construir do zero — paga para ter o sistema rodando com a sua
                marca, no seu domínio, com seus dados.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--color-text)]">
                Hoje rodando pela{" "}
                <span className="text-[color:var(--color-text-bright)]">
                  GlowArt em Brisbane, AU
                </span>
                . Disponível para empresas que operam em qualquer país com time
                bilíngue (EN/PT-BR).
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-2">
                {[
                  "Sistema já em produção — menos risco, entrega mais rápida",
                  "Dados 100% seus, sem vendor lock-in de plataforma",
                  "Personalização de marca completa antes do go-live",
                  "Custo muito menor que construir do zero",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-[color:var(--color-success)]" />
                    <span className="text-sm text-[color:var(--color-text)]">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(WA_TEXT)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-blue)] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.3)] transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)]"
                >
                  Falar sobre white-label
                </a>
                <a
                  href={mailto("Sistema Cleaning — white-label")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.02] px-6 py-3 text-sm font-medium text-[color:var(--color-text-bright)] transition-all hover:border-[color:var(--color-cyan)] hover:bg-white/[0.05]"
                >
                  Mandar email
                </a>
              </div>
            </Reveal>
          </div>

          <div className="space-y-4">
            {includes.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * i}>
                <div className="flex gap-4 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 transition-colors hover:bg-[color:var(--color-card-hover)]">
                  <div className="shrink-0 mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--color-blue)]/10 text-[color:var(--color-cyan)]">
                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="mono text-sm font-medium text-[color:var(--color-text-bright)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-text)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
