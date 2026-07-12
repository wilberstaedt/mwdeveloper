import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";

/**
 * About (redesign 2026-07): asymmetric 60/40 — three narrative paragraphs on
 * the left, a quick-facts <dl> panel on the right. The single ember moment of
 * this section: the journey arrows (Brazil → Australia → Spain) inside facts.
 */

const factKeys = [
  "location",
  "timezone",
  "workRights",
  "languages",
  "journey",
] as const;

/** Colors the "→" separators of the journey value; plain text everywhere else. */
function FactValue({ factKey, value }: { factKey: string; value: string }) {
  if (factKey !== "journey" || !value.includes("→")) return <>{value}</>;

  const stops = value.split("→").map((s) => s.trim());
  return (
    <>
      {stops.map((stop, i) => (
        <Fragment key={`${stop}-${i}`}>
          {i > 0 && (
            <span className="px-1.5 text-[color:var(--color-ember)]">→</span>
          )}
          {stop}
        </Fragment>
      ))}
    </>
  );
}

export function AboutPortfolio() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative scroll-mt-20 border-t border-[color:var(--color-border)] py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow">{t("p.about.eyebrow")}</p>
          <h2 className="text-display-section mt-4 max-w-3xl">
            {t("p.about.title")}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-3" delay={0.05}>
            <div className="max-w-prose space-y-5 text-[15px] leading-relaxed text-[color:var(--color-text)] md:text-base">
              <p>{t("p.about.p1")}</p>
              <p>{t("p.about.p2")}</p>
              <p>{t("p.about.p3")}</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.12}>
            <div className="rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)] p-6 md:p-7">
              <h3 className="mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-text-dim)]">
                {t("p.about.factsTitle")}
              </h3>
              <dl className="mt-5">
                {factKeys.map((key, i) => (
                  <div
                    key={key}
                    className={
                      i < factKeys.length - 1
                        ? "flex items-baseline justify-between gap-6 border-b border-[color:var(--color-border)] py-3"
                        : "flex items-baseline justify-between gap-6 pt-3"
                    }
                  >
                    <dt className="mono shrink-0 text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
                      {t(`p.about.facts.${key}.label`)}
                    </dt>
                    <dd className="text-right text-sm text-[color:var(--color-text-bright)]">
                      <FactValue
                        factKey={key}
                        value={t(`p.about.facts.${key}.value`)}
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
