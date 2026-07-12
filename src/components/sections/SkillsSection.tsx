import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Skills (redesign 2026-07): compact, typographic — no card grid. The core
 * stack is shouted in display type on a single line; everything else sits in
 * quiet mono-headed columns. Every item is evidenced by a case above
 * (Remark rule from the brief).
 */

const core = ["TypeScript", "JavaScript", "Node.js", "React"];

const groups = [
  {
    key: "backend",
    items: ["Express", "PostgreSQL", "Prisma", "MySQL", "REST APIs", "JWT/Auth"],
  },
  {
    key: "frontend",
    items: ["React Native", "Expo", "Tailwind", "Vite"],
  },
  {
    key: "infra",
    items: [
      "Docker",
      "AWS EC2/Bedrock/S3",
      "Caddy",
      "Linux/VPS",
      "GitHub Actions",
      "CI",
    ],
  },
] as const;

const humanKeys = ["ownership", "async", "product", "langs"] as const;

function GroupHeading({ children }: { children: string }) {
  return (
    <h3 className="mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-text-dim)]">
      {children}
    </h3>
  );
}

export function SkillsSection() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow">{t("p.skills.eyebrow")}</p>
          <h2 className="text-display-section mt-4">{t("p.skills.title")}</h2>
          <p className="mt-5 max-w-xl text-[color:var(--color-text-dim)]">
            {t("p.skills.sub")}
          </p>
        </Reveal>

        {/* Core: one loud typographic line */}
        <Reveal className="mt-14 md:mt-16" delay={0.05}>
          <GroupHeading>{t("p.skills.groups.core")}</GroupHeading>
          <ul className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            {core.map((item, i) => (
              <li
                key={item}
                className="font-display text-[clamp(1.6rem,3.8vw,2.75rem)] font-bold tracking-tight text-[color:var(--color-text-bright)]"
              >
                {i > 0 && (
                  <span
                    aria-hidden
                    className="mr-4 font-normal text-[color:var(--color-text-dim)]"
                  >
                    /
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The rest: quiet columns */}
        <Reveal
          className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4"
          delay={0.1}
        >
          {groups.map((group) => (
            <div key={group.key}>
              <GroupHeading>{t(`p.skills.groups.${group.key}`)}</GroupHeading>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-[color:var(--color-text)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <GroupHeading>{t("p.skills.groups.human")}</GroupHeading>
            <ul className="mt-4 space-y-2.5">
              {humanKeys.map((key) => (
                <li
                  key={key}
                  className="text-sm leading-relaxed text-[color:var(--color-text)]"
                >
                  {t(`p.skills.humanSkills.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
