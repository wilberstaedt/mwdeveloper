import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * COMO FUNCIONA (16/09/2026, refeito à noite).
 *
 * Quatro passos, sem promessa de prazo que não controlamos: o que está escrito
 * é o que ele faz de facto em cada projecto.
 *
 * Era uma tabela de quatro linhas. Agora é uma linha do tempo que se enche com
 * o scroll: o traço desce, e cada passo acende quando o traço lá chega. É o
 * mesmo gesto do "Cómo funciona" da landing de exemplo, que foi o que o Matheus
 * mais gostou — aqui em vertical e no escuro.
 *
 * Tudo preso ao scroll e nada a tempo: se o frameloop não correr, os passos
 * ficam acesos em vez de ficarem invisíveis.
 */

export interface ProcessoTexto {
  olho: string;
  titulo: string;
  passos: { n: string; titulo: string; texto: string }[];
}

function Passo({
  passo,
  i,
  total,
  progresso,
  semMovimento,
}: {
  passo: { n: string; titulo: string; texto: string };
  i: number;
  total: number;
  progresso: MotionValue<number>;
  semMovimento: boolean;
}) {
  /* O traço desce de 0 a 1 ao longo da lista; cada passo acende quando passa. */
  const marca = (i + 0.35) / total;
  const opacity = useTransform(progresso, [marca - 0.16, marca], [0.3, 1]);
  const x = useTransform(progresso, [marca - 0.16, marca], [14, 0]);
  const ponto = useTransform(progresso, [marca - 0.12, marca], [0.45, 1]);
  const brilho = useTransform(progresso, [marca - 0.12, marca], [0, 1]);
  const sombra = useTransform(brilho, (v) => `0 0 ${v * 22}px ${v * 3}px rgba(0,212,255,${v * 0.5})`);
  const corPonto = useTransform(brilho, (v) => (v > 0.5 ? "#00d4ff" : "#2a2a3a"));

  const parado = semMovimento;

  return (
    <motion.li
      style={parado ? undefined : { opacity, x }}
      className="relative grid gap-3 pb-12 pl-12 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-10 md:pb-16 md:pl-20"
    >
      {/* O ponto na linha */}
      <motion.span
        aria-hidden="true"
        style={parado ? undefined : { scale: ponto, backgroundColor: corPonto, boxShadow: sombra }}
        className="absolute left-[13px] top-[9px] h-[11px] w-[11px] rounded-full ring-4 ring-void md:left-[21px] md:h-[13px] md:w-[13px]"
      />

      <div>
        <span className="font-mono text-[12px] tracking-[0.2em] text-cyan/80">{passo.n}</span>
        <h3 className="mt-2 font-display text-[24px] font-bold leading-tight text-cloud md:text-[32px]">
          {passo.titulo}
        </h3>
      </div>
      <p className="max-w-[46ch] text-[15px] leading-7 text-text md:pt-8 md:text-[16px]">{passo.texto}</p>
    </motion.li>
  );
}

export function Processo({ texto }: { texto: ProcessoTexto }) {
  const lista = useRef<HTMLOListElement>(null);
  const semMovimento = !!useReducedMotion();
  /* Começa a contar quando a lista chega a 80% do ecrã e acaba quando o fim
     dela passa os 60%: assim o traço enche-se enquanto se lê, não antes. */
  const { scrollYProgress } = useScroll({ target: lista, offset: ["start 0.8", "end 0.6"] });
  const altura = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden border-t border-border bg-void px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12%] top-1/3 h-[55vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,212,255,.12),transparent)] blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1100px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan md:text-[13px]">{texto.olho}</p>
        <h2 className="mt-4 max-w-[16ch] font-display text-[38px] font-bold leading-[1] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[68px]">
          {texto.titulo}
        </h2>

        <ol ref={lista} className="relative mt-16 md:mt-20">
          {/* O carril, e o traço que o preenche. */}
          <span aria-hidden="true" className="absolute bottom-2 left-[18px] top-2 w-px bg-white/10 md:left-[27px]" />
          <motion.span
            aria-hidden="true"
            style={{ height: semMovimento ? "100%" : altura }}
            className="absolute left-[18px] top-2 w-px origin-top bg-gradient-to-b from-cyan via-blue to-blue/20 md:left-[27px]"
          />

          {texto.passos.map((p, i) => (
            <Passo
              key={p.n}
              passo={p}
              i={i}
              total={texto.passos.length}
              progresso={scrollYProgress}
              semMovimento={semMovimento}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
