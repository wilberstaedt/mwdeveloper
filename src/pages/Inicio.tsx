import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { contact } from "@/data/contact";
import { INICIO, type LinguaInicio } from "@/data/inicio";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { MarcaMW } from "@/components/brand/MarcaMW";
import { SeletorFlutuante } from "@/components/ui/SeletorFlutuante";
import { CinemaHero } from "@/components/sections/CinemaHero";
import { CinemaFatura } from "@/components/sections/CinemaFatura";
import { CinemaAgenda } from "@/components/sections/CinemaAgenda";
import { CinemaAnuncio } from "@/components/sections/CinemaAnuncio";
import { Capacidades } from "@/components/sections/Capacidades";
import { Processo } from "@/components/sections/Processo";
import { CinemaLanding } from "@/components/sections/CinemaLanding";
import { Fecho } from "@/components/sections/Fecho";
import { Casos } from "@/components/sections/Casos";
import { Mercados } from "@/components/sections/Mercados";

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
      <SeletorFlutuante />
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
          <MarcaMW />
          <div className="flex items-center gap-4">
            <Link to="/cv" className="text-[13px] font-semibold text-text-dim hover:text-text-bright">CV</Link>
            <LanguageSwitcher idiomas={["es", "pt-BR", "en"]} />
          </div>
        </div>
      </header>

      <main>
        <CinemaHero
          olho={tx.olho}
          h1={tx.h1}
          linhas={tx.h1Linhas}
          sub={tx.sub}
          cta={tx.cta}
          ctaHref={wa(tx.wa)}
          dica={tx.dicaScroll}
          prova={tx.prova}
        />

        {/* Ordem da história (16/09, correcção do Matheus: a página parecia
            vender um sistema de limpeza): primeiro o que ele faz para QUALQUER
            negócio (anúncio → landing → cliente), depois um caso real mostrado
            como caso, depois o leque completo e como se trabalha. */}
        <CinemaAnuncio texto={tx.anuncio} ctaHref={wa(tx.wa)} />

        <CinemaLanding texto={tx.landing} rota="/ejemplo/limpieza" lingua={lingua(i18n.resolvedLanguage)} />

        <div className="bg-void px-6 pt-20 text-center md:pt-28">
          <span className="inline-block rounded-full border border-white/12 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim md:text-[12px]">
            {tx.rotuloCaso}
          </span>
        </div>

        <CinemaFatura texto={tx.fatura} />

        <CinemaAgenda texto={tx.agenda} />

        <Capacidades texto={tx.capacidades} />

        <Processo texto={tx.processo} />

        {/* A ScrollStory (cartoes com capturas paradas) saiu da home a 16/09:
            o Matheus pediu o registo da Apple, e o capitulo em ecra cheio faz o
            mesmo trabalho com o produto em movimento. O ficheiro fica no repo. */}

        <Mercados titulo={tx.mercadosTitulo} itens={tx.mercados} href={wa} />

        {/* A secção "Qué hago" saiu a 16/09: a Capacidades cobre o mesmo com
            mais detalhe. Os textos ficam em data/inicio.ts para as landings. */}

        <Casos texto={{ provaTitulo: tx.provaTitulo, casos: tx.casos }} />

        <Fecho texto={tx.fecho} ctaHref={wa(tx.wa)} />

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
