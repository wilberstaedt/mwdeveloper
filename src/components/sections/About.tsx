import { Reveal } from "@/components/ui/Reveal";
import { MapPin, Clock, Zap } from "lucide-react";

const facts = [
  {
    icon: MapPin,
    label: "Agora / depois",
    value: "Brisbane · AU → Valencia · ES",
    meta: "jun 2026",
  },
  {
    icon: Clock,
    label: "Fuso atual",
    value: "AEST · UTC+10",
    meta: "flexível com AU, BR, EU",
  },
  {
    icon: Zap,
    label: "Modo",
    value: "Deep work · TDAH hyperfocus",
    meta: "ship rápido",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <div>
              <span className="text-eyebrow">About</span>
              <h2 className="mt-4 text-balance text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-5xl">
                Dev solo há 5 anos.
                <br />
                Fundador desde
                <span className="text-[color:var(--color-cyan)]"> sempre.</span>
              </h2>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-[color:var(--color-text)]">
                <p>
                  Comecei em Florianópolis, hoje estou em Brisbane, e em junho
                  vou pra Valência. Entre mudanças de país e fuso horário,
                  continuo construindo — produtos próprios, software pra
                  clientes, e sistemas que ficam no ar.
                </p>
                <p>
                  Toco tudo sozinho no lado técnico: back-end, front-end, infra,
                  deploy. Meu diferencial não é stack — é{" "}
                  <span className="text-[color:var(--color-text-bright)]">
                    entrega completa
                  </span>
                  . Você fala comigo, eu escrevo o código, eu subo a aplicação,
                  eu atendo quando quebra. Sem pingue-pongue entre agência e
                  freelancer.
                </p>
                <p>
                  Não vendo hora. Vendo produto. Se o resultado não chega, o
                  trabalho não acabou.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="sticky top-28 overflow-hidden rounded-[var(--radius-card)] border bg-gradient-to-br from-[color:var(--color-card)] to-[color:var(--color-void)] p-8">
                <div className="flex items-center gap-2">
                  <span className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-blue)]">
                    / quick-facts
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[color:var(--color-blue)]/30 to-transparent" />
                </div>

                <dl className="mt-8 space-y-6">
                  {facts.map(({ icon: Icon, label, value, meta }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[color:var(--color-border-strong)] bg-white/[0.02]">
                        <Icon className="h-4 w-4 text-[color:var(--color-cyan)]" />
                      </div>
                      <div className="min-w-0">
                        <dt className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
                          {label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-[color:var(--color-text-bright)]">
                          {value}
                        </dd>
                        <dd className="mono text-[11px] text-[color:var(--color-text-dim)]">
                          {meta}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 border-t border-[color:var(--color-border)] pt-6">
                  <p className="mono text-[11px] leading-relaxed text-[color:var(--color-text-dim)]">
                    <span className="text-[color:var(--color-cyan)]">$</span>{" "}
                    whoami
                    <br />
                    <span className="text-[color:var(--color-text)]">
                      matheus de azevedo wilberstaedt
                    </span>
                    <br />
                    <span className="text-[color:var(--color-cyan)]">$</span>{" "}
                    cat ~/.about
                    <br />
                    <span className="text-[color:var(--color-text)]">
                      Full-stack · CEO · CTO · Founder · Builder
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
