import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";

/**
 * SELECTOR DE IDIOMA FLUTUANTE (16/09/2026).
 *
 * O cabeçalho da home não é fixo — desaparece ao primeiro scroll e com ele o
 * selector de idioma. O Matheus pediu um botão pequeno que fique por perto
 * depois de se começar a rolar, no computador e no telemóvel, "algo discreto
 * que não atrapalhe".
 *
 * Por isso: só aparece depois de 600 px, encosta-se ao canto, é do tamanho de
 * uma etiqueta e some quando se volta ao topo, onde o do cabeçalho já serve.
 *
 * Oferece as três línguas em que a home está ESCRITA. O selector do cabeçalho
 * lista cinco, mas as outras duas caem no texto em inglês — meter aqui um
 * botão que não muda a página seria mentir ao visitante.
 */

const TODAS = [
  { id: "es", curto: "ES", nome: "Español" },
  { id: "pt-BR", curto: "PT", nome: "Português" },
  { id: "en", curto: "EN", nome: "English" },
  { id: "fr", curto: "FR", nome: "Français" },
  { id: "de", curto: "DE", nome: "Deutsch" },
] as const;

type Lingua = (typeof TODAS)[number];

function atual(resolvida: string | undefined, lista: readonly Lingua[]) {
  const achada = lista.find((l) => resolvida?.startsWith(l.id.slice(0, 2)));
  return achada ?? lista[lista.length - 1];
}

export function SeletorFlutuante({ ids }: { ids?: readonly string[] } = {}) {
  const { i18n } = useTranslation();
  const LINGUAS = ids ? TODAS.filter((l) => ids.includes(l.id)) : TODAS.slice(0, 3);
  const [visivel, setVisivel] = useState(false);
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);
  const agora = atual(i18n.resolvedLanguage, LINGUAS);

  useEffect(() => {
    const ver = () => {
      const passou = window.scrollY > 600;
      setVisivel(passou);
      if (!passou) setAberto(false);
    };
    ver();
    window.addEventListener("scroll", ver, { passive: true });
    return () => window.removeEventListener("scroll", ver);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: MouseEvent) => {
      if (!caixa.current?.contains(e.target as Node)) setAberto(false);
    };
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("mousedown", fora);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", fora);
      document.removeEventListener("keydown", tecla);
    };
  }, [aberto]);

  return (
    <div
      ref={caixa}
      /* Sem framer de propósito: uma transição de CSS não depende do frameloop,
         por isso o botão nunca fica preso invisível. */
      className={`fixed bottom-5 right-5 z-40 transition-[opacity,transform] duration-300 ease-[cubic-bezier(.05,.7,.1,1)] md:bottom-7 md:right-7 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {aberto && (
        <ul
          role="listbox"
          aria-label="Idioma"
          className="absolute bottom-full right-0 mb-2 min-w-[150px] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b13]/95 shadow-[0_18px_50px_-12px_rgba(0,0,0,.9)] backdrop-blur-xl"
        >
          {LINGUAS.map((l) => {
            const activa = l.id === agora.id;
            return (
              <li key={l.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={activa}
                  onClick={() => {
                    i18n.changeLanguage(l.id);
                    setAberto(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[14px] transition-colors hover:bg-white/[0.05] ${
                    activa ? "text-cloud" : "text-text hover:text-text-bright"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim">{l.curto}</span>
                    {l.nome}
                  </span>
                  {activa && <Check className="h-3.5 w-3.5 text-cyan" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={aberto}
        aria-label={`Idioma: ${agora.nome}`}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[#0b0b13]/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim shadow-[0_10px_30px_-12px_rgba(0,0,0,.9)] backdrop-blur-md transition-[color,border-color,transform] duration-200 hover:scale-105 hover:border-cyan/40 hover:text-text-bright"
      >
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
        {agora.curto}
      </button>
    </div>
  );
}
