import { Check, X, Minus, Smartphone, Building2, ArrowRight, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GridBackground";
import { waLink, mailto } from "@/data/contact";
import { cn } from "@/lib/utils";

type CompetitorKey = "jobber" | "servicem8" | "zenmaid";
type FeatureValue = true | false | "partial";
type TierKey = "starter" | "professional" | "premium";

interface FeatureRow {
  key: string;
  sc: FeatureValue;
  jobber: FeatureValue;
  servicem8: FeatureValue;
  zenmaid: FeatureValue;
}

const FEATURE_ROWS: FeatureRow[] = [
  { key: "unlimitedCleaners", sc: true,      jobber: false,     servicem8: false,     zenmaid: false },
  { key: "whiteLabel",        sc: true,      jobber: false,     servicem8: false,     zenmaid: false },
  { key: "clientPortal",      sc: true,      jobber: "partial", servicem8: "partial", zenmaid: true  },
  { key: "cleanerApp",        sc: true,      jobber: true,      servicem8: true,      zenmaid: true  },
  { key: "setupIncluded",     sc: true,      jobber: false,     servicem8: false,     zenmaid: false },
  { key: "directSupport",     sc: true,      jobber: false,     servicem8: false,     zenmaid: false },
  { key: "pdfInvoices",       sc: true,      jobber: true,      servicem8: true,      zenmaid: true  },
];

const PRICE_ROW = {
  sc: "A$597–997/mo",
  jobber: "A$40–200+",
  servicem8: "A$35–379+",
  zenmaid: "USD $49+",
};

const COMPETITORS: CompetitorKey[] = ["jobber", "servicem8", "zenmaid"];

const TIERS: TierKey[] = ["starter", "professional", "premium"];

function FeatureCell({ value, partialLabel, noLabel }: { value: FeatureValue; partialLabel: string; noLabel: string }) {
  if (value === true) return <Check className="h-4 w-4 text-[color:var(--color-success)]" aria-label="Yes" />;
  if (value === "partial") return (
    <span className="mono text-[10px] text-[color:var(--color-text-dim)]">{partialLabel}</span>
  );
  return <X className="h-4 w-4 text-[color:var(--color-text-dim)]/50" aria-label={noLabel} />;
}

export function CSPricing() {
  const { t } = useTranslation();

  const partialLabel = t("cleaning.pricing.comparison.partial");
  const noLabel = t("cleaning.pricing.comparison.na");

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <GlowOrb
        className="right-0 top-1/3 translate-x-1/2"
        size={480}
        color="rgba(0,102,255,0.08)"
      />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">

        {/* Header */}
        <Reveal>
          <p className="text-eyebrow">{t("cleaning.pricing.eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
            {t("cleaning.pricing.heading1")}{" "}
            <span className="text-[color:var(--color-text)]">{t("cleaning.pricing.heading2")}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--color-text)]">
            {t("cleaning.pricing.body")}
          </p>
        </Reveal>

        {/* 3 tier cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TIERS.map((tier, idx) => {
            const isProfessional = tier === "professional";
            const isPremium = tier === "premium";
            const features = t(`cleaning.pricing.tiers.${tier}.features`, {
              returnObjects: true,
              defaultValue: [] as string[],
            }) as string[];
            const ctaText = t(`cleaning.pricing.tiers.${tier}.cta`);
            const waText = t(`cleaning.pricing.tiers.starter.cta`);

            return (
              <Reveal key={tier} delay={0.08 + idx * 0.07}>
                <div
                  className={cn(
                    "relative flex flex-col rounded-2xl p-7 h-full",
                    isProfessional
                      ? "border-2 border-[color:var(--color-blue)] bg-[color:var(--color-blue)]/[0.07] shadow-[0_0_40px_rgba(0,102,255,0.15)]"
                      : "border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)]",
                  )}
                >
                  {/* Badge */}
                  {isProfessional && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-blue)]/40 bg-[color:var(--color-blue)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white shadow-[0_4px_16px_rgba(0,102,255,0.4)]">
                        <Star className="h-2.5 w-2.5 fill-current" />
                        {t("cleaning.pricing.mostPopular")}
                      </span>
                    </div>
                  )}
                  {isPremium && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-cyan)]/30 bg-[color:var(--color-cyan)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-cyan)]">
                        <Smartphone className="h-2.5 w-2.5" />
                        {t("cleaning.pricing.appIncluded")}
                      </span>
                    </div>
                  )}

                  <div className={cn("flex-1", (isProfessional || isPremium) && "mt-2")}>
                    <div className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
                      {t(`cleaning.pricing.tiers.${tier}.label`)}
                    </div>
                    <div className="mt-3 flex items-end gap-2">
                      <span className={cn(
                        "text-4xl font-semibold tracking-tight",
                        isProfessional
                          ? "text-[color:var(--color-text-bright)]"
                          : "text-[color:var(--color-text-bright)]",
                      )}>
                        {t(`cleaning.pricing.tiers.${tier}.price`)}
                      </span>
                      <span className="mono mb-1 text-sm text-[color:var(--color-text-dim)]">
                        {t("cleaning.pricing.perMonth")}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text)]">
                      {t(`cleaning.pricing.tiers.${tier}.description`)}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {features.map((f, i) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check className={cn(
                            "h-4 w-4 shrink-0 mt-0.5",
                            i === 0 && tier !== "starter"
                              ? "text-[color:var(--color-text-dim)]"
                              : isProfessional
                              ? "text-[color:var(--color-cyan)]"
                              : "text-[color:var(--color-success)]",
                          )} />
                          <span className={cn(
                            "text-sm",
                            i === 0 && tier !== "starter"
                              ? "text-[color:var(--color-text-dim)]"
                              : "text-[color:var(--color-text)]",
                          )}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 space-y-2">
                    {tier === "premium" ? (
                      <a
                        href={mailto(`Sistema Cleaning — ${t(`cleaning.pricing.tiers.${tier}.label`)}`)}
                        className={cn(
                          "group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium transition-all",
                          "border border-[color:var(--color-cyan)]/40 bg-[color:var(--color-cyan)]/5 text-[color:var(--color-text-bright)] hover:border-[color:var(--color-cyan)] hover:bg-[color:var(--color-cyan)]/10",
                        )}
                      >
                        {ctaText}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <a
                        href={waLink(waText)}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium transition-all",
                          isProfessional
                            ? "bg-[color:var(--color-blue)] text-white shadow-[0_8px_32px_rgba(0,102,255,0.3)] hover:bg-[color:var(--color-cyan)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)]"
                            : "border border-[color:var(--color-border-strong)] bg-white/[0.02] text-[color:var(--color-text-bright)] hover:border-[color:var(--color-blue)]/50 hover:bg-white/[0.05]",
                        )}
                      >
                        {ctaText}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )}
                    <p className="mono text-center text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
                      {t(`cleaning.pricing.tiers.${tier}.footnote`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Enterprise — full-width card below */}
        <Reveal delay={0.28}>
          <div className="mt-4 flex flex-col gap-5 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-white/[0.03]">
                <Building2 className="h-4 w-4 text-[color:var(--color-text-dim)]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
                    {t("cleaning.pricing.enterprise.label")}
                  </span>
                  <span className="text-lg font-semibold text-[color:var(--color-text-bright)]">
                    {t("cleaning.pricing.enterprise.priceLabel")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[color:var(--color-text)]">
                  {t("cleaning.pricing.enterprise.description")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(t("cleaning.pricing.enterprise.features", {
                    returnObjects: true,
                    defaultValue: [] as string[],
                  }) as string[]).map((f) => (
                    <span
                      key={f}
                      className="mono rounded-md border border-[color:var(--color-border)] bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-[color:var(--color-text-dim)]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <a
                href={mailto("Sistema Cleaning — Enterprise")}
                className="flex items-center gap-2 rounded-xl border border-[color:var(--color-border-strong)] bg-white/[0.02] px-6 py-3 text-sm font-medium text-[color:var(--color-text-bright)] transition-all hover:border-[color:var(--color-cyan)] hover:bg-white/[0.05] whitespace-nowrap"
              >
                {t("cleaning.pricing.enterprise.cta")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mono mt-2 text-center text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
                {t("cleaning.pricing.enterprise.footnote")}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Comparison table */}
        <Reveal delay={0.1}>
          <div className="mt-16">
            <h3 className="text-xl font-medium text-[color:var(--color-text-bright)]">
              {t("cleaning.pricing.comparison.heading")}
            </h3>
            <p className="mt-2 text-sm text-[color:var(--color-text)] leading-relaxed max-w-xl">
              {t("cleaning.pricing.comparison.subheading")}
            </p>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-[color:var(--color-border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--color-border)]">
                    <th className="px-5 py-4 text-left mono text-xs uppercase tracking-[0.15em] text-[color:var(--color-text-dim)] w-1/2">
                      {/* feature label col */}
                    </th>
                    <th className="px-5 py-4 text-center bg-[color:var(--color-blue)]/[0.06] border-x border-[color:var(--color-blue)]/20">
                      <span className="mono text-xs font-semibold text-[color:var(--color-cyan)] uppercase tracking-[0.12em]">
                        {t("cleaning.pricing.comparison.ourProduct")}
                      </span>
                    </th>
                    {COMPETITORS.map((comp) => (
                      <th key={comp} className="px-5 py-4 text-center">
                        <span className="mono text-xs text-[color:var(--color-text-dim)] uppercase tracking-[0.12em]">
                          {t(`cleaning.pricing.comparison.competitors.${comp}`)}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_ROWS.map((row, i) => (
                    <tr
                      key={row.key}
                      className={cn(
                        "border-b border-[color:var(--color-border)] last:border-0 transition-colors hover:bg-white/[0.02]",
                        i % 2 === 0 ? "bg-[color:var(--color-card)]" : "bg-[color:var(--color-void)]",
                      )}
                    >
                      <td className="px-5 py-3.5 text-sm text-[color:var(--color-text)]">
                        {t(`cleaning.pricing.comparison.features.${row.key}`)}
                      </td>
                      <td className="px-5 py-3.5 text-center bg-[color:var(--color-blue)]/[0.04] border-x border-[color:var(--color-blue)]/10">
                        <div className="flex justify-center">
                          <FeatureCell value={row.sc} partialLabel={partialLabel} noLabel={noLabel} />
                        </div>
                      </td>
                      {COMPETITORS.map((comp) => (
                        <td key={comp} className="px-5 py-3.5 text-center">
                          <div className="flex justify-center">
                            <FeatureCell value={row[comp]} partialLabel={partialLabel} noLabel={noLabel} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Price row */}
                  <tr className="bg-[color:var(--color-card)] border-t-2 border-[color:var(--color-border-strong)]">
                    <td className="px-5 py-4 mono text-xs uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
                      {t("cleaning.pricing.comparison.features.basePrice")}
                    </td>
                    <td className="px-5 py-4 text-center bg-[color:var(--color-blue)]/[0.06] border-x border-[color:var(--color-blue)]/20">
                      <span className="mono text-sm font-semibold text-[color:var(--color-text-bright)]">
                        {PRICE_ROW.sc}
                      </span>
                    </td>
                    {COMPETITORS.map((comp) => (
                      <td key={comp} className="px-5 py-4 text-center">
                        <span className="mono text-xs text-[color:var(--color-text-dim)]">
                          {PRICE_ROW[comp]}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
              <Minus className="inline h-3 w-3 mr-1 opacity-50" />
              {t("cleaning.pricing.comparison.partial")} = portal without full feature parity
            </p>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal delay={0.1}>
          <div className="mt-16">
            <p className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-dim)] mb-6">
              {t("cleaning.pricing.faq.label")}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {(t("cleaning.pricing.faq.items", {
                returnObjects: true,
                defaultValue: [] as Array<{ q: string; a: string }>,
              }) as Array<{ q: string; a: string }>).map((item) => (
                <div
                  key={item.q}
                  className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5"
                >
                  <p className="text-sm font-medium text-[color:var(--color-text-bright)]">{item.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text)]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
