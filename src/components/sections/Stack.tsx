import { Reveal } from "@/components/ui/Reveal";
import { stackGroups } from "@/data/stack";

export function Stack() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="mb-12">
            <span className="text-eyebrow">Toolbelt</span>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-5xl">
              As ferramentas que uso todo dia pra{" "}
              <span className="text-[color:var(--color-cyan)]">shipar</span>.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.06}>
              <div className="h-full rounded-[var(--radius-card-sm)] border bg-[color:var(--color-card)] p-6 transition-colors hover:bg-[color:var(--color-card-hover)]">
                <div className="flex items-center gap-2">
                  <span className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-blue)]">
                    / {group.label}
                  </span>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="mono rounded-md border border-[color:var(--color-border)] bg-white/[0.02] px-2.5 py-1.5 text-xs text-[color:var(--color-text)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
