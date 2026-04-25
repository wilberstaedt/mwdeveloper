import { Check, Server, Paintbrush, Users, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";
import { waLink, mailto } from "@/data/contact";
import { GlowOrb } from "@/components/ui/GridBackground";

type IncludeKey = "server" | "brand" | "training" | "support";
const INCLUDE_KEYS: IncludeKey[] = ["server", "brand", "training", "support"];
const ICONS: Record<IncludeKey, typeof Server> = {
  server: Server,
  brand: Paintbrush,
  training: Users,
  support: Headphones,
};

export function CSWhiteLabel() {
  const { t } = useTranslation();
  const WA_TEXT = t("cleaning.whiteLabel.ctaWhatsApp");

  const checkList = t("cleaning.whiteLabel.checkList", {
    returnObjects: true,
    defaultValue: [] as string[],
  }) as string[];

  return (
    <section id="white-label" className="relative py-24 md:py-32 overflow-hidden">
      <GlowOrb
        className="-left-40 top-1/2 -translate-y-1/2"
        size={500}
        color="rgba(0,212,255,0.06)"
      />
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-2 md:items-start">
          <div>
            <Reveal>
              <p className="text-eyebrow">{t("cleaning.whiteLabel.eyebrow")}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
                {t("cleaning.whiteLabel.heading1")}{" "}
                <span className="text-[color:var(--color-text)]">
                  {t("cleaning.whiteLabel.heading2")}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-[color:var(--color-text)]">
                {t("cleaning.whiteLabel.body1")}
              </p>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--color-text)]">
                {t("cleaning.whiteLabel.body2")}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 space-y-2">
                {checkList.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-[color:var(--color-success)]" />
                    <span className="text-sm text-[color:var(--color-text)]">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(WA_TEXT)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-blue)] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.3)] transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)]"
                >
                  {t("cleaning.whiteLabel.ctaWhatsApp")}
                </a>
                <a
                  href={mailto("Sistema Cleaning — white-label")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.02] px-6 py-3 text-sm font-medium text-[color:var(--color-text-bright)] transition-all hover:border-[color:var(--color-cyan)] hover:bg-white/[0.05]"
                >
                  {t("cleaning.whiteLabel.ctaEmail")}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="space-y-4">
            {INCLUDE_KEYS.map((key, i) => {
              const Icon = ICONS[key];
              return (
                <Reveal key={key} delay={0.08 * i}>
                  <div className="flex gap-4 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 transition-colors hover:bg-[color:var(--color-card-hover)]">
                    <div className="shrink-0 mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--color-blue)]/10 text-[color:var(--color-cyan)]">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="mono text-sm font-medium text-[color:var(--color-text-bright)]">
                        {t(`cleaning.whiteLabel.includes.${key}.title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-text)]">
                        {t(`cleaning.whiteLabel.includes.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
