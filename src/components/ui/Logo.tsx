import { useId } from "react";

interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

/**
 * A MARCA EM TRAÇO (16/09/2026).
 *
 * É o mesmo desenho do favicon e do monograma escolhido: um W em cima, um M em
 * baixo, presos por duas barras. Antes tinha ainda uma barra ao centro e um
 * losango à volta, e por isso o CV e a home mostravam marcas diferentes —
 * agora é uma só.
 *
 * O gradiente leva id único: duas instâncias na mesma página com o mesmo id
 * fazem a segunda herdar o gradiente da primeira.
 */
export function Logo({ size = 160, animated = false, className }: LogoProps) {
  const id = useId();
  /* A 32 px, tracos de 16 no viewBox de 160 fecham as reentrancias e o
     monograma vira uma mancha arredondada. Quanto menor, mais fino. */
  const strokeWidth = size > 80 ? 13 : size > 40 ? 12 : 11;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MW Dev"
      role="img"
    >
      <defs>
        <linearGradient id={id} x1="32" y1="32" x2="128" y2="128" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
      <g
        stroke={`url(#${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animated ? "logo-axis" : undefined}
      >
        <path d="M32 58 L56 32 L80 58 L104 32 L128 58" />
        <path d="M32 102 L56 128 L80 102 L104 128 L128 102" />
        <path d="M32 58 L32 102" />
        <path d="M128 58 L128 102" />
      </g>
    </svg>
  );
}
