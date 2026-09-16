import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";

/**
 * A MARCA (16/09/2026).
 *
 * O monograma é um W em cima de um M, ligados por duas barras. Usa a versão em
 * TRAÇO e não a cheia que o Matheus escolheu: medido a 16/09, a cheia a 30 px
 * fecha as reentrâncias e vira mancha. É o sistema normal de uma marca — o
 * desenho cheio para tamanhos grandes (a imagem de partilha, o avatar), o traço
 * para a interface e o ícone. As duas são o mesmo monograma.
 */
export function MarcaMW({ para = "/", className = "" }: { para?: string; className?: string }) {
  return (
    <Link
      to={para}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="MW Dev"
    >
      <Logo size={30} className="h-[26px] w-[26px] shrink-0 transition-transform duration-300 ease-[cubic-bezier(.05,.7,.1,1)] group-hover:scale-110 md:h-[30px] md:w-[30px]" />
      <span className="font-mono text-[13px] font-semibold tracking-[0.14em] text-text-bright">MW DEV</span>
    </Link>
  );
}
