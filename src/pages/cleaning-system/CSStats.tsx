import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GridBackground";

const numbers = [
  { value: "3", label: "portais independentes", sub: "admin · cleaner · cliente" },
  { value: "80+", label: "endpoints REST", sub: "documentados e testados" },
  { value: "237+", label: "testes automatizados", sub: "unit + integration" },
  { value: "1", label: "empresa live", sub: "GlowArt · Brisbane, AU" },
];

const stack = [
  "React 18",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Express.js",
  "Prisma ORM",
  "PostgreSQL",
  "Docker Compose",
  "Caddy",
  "JWT",
  "Resend",
  "i18next",
];

export function CSStats() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <GlowOrb
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        size={600}
        color="rgba(0,102,255,0.08)"
      />
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow">Por dentro</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
            Número que rodou em produção,{" "}
            <span className="text-[color:var(--color-text)]">não em slide.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map((n, i) => (
            <Reveal key={n.label} delay={0.06 * i}>
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6">
                <div className="mono text-4xl font-semibold text-[color:var(--color-text-bright)]">
                  {n.value}
                </div>
                <div className="mono mt-2 text-xs font-medium text-[color:var(--color-cyan)]">
                  {n.label}
                </div>
                <div className="mono mt-1 text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
                  {n.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 md:p-8">
            <p className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-dim)] mb-5">
              Stack completa
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((t) => (
                <span
                  key={t}
                  className="mono rounded-md border border-[color:var(--color-border-strong)] bg-white/[0.03] px-3 py-1.5 text-xs text-[color:var(--color-text)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
