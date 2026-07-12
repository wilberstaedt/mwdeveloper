import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Experience (redesign 2026-07): vertical timeline, two-column on desktop
 * (period left, content right — brittanychiang reading discipline), stacked on
 * mobile. Semantic <ol> per the repo's a11y pattern. The single ember moment
 * of this section is the "now" dot on the current role.
 */

const jobs = [
  { key: "mwdev", bullets: 3, current: true },
  { key: "essentia", bullets: 3, current: false },
  { key: "zaztech", bullets: 3, current: false },
  { key: "indie", bullets: 2, current: false },
] as const;

export function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 border-t border-[color:var(--color-border)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow">{t("p.experience.eyebrow")}</p>
          <h2 className="text-display-section mt-4 max-w-2xl">
            {t("p.experience.title")}
          </h2>
        </Reveal>

        <ol className="mt-16 md:mt-20">
          {jobs.map((job, index) => {
            const isLast = index === jobs.length - 1;
            return (
              <Reveal
                as="li"
                key={job.key}
                delay={index * 0.06}
                className="grid md:grid-cols-[11rem_1fr] md:gap-10"
              >
                <p className="mono pl-7 text-xs text-[color:var(--color-text-dim)] md:pl-0 md:pt-1.5">
                  {t(`p.experience.jobs.${job.key}.period`)}
                </p>

                <div className={cn("relative pl-7", isLast ? "pb-2" : "pb-14")}>
                  {/* Timeline rail + node */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-[3px] top-3 w-px bg-[color:var(--color-border-strong)]",
                      isLast ? "h-8" : "bottom-0",
                    )}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-[7px] h-[7px] w-[7px] rounded-full",
                      job.current
                        ? "bg-[color:var(--color-ember)] shadow-[0_0_12px_var(--color-ember-glow)]"
                        : "bg-white/20",
                    )}
                  />

                  <h3 className="font-display mt-0 text-lg font-semibold leading-snug tracking-tight text-[color:var(--color-text-bright)] md:text-xl">
                    {t(`p.experience.jobs.${job.key}.role`)}
                    <span className="px-2 font-normal text-[color:var(--color-text-dim)]">
                      ·
                    </span>
                    {t(`p.experience.jobs.${job.key}.company`)}
                  </h3>
                  <p className="mono mt-1.5 text-xs text-[color:var(--color-text-dim)]">
                    {t(`p.experience.jobs.${job.key}.location`)}
                  </p>

                  <ul className="mt-5 max-w-2xl list-disc space-y-2.5 pl-4 marker:text-[color:var(--color-text-dim)]">
                    {Array.from({ length: job.bullets }, (_, b) => (
                      <li
                        key={b}
                        className="text-sm leading-relaxed text-[color:var(--color-text)]"
                      >
                        {t(`p.experience.jobs.${job.key}.b${b + 1}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
