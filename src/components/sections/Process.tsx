import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    no: "01",
    title: "Conversa",
    description:
      "15 minutos no WhatsApp ou call. Você me conta o problema, eu te digo se resolvo — e como. Se não for o fit certo, te indico quem é.",
  },
  {
    no: "02",
    title: "Escopo & proposta",
    description:
      "Mando em até 48h uma proposta curta: o que entrego, prazo, preço. Sem PDF de 40 páginas pra impressionar.",
  },
  {
    no: "03",
    title: "Build em público",
    description:
      "Você acompanha o progresso em tempo real. Updates diários, deploy contínuo em staging, wins rápidos. Sem buraco negro de 3 meses.",
  },
  {
    no: "04",
    title: "Ship & suporte",
    description:
      "Produto no ar, doc entregue, código é seu. Continuo no plantão até você estar 100% autônomo.",
  },
];

export function Process() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="mb-14">
            <span className="text-eyebrow">How I work</span>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-5xl">
              Processo curto.
              <br />
              <span className="text-[color:var(--color-cyan)]">Ship</span>{" "}
              rápido. Sem burocracia.
            </h2>
          </div>
        </Reveal>

        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.08}>
              <li className="group relative flex h-full flex-col rounded-[var(--radius-card-sm)] border bg-[color:var(--color-card)] p-6 transition-all hover:-translate-y-1 hover:bg-[color:var(--color-card-hover)]">
                <div className="flex items-center justify-between">
                  <span className="mono text-xs font-semibold tracking-[0.22em] text-[color:var(--color-cyan)]">
                    {step.no}
                  </span>
                  <span className="h-px w-10 bg-gradient-to-r from-[color:var(--color-blue)]/40 to-transparent" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-[color:var(--color-text-bright)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-text)]">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
