import { MessageCircle, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { GlowOrb, GridBackground } from "@/components/ui/GridBackground";
import { waLink, mailto, contact } from "@/data/contact";

const WA_TEXT = "Oi Matheus, quero saber mais sobre o Sistema Cleaning white-label.";

export function CSContact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <GridBackground fade />
      <GlowOrb
        className="left-1/2 top-0 -translate-x-1/2"
        size={600}
        color="rgba(0,102,255,0.12)"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <Badge variant="success" pulse>
            Aceitando novos clientes
          </Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-4xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-5xl">
            Bora colocar o sistema
            <br className="hidden md:block" />{" "}
            <span className="bg-gradient-to-br from-[color:var(--color-text-bright)] via-[color:var(--color-cyan)] to-[color:var(--color-blue)] bg-clip-text text-transparent">
              na sua empresa?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--color-text)] md:text-lg">
            Me chama no WhatsApp ou manda email. Respondo em até 24h.
            Se for fit, a gente marca uma call de 15 min e eu te mostro
            o sistema funcionando.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={waLink(WA_TEXT)}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-blue)] px-7 py-3.5 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,102,255,0.3)] transition-all hover:bg-[color:var(--color-cyan)] hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={mailto("Sistema Cleaning — white-label")}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-[color:var(--color-text-bright)] transition-all hover:border-[color:var(--color-cyan)] hover:bg-white/[0.05] sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.26}>
          <p className="mt-8 mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
            {contact.timezoneNow} · respondo em até 24h (dia útil)
          </p>
        </Reveal>
      </div>
    </section>
  );
}
