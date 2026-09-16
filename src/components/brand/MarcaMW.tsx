import { Link } from "react-router-dom";

/**
 * A MARCA (16/09/2026).
 *
 * O monograma é um W em cima de um M, ligados por duas barras — o mesmo
 * desenho do favicon, mas na versão cheia com o ziguezague. Vem de uma imagem
 * porque foi assim que o Matheus a escolheu; o favicon é a versão em traço,
 * que é a que aguenta 16 px.
 *
 * `eager` de propósito: está no primeiro ecrã e é pequena (68 KB).
 */
export function MarcaMW({ para = "/", className = "" }: { para?: string; className?: string }) {
  return (
    <Link
      to={para}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="MW Dev"
    >
      <img
        src="/brand/mw-mark.png"
        alt=""
        width={30}
        height={30}
        loading="eager"
        decoding="async"
        className="h-[26px] w-[26px] shrink-0 transition-transform duration-300 ease-[cubic-bezier(.05,.7,.1,1)] group-hover:scale-110 md:h-[30px] md:w-[30px]"
      />
      <span className="font-mono text-[13px] font-semibold tracking-[0.14em] text-text-bright">MW DEV</span>
    </Link>
  );
}
