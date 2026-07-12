import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GridBackground, GlowOrb } from "@/components/ui/GridBackground";
import { workCases, type CaseImage, type WorkCase } from "@/data/cases";
import { cn } from "@/lib/utils";

/**
 * Selected Work (redesign 2026-07): the proof section. No identical card grid
 * (banned by the brief) — each case is a full-width, alternating composition:
 * screenshot in a browser-window frame (~60%) next to problem/built/outcome
 * copy (~40%). Cases without a screenshot (pipeline, lumen) get a typographic
 * treatment instead: a mono log panel and a display wordmark panel.
 */

function FrameChrome({ url, title }: { url?: string; title?: string }) {
  return (
    <div
      aria-hidden
      className="flex items-center gap-3 border-b border-[color:var(--color-border)] px-4 py-2.5"
    >
      <span className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/10" />
        ))}
      </span>
      {(url ?? title) && (
        <span className="mono ml-1 truncate rounded-md bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-[color:var(--color-text-dim)]">
          {url ?? title}
        </span>
      )}
    </div>
  );
}

function BrowserFrame({
  url,
  image,
  className,
  decorative = false,
}: {
  url?: string;
  image: CaseImage;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <figure
      aria-hidden={decorative || undefined}
      className={cn(
        "overflow-hidden rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)] shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <FrameChrome url={url} />
      <img
        src={image.src}
        alt={decorative ? "" : image.alt}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </figure>
  );
}

/**
 * Pipeline case visual: a terminal-style processing log. Deliberately abstract
 * (no screenshot exists for internal client work) and decorative — the real
 * information lives in the adjacent copy, so the panel is aria-hidden.
 * Log lines are hardcoded EN on purpose: terminal output is code voice.
 */
function PipelinePanel() {
  const steps = [
    ["ingest", "inbox/*.pdf"],
    ["extract", "amazon-bedrock"],
    ["validate", "purchase-data"],
    ["publish", "campaign-api"],
  ] as const;

  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)] shadow-[var(--shadow-card)]"
    >
      <FrameChrome title="pipeline.log" />
      <div className="mono space-y-1 p-6 text-[13px] leading-7 md:p-8">
        <p className="text-[color:var(--color-text-bright)]">
          $ invoice-pipeline --run
        </p>
        {steps.map(([step, target]) => (
          <p key={step} className="text-[color:var(--color-text-dim)]">
            <span className="inline-block w-24 text-[color:var(--color-text)]">
              {step}
            </span>
            {target}
            <span className="float-right">ok</span>
          </p>
        ))}
        <p className="pt-3 text-[color:var(--color-text)]">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)] align-middle" />
          status: in production
          <span className="ml-2 animate-pulse text-[color:var(--color-text-bright)]">
            ▌
          </span>
        </p>
      </div>
    </div>
  );
}

/**
 * Lúmen case visual: no screenshot, so the wordmark IS the visual — a display
 * type panel echoing the hero's name-and-ember-dot motif. The single ember
 * moment of this section lives here.
 */
function LumenPanel({ name }: { name: string }) {
  return (
    <div
      aria-hidden
      className="relative flex min-h-[16rem] items-center justify-center overflow-hidden rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)] shadow-[var(--shadow-card)] md:min-h-[22rem]"
    >
      <GridBackground className="opacity-70" />
      <GlowOrb
        className="-top-24 right-6"
        size={360}
        color="rgba(0,102,255,0.16)"
      />
      <p className="font-display relative text-[clamp(3rem,7vw,5.25rem)] font-bold tracking-tight text-[color:var(--color-cloud)]">
        {name}
        <span className="text-[color:var(--color-ember)]">.</span>
      </p>
    </div>
  );
}

function CaseVisual({ workCase, name }: { workCase: WorkCase; name: string }) {
  if (workCase.key === "pipeline") return <PipelinePanel />;
  if (workCase.key === "lumen") return <LumenPanel name={name} />;
  if (!workCase.image) return null;

  if (workCase.imageSecondary) {
    // Layered composition (flagship case): dashboard peeking behind schedule.
    return (
      <div className="relative lg:pr-10 lg:pt-14">
        <BrowserFrame
          image={workCase.imageSecondary}
          className="absolute right-0 top-0 hidden w-[76%] opacity-50 lg:block"
          decorative
        />
        <BrowserFrame
          url={workCase.frameUrl}
          image={workCase.image}
          className="relative z-10"
        />
      </div>
    );
  }

  return <BrowserFrame url={workCase.frameUrl} image={workCase.image} />;
}

function CaseItem({ workCase, index }: { workCase: WorkCase; index: number }) {
  const { t } = useTranslation();
  const { key } = workCase;
  const name = t(`p.work.cases.${key}.name`);
  const visualLeft = index % 2 === 0;

  const details = ["problem", "built", "outcome"] as const;

  return (
    <Reveal as="li" y={32}>
      <article className="grid items-center gap-10 md:grid-cols-5 md:gap-12 lg:gap-16">
        {/* Copy — ~40%. First in DOM so headings lead for screen readers. */}
        <div className={cn("md:col-span-2", visualLeft && "md:order-2")}>
          <p className="mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
            <span className="mr-3 text-[color:var(--color-blue)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            {t(`p.work.cases.${key}.tag`)}
          </p>
          <h3 className="font-display mt-3 text-3xl font-bold tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
            {name}
          </h3>

          <dl className="mt-7 space-y-5">
            {details.map((d) => (
              <div key={d}>
                <dt className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
                  {t(`p.work.${d}Label`)}
                </dt>
                <dd
                  className={cn(
                    "mt-1.5 text-[15px] leading-relaxed",
                    d === "outcome"
                      ? "text-[color:var(--color-text-bright)]"
                      : "text-[color:var(--color-text)]",
                  )}
                >
                  {t(`p.work.cases.${key}.${d}`)}
                </dd>
              </div>
            ))}
          </dl>

          <ul aria-label="Stack" className="mt-7 flex flex-wrap gap-2">
            {workCase.stack.map((tech) => (
              <li
                key={tech}
                className="mono rounded-md border border-[color:var(--color-border-strong)] bg-white/[0.02] px-2.5 py-1 text-[11px] text-[color:var(--color-text-dim)]"
              >
                {tech}
              </li>
            ))}
          </ul>

          {workCase.href && (
            <a
              href={workCase.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t("p.work.visit")} — ${name}`}
              className="mono mt-7 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[color:var(--color-cyan)] transition-colors hover:text-[color:var(--color-text-bright)]"
            >
              {t("p.work.visit")}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>

        {/* Visual — ~60%, alternating sides per case. */}
        <div className={cn("md:col-span-3", visualLeft && "md:order-1")}>
          <CaseVisual workCase={workCase} name={name} />
        </div>
      </article>
    </Reveal>
  );
}

export function WorkSection() {
  const { t } = useTranslation();

  return (
    <section id="work" className="relative scroll-mt-20 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow">{t("p.work.eyebrow")}</p>
          <h2 className="text-display-section mt-4 max-w-3xl">
            {t("p.work.title")}
          </h2>
          <p className="mt-5 max-w-xl text-[color:var(--color-text-dim)]">
            {t("p.work.sub")}
          </p>
        </Reveal>

        <ol className="mt-20 space-y-28 md:mt-28 md:space-y-40">
          {workCases.map((workCase, index) => (
            <CaseItem key={workCase.key} workCase={workCase} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
