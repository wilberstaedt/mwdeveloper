import {
  FileText,
  MessageSquare,
  ShieldCheck,
  Globe,
  Smartphone,
  Lock,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  {
    icon: FileText,
    title: "Invoices em PDF",
    description:
      "Geração automática por serviço. Admin aprova, cliente baixa. Layout profissional com dados da empresa.",
  },
  {
    icon: MessageSquare,
    title: "Chat integrado",
    description:
      "Mensagens entre admin, cleaner e cliente em tempo quase-real. Tudo dentro do sistema, sem WhatsApp no meio.",
  },
  {
    icon: ShieldCheck,
    title: "Audit logs completos",
    description:
      "Toda mutação registrada: quem fez, quando, o quê. Admin vê histórico completo por entidade.",
  },
  {
    icon: Globe,
    title: "Bilíngue EN/PT-BR",
    description:
      "Interface completa em inglês e português. Troca de idioma em tempo real sem reload.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    description:
      "Os 3 portais funcionam perfeitamente em celular. Cleaners acessam pelo browser, sem app pra instalar.",
  },
  {
    icon: Lock,
    title: "Auth seguro",
    description:
      "JWT com refresh tokens por dispositivo. Sessões independentes, revogação granular, sem state no servidor.",
  },
];

export function CSFeatures() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] grid-pattern opacity-40" />
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow">Funcionalidades</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
            O que vem incluso —{" "}
            <span className="text-[color:var(--color-text)]">tudo pronto desde o dia 1.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-[color:var(--color-border)] rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={0.05 * i}>
              <div className="group relative bg-[color:var(--color-card)] p-6 transition-colors hover:bg-[color:var(--color-card-hover)]">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--color-blue)]/10 text-[color:var(--color-cyan)] transition-colors group-hover:bg-[color:var(--color-blue)]/20">
                  <f.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                </div>
                <h3 className="mono text-sm font-medium text-[color:var(--color-text-bright)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text)]">
                  {f.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
