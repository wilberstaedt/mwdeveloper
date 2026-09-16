import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, MessageCircle } from "lucide-react";
import { contact } from "@/data/contact";
import { INICIO, type LinguaInicio } from "@/data/inicio";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ScrollStory } from "@/components/sections/ScrollStory";

const IMAGENS = ["/lp/samba-site-1200.webp", "/lp/cleaning-dashboard-1200.webp"] as const;

function lingua(l: string | undefined): LinguaInicio {
  if (l?.startsWith("es")) return "es";
  if (l?.startsWith("pt")) return "pt-BR";
  return "en";
}

const wa = (texto: string) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(texto)}`;

export default function Inicio() {
  const { i18n } = useTranslation();
  const tx = INICIO[lingua(i18n.resolvedLanguage)];

  useEffect(() => {
    document.title = tx.titulo;
    document.documentElement.lang = lingua(i18n.resolvedLanguage);
    document.querySelector('meta[name="description"]')?.setAttribute("content", tx.descricao);
  }, [tx, i18n.resolvedLanguage]);

  return (
    <div className="min-h-screen bg-void text-text">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
          <span className="font-mono text-[13px] font-semibold tracking-[0.14em] text-text-bright">MW DEV</span>
          <div className="flex items-center gap-4">
            <Link to="/cv" className="text-[13px] font-semibold text-text-dim hover:text-text-bright">CV</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-5xl px-5 pb-16 pt-12 md:pb-24 md:pt-20">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-cyan">{tx.olho}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[34px] font-bold leading-[1.1] tracking-tight text-cloud [text-wrap:balance] md:text-[52px]">{tx.h1}</h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-7 text-text">{tx.sub}</p>
          <a
            href={wa(tx.wa)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue px-6 text-[15px] font-semibold text-white transition-[transform,background-color] duration-150 ease-[cubic-bezier(.05,.7,.1,1)] hover:scale-[1.02] hover:bg-[#1a75ff] active:scale-[.98]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" /> {tx.cta}
          </a>
        </section>

        <ScrollStory
          olho={tx.historia.olho}
          atos={tx.historia.atos}
          fecho={tx.historia.fecho}
          cta={tx.historia.cta}
          ctaHref={wa(tx.historia.cta)}
        />

        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <h2 className="font-display text-[28px] font-bold leading-tight text-cloud md:text-[36px]">{tx.mercadosTitulo}</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {tx.mercados.map((m) => {
                const classe = "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-cyan";
                const corpo = (
                  <>
                    <h3 className="text-[20px] font-semibold text-text-bright">{m.nome}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-6 text-text">{m.texto}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-cyan">
                      {m.cta} <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </>
                );
                return m.rota ? (
                  <Link key={m.id} to={m.rota} className={classe}>{corpo}</Link>
                ) : (
                  <a key={m.id} href={wa(m.wa!)} target="_blank" rel="noopener noreferrer" className={classe}>{corpo}</a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-16 md:py-24">
          <h2 className="font-display text-[28px] font-bold leading-tight text-cloud md:text-[36px]">{tx.servicosTitulo}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {tx.servicos.map((s) => (
              <article key={s.titulo} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-[20px] font-semibold text-text-bright">{s.titulo}</h3>
                <p className="mt-2 text-[15px] leading-6 text-text">{s.texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <h2 className="font-display text-[28px] font-bold leading-tight text-cloud md:text-[36px]">{tx.provaTitulo}</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {tx.casos.map((c, i) => (
                <article key={c.titulo}>
                  <div className="overflow-hidden rounded-2xl border border-border-strong bg-card">
                    <img src={IMAGENS[i]} alt={c.alt} width={1200} height={750} loading="lazy" decoding="async" className="block h-auto w-full" />
                  </div>
                  <p className="mt-5 font-mono text-[13px] uppercase tracking-[0.12em] text-cyan">{c.etiqueta}</p>
                  <h3 className="mt-2 text-[20px] font-semibold text-text-bright">{c.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-text">{c.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-[15px] sm:flex-row sm:items-center sm:justify-between">
          <span className="text-text-dim">© {new Date().getFullYear()} MW Dev</span>
          <Link to="/cv" className="text-text-bright hover:text-cyan">
            {tx.cv} <span className="text-cyan">{tx.cvLink} →</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
