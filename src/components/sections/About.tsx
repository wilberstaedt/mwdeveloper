import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, Clock, Zap } from "lucide-react";

const factKeys = [
  { id: "location", icon: MapPin },
  { id: "timezone", icon: Clock },
  { id: "mode", icon: Zap },
] as const;

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <div>
              <span className="text-eyebrow">{t("about.eyebrow")}</span>
              <h2 className="mt-4 text-balance text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-5xl">
                {t("about.headingA")}
                <br />
                {t("about.headingB")}
                <span className="text-[color:var(--color-cyan)]">
                  {" "}
                  {t("about.headingC")}
                </span>
              </h2>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-[color:var(--color-text)]">
                <p>{t("about.p1")}</p>
                <p>
                  {t("about.p2A")}{" "}
                  <span className="text-[color:var(--color-text-bright)]">
                    {t("about.p2B")}
                  </span>
                  {t("about.p2C")}
                </p>
                <p>{t("about.p3")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="sticky top-28 overflow-hidden rounded-[var(--radius-card)] border bg-gradient-to-br from-[color:var(--color-card)] to-[color:var(--color-void)] p-8">
                <div className="flex items-center gap-2">
                  <span className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-blue)]">
                    {t("about.quickFacts")}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[color:var(--color-blue)]/30 to-transparent" />
                </div>

                <dl className="mt-8 space-y-6">
                  {factKeys.map(({ id, icon: Icon }) => (
                    <div
                      key={id}
                      className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-x-4"
                    >
                      <div
                        aria-hidden="true"
                        className="row-span-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--color-border-strong)] bg-white/[0.02]"
                      >
                        <Icon className="h-4 w-4 text-[color:var(--color-cyan)]" />
                      </div>
                      <dt className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
                        {t(`about.facts.${id}.label`)}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-[color:var(--color-text-bright)]">
                        {t(`about.facts.${id}.value`)}
                      </dd>
                      <dd className="mono text-[11px] text-[color:var(--color-text-dim)]">
                        {t(`about.facts.${id}.meta`)}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 border-t border-[color:var(--color-border)] pt-6">
                  <p className="mono text-[11px] leading-relaxed text-[color:var(--color-text-dim)]">
                    <span className="text-[color:var(--color-cyan)]">$</span>{" "}
                    whoami
                    <br />
                    <span className="text-[color:var(--color-text)]">
                      {t("about.terminal.whoami")}
                    </span>
                    <br />
                    <span className="text-[color:var(--color-cyan)]">$</span>{" "}
                    cat ~/.about
                    <br />
                    <span className="text-[color:var(--color-text)]">
                      {t("about.terminal.aboutLine")}
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
