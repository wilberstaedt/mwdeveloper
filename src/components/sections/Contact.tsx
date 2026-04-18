import { useTranslation } from "react-i18next";
import { Mail, MessageCircle, ArrowUpRight, Clock, FileText } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { GridBackground, GlowOrb } from "@/components/ui/GridBackground";
import { useCvPath } from "@/i18n/useCvPath";
import { contact, mailto, waLink } from "@/data/contact";

export function Contact() {
  const { t } = useTranslation();
  const cvPath = useCvPath();

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      <GridBackground />
      <GlowOrb
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        size={900}
        color="rgba(0,102,255,0.14)"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <Badge variant="success" pulse>
            {t("contact.badge")}
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-8 text-balance text-4xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-6xl lg:text-7xl">
            {t("contact.headingA")}
            <br />
            <span className="bg-gradient-to-br from-[color:var(--color-text-bright)] via-[color:var(--color-cyan)] to-[color:var(--color-blue)] bg-clip-text text-transparent">
              {t("contact.headingB")}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[color:var(--color-text)] md:text-lg">
            {t("contact.body")}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center gap-3 rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)] px-7 py-5 text-left transition-all hover:-translate-y-1 hover:border-[color:var(--color-cyan)] hover:bg-[color:var(--color-card-hover)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-blue-soft)]">
                <MessageCircle className="h-5 w-5 text-[color:var(--color-cyan)]" />
              </div>
              <div className="flex-1">
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
                  {t("contact.whatsapp")}
                </div>
                <div className="mt-0.5 text-sm font-medium text-[color:var(--color-text-bright)]">
                  {contact.whatsappDisplay}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[color:var(--color-text-dim)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-cyan)]" />
            </a>

            <a
              href={mailto()}
              className="group flex items-center justify-center gap-3 rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)] px-7 py-5 text-left transition-all hover:-translate-y-1 hover:border-[color:var(--color-cyan)] hover:bg-[color:var(--color-card-hover)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-blue-soft)]">
                <Mail className="h-5 w-5 text-[color:var(--color-cyan)]" />
              </div>
              <div className="flex-1">
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
                  {t("contact.email")}
                </div>
                <div className="mt-0.5 text-sm font-medium text-[color:var(--color-text-bright)]">
                  {contact.email}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[color:var(--color-text-dim)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-cyan)]" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <a
            href={cvPath}
            target="_blank"
            rel="noreferrer"
            className="group mx-auto mt-4 inline-flex items-center gap-3 rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-card)]/60 px-6 py-4 transition-all hover:-translate-y-1 hover:border-[color:var(--color-cyan)] hover:bg-[color:var(--color-card-hover)]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--color-blue-soft)]">
              <FileText className="h-4 w-4 text-[color:var(--color-cyan)]" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-[color:var(--color-text-bright)]">
                {t("contact.cv")}
              </div>
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
                {t("contact.cvMeta")}
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[color:var(--color-text-dim)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-cyan)]" />
          </a>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mx-auto mt-14 inline-flex items-center gap-3 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)]/60 px-5 py-2.5 backdrop-blur-sm">
            <Clock className="h-3.5 w-3.5 text-[color:var(--color-text-dim)]" />
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
              {contact.locationNow} · {contact.timezoneNow}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
