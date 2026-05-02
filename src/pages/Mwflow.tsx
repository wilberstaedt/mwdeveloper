import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Globe, Wallet, Plane, Server } from "lucide-react";

export default function Mwflow() {
  useEffect(() => {
    document.title = "mwflow — Finanças pessoais multi-moeda · MW Dev";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Tracker pessoal multi-moeda (BRL/AUD/EUR) com cotações ECB ao vivo, transferências entre carteiras com conversão automática e metas linkadas a transações. Backend roda no Linux home via Cloudflare Tunnel.",
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
            href="https://mwflow.mwdeveloper.tech"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-blue)]/40 bg-[var(--color-blue)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-blue)] hover:bg-[var(--color-blue)]/15 transition"
          >
            Abrir app
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-cyan)]/40 bg-[var(--color-cyan)]/10 px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]"></span>
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-cyan)]">
            Live · Uso pessoal
          </span>
        </div>

        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">mwflow</h1>

        <p className="text-xl text-[var(--color-text-dim)] mb-4">
          Finanças pessoais multi-moeda do Matheus + Nathalia.
        </p>

        <p className="text-base text-[var(--color-text-dim)] mb-12 leading-relaxed">
          Sistema pessoal pra organizar dinheiro entre <strong className="text-[var(--color-text)]">BRL,
          AUD e EUR</strong> durante a mudança Brisbane → Valencia. Trackeamento de patrimônio,
          carteiras com saldo computado em tempo real, transferências entre contas com{" "}
          <strong className="text-[var(--color-text)]">conversão automática usando cotação ECB ao vivo</strong>,
          metas e itens de viagem linkados a transações reais. Construído em 2 dias do schema
          ao deploy.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            {
              icon: Globe,
              title: "Multi-moeda real",
              desc: "BRL/AUD/EUR com cotação ECB ao vivo via Frankfurter API. Cache 1h, atualização sob demanda. Display configurável por usuário.",
            },
            {
              icon: Wallet,
              title: "Transferências com FX",
              desc: "Saída de uma carteira AUD, entrada em outra EUR — tudo numa transação com taxa sugerida pelo ECB ou override manual.",
            },
            {
              icon: Plane,
              title: "Metas + Viagem linkadas",
              desc: "Toggle 'gasto comum / pagar meta / pagar viagem' no form. Status pago atualiza Goal.currentAmount ou TripItem.actualCost atomicamente, com conversão.",
            },
            {
              icon: Server,
              title: "Backend home-hosted",
              desc: "Roda 24/7 no laptop Linux Acer da casa via Cloudflare Tunnel. Custo $0/mês. Backup diário pg_dump + rsync via Tailscale.",
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

        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-8 mb-8">
          <h2 className="text-xl font-semibold mb-3">Stack técnica</h2>
          <p className="text-sm text-[var(--color-text-dim)] mb-4 leading-relaxed">
            Front Vite + React 19 + TS + Tailwind no Vercel. Back Express + Prisma 6 + PostgreSQL
            16 em Docker Compose rodando no Linux home. Exposição pública via Cloudflare Tunnel
            (HTTPS auto, sem porta aberta no roteador). Acesso interno via Tailscale pra dev/SSH.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "React 19",
              "Vite",
              "TypeScript",
              "Tailwind",
              "Express",
              "Prisma 6",
              "PostgreSQL",
              "Docker",
              "Cloudflare Tunnel",
              "Tailscale",
              "Frankfurter API",
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

        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-8">
          <h2 className="text-xl font-semibold mb-3">Padrão reusável</h2>
          <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">
            O mwflow validou o padrão de servidor de staging pessoal que reuso pra outros
            projetos: Linux 24/7 em casa + Cloudflare Tunnel + Tailscale + Docker Compose.
            Custo zero, HTTPS automático, sem porta exposta na rede doméstica, backup diário
            automatizado. Próximos projetos pessoais sobem em ~5 minutos.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <a
            href="https://mwflow.mwdeveloper.tech"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-blue)]/90 transition"
          >
            Abrir app <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
