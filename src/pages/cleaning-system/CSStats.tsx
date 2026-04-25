import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GridBackground";

const stack = [
  "React 18", "TypeScript", "Vite", "Tailwind CSS",
  "Express.js", "Prisma ORM", "PostgreSQL",
  "Docker Compose", "Caddy", "JWT", "Resend", "i18next",
];

export function CSStats() {
  const { t } = useTranslation();

  const numbers = t("cleaning.stats.numbers", {
    returnObjects: true,
    defaultValue: [] as Array<{ value: string; label: string; sub: string }>,
  }) as Array<{ value: string; label: string; sub: string }>;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <GlowOrb
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        size={600}
        color="rgba(0,102,255,0.08)"
      />
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow">{t("cleaning.stats.eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
            {t("cleaning.stats.heading1")}{" "}
            <span className="text-[color:var(--color-text)]">{t("cleaning.stats.heading2")}</span>
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
              {t("cleaning.stats.stackLabel")}
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="mono rounded-md border border-[color:var(--color-border-strong)] bg-white/[0.03] px-3 py-1.5 text-xs text-[color:var(--color-text)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
