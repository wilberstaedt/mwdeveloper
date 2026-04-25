import { Check, X, Minus, Zap, Building2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";
import { GlowOrb } from "@/components/ui/GridBackground";
import { waLink, mailto } from "@/data/contact";
import { cn } from "@/lib/utils";

type CompetitorKey = "jobber" | "servicem8" | "zenmaid";
type FeatureValue = true | false | "partial";

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
  sc: "A$500/mo",
  jobber: "A$40–200+",
  servicem8: "A$35–379+",
  zenmaid: "USD $49+",
};

const COMPETITORS: CompetitorKey[] = ["jobber", "servicem8", "zenmaid"];

function FeatureCell({ value, partialLabel, noLabel }: { value: FeatureValue; partialLabel: string; noLabel: string }) {
  if (value === true) return <Check className="h-4 w-4 text-[color:var(--color-success)]" aria-label="Yes" />;
  if (value === "partial") return (
    <span className="mono text-[10px] text-[color:var(--color-text-dim)]">{partialLabel}</span>
  );
  return <X className="h-4 w-4 text-[color:var(--color-text-dim)]/50" aria-label={noLabel} />;
}

export function CSPricing() {
  const { t } = useTranslation();
  const WA_TEXT = t("cleaning.pricing.standard.cta");

  const standardFeatures = t("cleaning.pricing.standard.features", {
    returnObjects: true,
    defaultValue: [] as string[],
  }) as string[];

  const enterpriseFeatures = t("cleaning.pricing.enterprise.features", {
    returnObjects: true,
    defaultValue: [] as string[],
  }) as string[];

  const faqItems = t("cleaning.pricing.faq.items", {
    returnObjects: true,
    defaultValue: [] as Array<{ q: string; a: string }>,
  }) as Array<{ q: string; a: string }>;

  const partialLabel = t("cleaning.pricing.comparison.partial");
  const noLabel = t("cleaning.pricing.comparison.na");

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <GlowOrb
        className="right-0 top-1/3 translate-x-1/2"
        size={480}
        color="rgba(0,102,255,0.08)"
      />
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">

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

        {/* Plan cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">

          {/* White-label */}
          <Reveal delay={0.08}>
            <div className="glow-border relative flex flex-col rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)] p-8">
              <div className="absolute -top-3 left-8">
                <span className="mono inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-blue)]/30 bg-[color:var(--color-blue)]/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-cyan)]">
                  <Zap className="h-2.5 w-2.5" />
                  {t("cleaning.pricing.planBadge")}
                </span>
              </div>
              <div className="mt-2">
                <div className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
                  {t("cleaning.pricing.standard.label")}
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-5xl font-semibold tracking-tight text-[color:var(--color-text-bright)]">A$500</span>
                  <span className="mono mb-1.5 text-sm text-[color:var(--color-text-dim)]">
                    {t("cleaning.pricing.perMonth")}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--color-text)]">
                  {t("cleaning.pricing.standard.description")}
                </p>
              </div>
              <ul className="mt-7 space-y-2.5 flex-1">
                {standardFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-[color:var(--color-success)]" />
                    <span className="text-sm text-[color:var(--color-text)]">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-3">
                <a
                  href={waLink(WA_TEXT)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-blue)] px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.25)] transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.3)]"
                >
                  {t("cleaning.pricing.standard.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <p className="mono text-center text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
                  {t("cleaning.pricing.standard.footnote")}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Enterprise */}
          <Reveal delay={0.13}>
            <div className="flex flex-col rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-8">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[color:var(--color-text-dim)]" strokeWidth={1.5} />
                  <span className="mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
                    {t("cleaning.pricing.enterprise.label")}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-5xl font-semibold tracking-tight text-[color:var(--color-text-bright)]">
                    {t("cleaning.pricing.enterprise.priceLabel")}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--color-text)]">
                  {t("cleaning.pricing.enterprise.description")}
                </p>
              </div>
              <ul className="mt-7 space-y-2.5 flex-1">
                {enterpriseFeatures.map((f, i) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className={cn(
                      "h-4 w-4 shrink-0 mt-0.5",
                      i === 0 ? "text-[color:var(--color-text-dim)]" : "text-[color:var(--color-cyan)]",
                    )} />
                    <span className={cn(
                      "text-sm",
                      i === 0 ? "text-[color:var(--color-text-dim)]" : "text-[color:var(--color-text)]",
                    )}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-3">
                <a
                  href={mailto("Sistema Cleaning — Enterprise")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--color-border-strong)] bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-[color:var(--color-text-bright)] transition-all hover:border-[color:var(--color-cyan)] hover:bg-white/[0.05]"
                >
                  {t("cleaning.pricing.enterprise.cta")}
                </a>
                <p className="mono text-center text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
                  {t("cleaning.pricing.enterprise.footnote")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

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
                    {/* Sistema Cleaning — highlighted */}
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
              {faqItems.map((item) => (
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
