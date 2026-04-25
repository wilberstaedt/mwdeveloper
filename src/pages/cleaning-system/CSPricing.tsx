import { Check, Zap, Building2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GridBackground";
import { waLink, mailto } from "@/data/contact";
import { cn } from "@/lib/utils";

const WA_TEXT =
  "Oi Matheus, quero saber mais sobre o Sistema Cleaning white-label.";

const STANDARD_FEATURES = [
  "Setup completo incluído no primeiro mês",
  "Cleaners ilimitados — sem cobrança por seat",
  "3 portais: admin, cleaner e cliente",
  "Invoices em PDF, chat integrado, audit logs",
  "White-label completo: logo, cores, domínio",
  "Deploy em VPS dedicado com Docker + Caddy",
  "Bilíngue EN/PT-BR desde o dia 1",
  "Suporte direto — sem ticket, sem fila",
  "Todas as atualizações e novas features",
  "Treinamento da equipe admin + cleaners",
];

const ENTERPRISE_FEATURES = [
  "Tudo do plano White-label",
  "Customizações de módulo sob demanda",
  "Integrações com sistemas existentes",
  "Múltiplas unidades ou filiais",
  "SLA dedicado com tempo de resposta garantido",
  "Relatórios avançados personalizados",
];

const FAQ = [
  {
    q: "O preço muda se minha empresa crescer?",
    a: "Não. 5 ou 50 cleaners, mesmo AUD $500/mês. Concorrentes como Jobber e ServiceM8 cobram por usuário — você acaba pagando mais conforme cresce. Aqui não.",
  },
  {
    q: "O setup tem custo separado?",
    a: "Não. Configuração, branding white-label, domínio customizado e treinamento da equipe estão incluídos no primeiro mês.",
  },
  {
    q: "Tem contrato de fidelidade?",
    a: "3 meses de contrato inicial. Depois, renovação mensal automática com aviso de 30 dias para cancelar. Código e dados são seus — zero vendor lock-in.",
  },
  {
    q: "Como é feito o pagamento?",
    a: "Transferência bancária (Austrália) ou Wise. Stripe para cobrança recorrente automática disponível quando preferir.",
  },
];

export function CSPricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <GlowOrb
        className="right-0 top-1/3 translate-x-1/2"
        size={480}
        color="rgba(0,102,255,0.08)"
      />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        {/* Header */}
        <Reveal>
          <p className="text-eyebrow">Preços</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
            Um preço.{" "}
            <span className="text-[color:var(--color-text)]">
              Acesso total. Sem surpresa no fim do mês.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--color-text)]">
            Flat fee mensal — sem cobrança por cleaner, por job ou por feature.
            Quanto maior sua equipe, mais valor você extrai pelo mesmo preço.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* White-label plan */}
          <Reveal delay={0.08}>
            <div className="glow-border relative flex flex-col rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)] p-8">
              {/* Popular badge */}
              <div className="absolute -top-3 left-8">
                <span className="mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-blue)]/30 bg-[color:var(--color-blue)]/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-cyan)]">
                  <Zap className="h-2.5 w-2.5" />
                  Plano atual
                </span>
              </div>

              <div className="mt-2">
                <div className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
                  White-label
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-5xl font-semibold tracking-tight text-[color:var(--color-text-bright)]">
                    A$500
                  </span>
                  <span className="mono mb-1.5 text-sm text-[color:var(--color-text-dim)]">
                    / mês
                  </span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--color-text)]">
                  Para empresas de limpeza que querem sistema próprio rodando
                  com sua marca, no seu domínio.
                </p>
              </div>

              <ul className="mt-7 space-y-2.5 flex-1">
                {STANDARD_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-[color:var(--color-success)]" />
                    <span className="text-sm text-[color:var(--color-text)]">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <a
                  href={waLink(WA_TEXT)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-blue)] px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.25)] transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.3)]"
                >
                  Começar agora
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <p className="mono text-center text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
                  3 meses iniciais · sem setup extra
                </p>
              </div>
            </div>
          </Reveal>

          {/* Enterprise plan */}
          <Reveal delay={0.13}>
            <div className="flex flex-col rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-8">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[color:var(--color-text-dim)]" strokeWidth={1.5} />
                  <span className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
                    Enterprise
                  </span>
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-5xl font-semibold tracking-tight text-[color:var(--color-text-bright)]">
                    Custom
                  </span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--color-text)]">
                  Para empresas maiores com necessidades específicas: múltiplas
                  unidades, integrações ou módulos customizados.
                </p>
              </div>

              <ul className="mt-7 space-y-2.5 flex-1">
                {ENTERPRISE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={cn(
                        "h-4 w-4 shrink-0 mt-0.5",
                        f.startsWith("Tudo")
                          ? "text-[color:var(--color-text-dim)]"
                          : "text-[color:var(--color-cyan)]",
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        f.startsWith("Tudo")
                          ? "text-[color:var(--color-text-dim)]"
                          : "text-[color:var(--color-text)]",
                      )}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <a
                  href={mailto("Sistema Cleaning — Enterprise")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--color-border-strong)] bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-[color:var(--color-text-bright)] transition-all hover:border-[color:var(--color-cyan)] hover:bg-white/[0.05]"
                >
                  Falar sobre Enterprise
                </a>
                <p className="mono text-center text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
                  Proposta em até 48h
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Competitive callout */}
        <Reveal delay={0.15}>
          <div className="mt-8 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-void)] p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-dim)]">
                  Por que flat fee?
                </p>
                <p className="mt-1.5 text-sm text-[color:var(--color-text)]">
                  Com Jobber ou ServiceM8 você paga por usuário ou por job —{" "}
                  <span className="text-[color:var(--color-text-bright)]">
                    o custo sobe conforme a empresa cresce.
                  </span>{" "}
                  Aqui não. 5 ou 50 cleaners: mesmo A$500.
                </p>
              </div>
              <div className="shrink-0">
                <table className="mono text-[10px]">
                  <thead>
                    <tr className="text-[color:var(--color-text-dim)]">
                      <th className="pr-6 pb-1.5 text-left font-medium uppercase tracking-[0.15em]">Sistema</th>
                      <th className="pb-1.5 text-right font-medium uppercase tracking-[0.15em]">10 cleaners</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    {[
                      { name: "Sistema Cleaning", price: "A$500", highlight: true },
                      { name: "Jobber (Grow)", price: "A$230+", highlight: false },
                      { name: "ServiceM8", price: "A$379+", highlight: false },
                      { name: "ZenMaid", price: "USD $120+", highlight: false },
                    ].map((row) => (
                      <tr key={row.name}>
                        <td
                          className={cn(
                            "pr-6 py-0.5",
                            row.highlight
                              ? "text-[color:var(--color-cyan)]"
                              : "text-[color:var(--color-text-dim)]",
                          )}
                        >
                          {row.name}
                        </td>
                        <td
                          className={cn(
                            "text-right py-0.5",
                            row.highlight
                              ? "font-semibold text-[color:var(--color-text-bright)]"
                              : "text-[color:var(--color-text-dim)]",
                          )}
                        >
                          {row.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal delay={0.1}>
          <div className="mt-14">
            <p className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-dim)] mb-6">
              Perguntas frequentes
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {FAQ.map((item) => (
                <div
                  key={item.q}
                  className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5"
                >
                  <p className="text-sm font-medium text-[color:var(--color-text-bright)]">
                    {item.q}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text)]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
