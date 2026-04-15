import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-eyebrow">What I Do</span>
              <h2 className="mt-4 max-w-xl text-balance text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-5xl">
                O que eu entrego — produto
                <span className="text-[color:var(--color-cyan)]"> rodando</span>
                , não promessa.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[color:var(--color-text)]">
              Faço do zero ou continuo de onde o time parou. Back-end, front,
              infra e deploy — entrego funcionando com cliente usando no dia a
              dia.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.id} delay={i * 0.06}>
                <article className="glow-border group relative h-full overflow-hidden rounded-[var(--radius-card)] border bg-[color:var(--color-card)] p-8 transition-all hover:-translate-y-1 hover:bg-[color:var(--color-card-hover)]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[color:var(--color-blue)]/20 bg-[color:var(--color-blue-soft)]">
                      <Icon className="h-5 w-5 text-[color:var(--color-cyan)]" />
                    </div>
                    <span className="mono text-xs text-[color:var(--color-text-dim)]">
                      / {service.meta}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-medium text-[color:var(--color-text-bright)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-text)]">
                    {service.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.stack.map((tech) => (
                      <span
                        key={tech}
                        className="mono rounded-md border border-[color:var(--color-border)] bg-white/[0.02] px-2 py-1 text-[10px] uppercase tracking-wider text-[color:var(--color-text-dim)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
