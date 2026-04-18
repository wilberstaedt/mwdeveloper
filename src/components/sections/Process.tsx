import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { id: "talk", no: "01" },
  { id: "scope", no: "02" },
  { id: "build", no: "03" },
  { id: "ship", no: "04" },
] as const;

export function Process() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="mb-14">
            <span className="text-eyebrow">{t("process.eyebrow")}</span>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-5xl">
              {t("process.headingA")}
              <br />
              <span className="text-[color:var(--color-cyan)]">
                {t("process.headingB")}
              </span>{" "}
              {t("process.headingC")}
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
                  {t(`process.steps.${step.id}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-text)]">
                  {t(`process.steps.${step.id}.description`)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
