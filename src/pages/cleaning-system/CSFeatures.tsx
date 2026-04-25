import { FileText, MessageSquare, ClipboardList, Globe, Smartphone, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";

const FEATURE_KEYS = ["invoices", "chat", "history", "bilingual", "mobile", "auth"] as const;
const ICONS = {
  invoices: FileText,
  chat: MessageSquare,
  history: ClipboardList,
  bilingual: Globe,
  mobile: Smartphone,
  auth: Lock,
};

export function CSFeatures() {
  const { t } = useTranslation();

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] grid-pattern opacity-40" />
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow">{t("cleaning.features.eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
            {t("cleaning.features.heading1")}{" "}
            <span className="text-[color:var(--color-text)]">{t("cleaning.features.heading2")}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-[color:var(--color-border)] rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_KEYS.map((key, i) => {
            const Icon = ICONS[key];
            return (
              <Reveal key={key} delay={0.05 * i}>
                <div className="group relative bg-[color:var(--color-card)] p-6 transition-colors hover:bg-[color:var(--color-card-hover)]">
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--color-blue)]/10 text-[color:var(--color-cyan)] transition-colors group-hover:bg-[color:var(--color-blue)]/20">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mono text-sm font-medium text-[color:var(--color-text-bright)]">
                    {t(`cleaning.features.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text)]">
                    {t(`cleaning.features.items.${key}.description`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
