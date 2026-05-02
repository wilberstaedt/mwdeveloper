import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Target, Zap, BarChart3, MessageCircle } from "lucide-react";

export default function AgendaCheia() {
  useEffect(() => {
    document.title = "Agenda Cheia — Captação de leads pra clínicas de estética · MW Dev";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Plataforma multi-tenant que entrega landing de alta conversão + Google Ads + dashboard de leads pra clínicas de harmonização facial. Operação comercial do Matheus.",
      );
    }
    return () => {
      document.title = "MW Dev — Construo produtos do primeiro commit ao primeiro cliente";
    };
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            mwdeveloper.tech
          </Link>
          <a
            href="https://agendacheia.mwdeveloper.tech"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-blue)]/40 bg-[var(--color-blue)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-blue)] hover:bg-[var(--color-blue)]/15 transition"
          >
            Acessar plataforma
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-cyan)]/40 bg-[var(--color-cyan)]/10 px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]"></span>
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-cyan)]">
            Live · Aceitando clientes
          </span>
        </div>

        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
          Agenda Cheia
        </h1>

        <p className="text-xl text-[var(--color-text-dim)] mb-4">
          Captação de leads pra clínicas de harmonização facial via Google Ads.
        </p>

        <p className="text-base text-[var(--color-text-dim)] mb-12 leading-relaxed">
          Operação comercial própria que entrega 3 coisas pra clínicas de
          estética que querem mais clientes: <strong className="text-[var(--color-text)]">landing
          de alta conversão personalizada</strong>, <strong className="text-[var(--color-text)]">gestão
          de Google Ads</strong>, e <strong className="text-[var(--color-text)]">dashboard semanal
          de leads</strong>. Foco em ticket alto (R$800–3000 por cliente final) em cidades médias
          do Brasil onde a concorrência ainda é menor.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            {
              icon: Target,
              title: "Landing por clínica",
              desc: "Multi-tenant: cada cliente vira um slug. Hero, procedimentos, antes/depois, depoimentos, localização — tudo personalizado via config_json.",
            },
            {
              icon: Zap,
              title: "Captação automatizada",
              desc: "Form → Supabase → email Resend pra clínica → conversão Google Ads → redirect WhatsApp com UTMs. 100% rastreado.",
            },
            {
              icon: BarChart3,
              title: "Dashboard de leads",
              desc: "Relatório semanal automático: leads, custo por lead, ROAS. Cliente vê tudo sem precisar ligar pra mim.",
            },
            {
              icon: MessageCircle,
              title: "Pacote setup + mensalidade",
              desc: "Ticket-alvo R$2-5k/mês. Foco em escalar 3-10 clínicas pagantes nos primeiros 6 meses.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-6"
            >
              <f.icon className="w-5 h-5 text-[var(--color-blue)] mb-3" />
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-8">
          <h2 className="text-xl font-semibold mb-3">Stack técnica</h2>
          <p className="text-sm text-[var(--color-text-dim)] mb-4 leading-relaxed">
            Vite + React 19 + TypeScript + Tailwind 4 + shadcn/ui no front. Vercel
            Serverless funciona como API. Supabase com RLS multi-tenant pro DB. Resend
            pro email transacional. Google Tag Manager + Conversion API pro tracking.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "React 19",
              "Vite",
              "TypeScript",
              "Tailwind 4",
              "shadcn/ui",
              "Vercel Serverless",
              "Supabase",
              "Resend",
              "Google Ads API",
            ].map((s) => (
              <span
                key={s}
                className="mono text-xs px-2.5 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-dim)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <a
            href="https://agendacheia.mwdeveloper.tech"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-blue)]/90 transition"
          >
            Acessar plataforma <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/61410501923?text=Oi%20Matheus%2C%20vi%20o%20Agenda%20Cheia%20no%20mwdeveloper.tech"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-medium hover:bg-[var(--color-card)] transition"
          >
            <MessageCircle className="w-4 h-4" /> Conversar no WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
