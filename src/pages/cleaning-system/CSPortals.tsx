import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function BrowserChrome({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]">
      <div className="flex items-center gap-1.5 border-b border-[color:var(--color-border)] bg-[color:var(--color-void)] px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-500/40" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
        <div className="h-2 w-2 rounded-full bg-[color:var(--color-success)]/40" />
        <div className="ml-2 flex-1 rounded bg-white/[0.04] px-2 py-0.5">
          <span className="mono text-[9px] text-[color:var(--color-text-dim)]">{url}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

function StatusPill({ status }: { status: "done" | "active" | "scheduled" }) {
  const styles = {
    done: "bg-[color:var(--color-success)]/10 text-[color:var(--color-success)]",
    active: "bg-yellow-500/10 text-yellow-400",
    scheduled: "bg-[color:var(--color-blue)]/10 text-[color:var(--color-cyan)]",
  };
  const labels = { done: "done", active: "active", scheduled: "sched" };
  return (
    <span className={cn("mono rounded px-1.5 py-0.5 text-[8px] uppercase tracking-wide", styles[status])}>
      {labels[status]}
    </span>
  );
}

function AdminMockup() {
  const jobs = [
    { time: "09:00", addr: "45 Queen St", cleaner: "Sarah", status: "active" as const },
    { time: "11:30", addr: "12 Alice St", cleaner: "Tom", status: "done" as const },
    { time: "14:00", addr: "88 Roma St", cleaner: "Lisa", status: "scheduled" as const },
  ];
  const navItems = ["Dashboard", "Jobs", "Cleaners", "Clients", "Invoices"];

  return (
    <BrowserChrome url="admin.glowart.com.au/jobs">
      <div className="flex h-44">
        <div className="w-28 shrink-0 border-r border-[color:var(--color-border)] px-2 py-2.5 space-y-0.5">
          {navItems.map((item, i) => (
            <div
              key={item}
              className={cn(
                "rounded px-2 py-1 mono text-[9px]",
                i === 1
                  ? "bg-[color:var(--color-blue)]/15 text-[color:var(--color-cyan)]"
                  : "text-[color:var(--color-text-dim)]",
              )}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 p-3 space-y-2">
          <div className="mono text-[9px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
            Jobs de hoje
          </div>
          {jobs.map((job) => (
            <div
              key={job.addr}
              className="flex items-center gap-2 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-void)] px-2.5 py-1.5"
            >
              <span className="mono text-[9px] text-[color:var(--color-text-dim)] w-8 shrink-0">{job.time}</span>
              <span className="mono text-[9px] text-[color:var(--color-text)] flex-1 truncate">{job.addr}</span>
              <span className="mono text-[9px] text-[color:var(--color-text-dim)] hidden sm:block">{job.cleaner}</span>
              <StatusPill status={job.status} />
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

function CleanerMockup() {
  return (
    <BrowserChrome url="app.glowart.com.au">
      <div className="p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="mono text-[9px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">Meus jobs</span>
          <span className="mono text-[9px] text-[color:var(--color-cyan)]">Quinta, 24 Abr</span>
        </div>
        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/[0.04] p-2.5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="mono text-[9px] text-yellow-400 uppercase tracking-wide">Em andamento</span>
          </div>
          <div className="mono text-[10px] font-medium text-[color:var(--color-text-bright)]">45 Queen St #201</div>
          <div className="mono text-[9px] text-[color:var(--color-text-dim)] mt-0.5">Deep clean · 09:00</div>
          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[color:var(--color-blue)]/20 px-2.5 py-1 mono text-[9px] text-[color:var(--color-cyan)]">
            Check-out →
          </div>
        </div>
        <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-void)] p-2 flex items-center gap-2">
          <span className="mono text-[9px] text-[color:var(--color-text-dim)] w-8">11:30</span>
          <div>
            <div className="mono text-[9px] text-[color:var(--color-text)]">12 Alice St</div>
            <div className="mono text-[8px] text-[color:var(--color-text-dim)]">Regular clean</div>
          </div>
          <StatusPill status="scheduled" />
        </div>
      </div>
    </BrowserChrome>
  );
}

function ClientMockup() {
  return (
    <BrowserChrome url="portal.glowart.com.au">
      <div className="p-3 space-y-2.5">
        <div className="mono text-[9px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
          Próxima limpeza
        </div>
        <div className="rounded-lg border border-[color:var(--color-blue)]/20 bg-[color:var(--color-blue)]/[0.04] p-2.5">
          <div className="flex items-start justify-between">
            <div>
              <div className="mono text-[10px] font-medium text-[color:var(--color-text-bright)]">Sex, 25 Abr · 14:00</div>
              <div className="mono text-[9px] text-[color:var(--color-text-dim)] mt-0.5">45 Queen St #201 · Sarah</div>
            </div>
            <span className="mono text-[9px] text-[color:var(--color-cyan)] bg-[color:var(--color-cyan)]/10 px-1.5 py-0.5 rounded">confirmed</span>
          </div>
        </div>
        <div className="mono text-[9px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)]">
          Última fatura
        </div>
        <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-void)] p-2.5 flex items-center justify-between">
          <div>
            <div className="mono text-[9px] text-[color:var(--color-text)]">#INV-0034 · $185.00</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" />
              <span className="mono text-[8px] text-[color:var(--color-success)]">Paid</span>
            </div>
          </div>
          <span className="mono text-[8px] text-[color:var(--color-cyan)] underline underline-offset-2">PDF →</span>
        </div>
      </div>
    </BrowserChrome>
  );
}

const portals = [
  {
    id: "admin",
    label: "Painel Admin",
    tag: "Web · Desktop-first",
    description:
      "Visão completa da operação. Jobs, agendamentos, cleaners, clientes, invoices e audit log centralizado.",
    features: [
      "Dashboard com métricas em tempo real",
      "Criação e gestão de jobs com drag-reschedule",
      "Audit log em toda mutação — quem fez, quando, o quê",
      "Geração de invoices em PDF por serviço",
      "Relatórios de receita por período",
    ],
    mockup: <AdminMockup />,
  },
  {
    id: "cleaner",
    label: "App Cleaner",
    tag: "Web · Mobile-first",
    description:
      "Interface focada para cleaners no campo. Agenda do dia, check-in/check-out por GPS, fotos e chat.",
    features: [
      "Agenda do dia com mapa de endereços",
      "Check-in e check-out com registro de horário",
      "Fotos de before/after por job",
      "Chat com admin e cliente",
      "Histórico de jobs realizados",
    ],
    mockup: <CleanerMockup />,
  },
  {
    id: "client",
    label: "Portal do Cliente",
    tag: "Web · Mobile-first",
    description:
      "Acesso do cliente a agendamentos, histórico e faturas. Clean e self-service, sem precisar ligar.",
    features: [
      "Próximas limpezas com status em tempo real",
      "Histórico completo com datas e cleaners",
      "Download de invoices em PDF",
      "Chat com o time para dúvidas",
      "Feedback pós-serviço",
    ],
    mockup: <ClientMockup />,
  },
];

export function CSPortals() {
  return (
    <section id="portals" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="text-eyebrow">3 módulos integrados</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-4xl">
            Admin, cleaner e cliente —{" "}
            <span className="text-[color:var(--color-text)]">cada um no seu portal.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-base text-[color:var(--color-text)] leading-relaxed">
            Sem confusão de acesso. Cada perfil vê só o que precisa, com a
            interface certa para o dispositivo certo.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16">
          {portals.map((portal, i) => (
            <Reveal key={portal.id} delay={0.05 * i}>
              <div
                className={cn(
                  "grid gap-8 md:grid-cols-2 md:items-start",
                  i % 2 === 1 && "md:[direction:rtl] [&>*]:[direction:ltr]",
                )}
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="mono text-xs font-semibold text-[color:var(--color-text-bright)]">
                      {portal.label}
                    </span>
                    <span className="mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-text-dim)] border border-[color:var(--color-border)] rounded px-2 py-0.5">
                      {portal.tag}
                    </span>
                  </div>
                  <p className="text-[color:var(--color-text)] leading-relaxed">
                    {portal.description}
                  </p>
                  <ul className="space-y-2">
                    {portal.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[color:var(--color-text)]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-cyan)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>{portal.mockup}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
