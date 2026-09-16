import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * CAPÍTULO EM TELA CHEIA: A FATURA QUE SE MONTA SOZINHA (16/09/2026).
 *
 * Medido na página do iPhone 18 Pro a 16/09: 54.795 px de altura, 14 vídeos,
 * 8 secções fixas, zero canvas. Ou seja, a técnica é a mesma que já usamos; o
 * que muda é o que se MEXE dentro do ecrã, e a escala do tipo.
 *
 * Aqui não há vídeo de estúdio, e não é preciso: o produto é software. As
 * linhas da fatura entram uma a uma, o total sobe, o imposto aparece e o
 * carimbo cai, tudo preso ao scroll. É o produto real a funcionar, não uma
 * fotografia dele.
 *
 * Quem tem "reduzir movimento" ligado vê a fatura completa, parada.
 */

interface Linha {
  descricao: string;
  horas: string;
  valor: number;
}

export interface CinemaFaturaTexto {
  olho: string;
  titulo: string;
  legenda: string;
  linhas: Linha[];
  rotuloSubtotal: string;
  rotuloImposto: string;
  rotuloTotal: string;
  carimbo: string;
}

const moeda = (v: number) =>
  `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function LinhaFatura({
  progresso,
  inicio,
  linha,
}: {
  progresso: MotionValue<number>;
  inicio: number;
  linha: Linha;
}) {
  const opacity = useTransform(progresso, [inicio, inicio + 0.05], [0, 1]);
  const y = useTransform(progresso, [inicio, inicio + 0.05], [18, 0]);
  return (
    <motion.li
      style={{ opacity, y }}
      className="flex items-baseline justify-between gap-6 border-b border-white/5 py-4 text-[15px] md:text-[17px]"
    >
      <span className="text-text-bright">{linha.descricao}</span>
      <span className="ml-auto shrink-0 font-mono text-[13px] text-text-dim md:text-[15px]">{linha.horas}</span>
      <span className="w-24 shrink-0 text-right font-mono tabular-nums text-text-bright md:w-28">{moeda(linha.valor)}</span>
    </motion.li>
  );
}

export function CinemaFatura({ texto }: { texto: CinemaFaturaTexto }) {
  const alvo = useRef<HTMLDivElement>(null);
  const semMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start start", "end end"] });

  const subtotal = texto.linhas.reduce((a, l) => a + l.valor, 0);
  const imposto = Math.round(subtotal * 10) / 100;
  const total = subtotal + imposto;

  /* Coreografia: 0-0.12 título, 0.12-0.55 linhas, 0.55-0.72 somas, 0.72+ carimbo. */
  const tituloOpacity = useTransform(scrollYProgress, [0, 0.08, 0.86, 0.96], [0, 1, 1, 0]);
  const tituloY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);
  const papelScale = useTransform(scrollYProgress, [0, 0.12], [0.94, 1]);
  const papelOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 0.99], [0, 1, 1, 0.2]);
  const somasOpacity = useTransform(scrollYProgress, [0.55, 0.64], [0, 1]);
  const totalContado = useTransform(scrollYProgress, [0.58, 0.72], [0, total]);
  const totalTexto = useTransform(totalContado, (v) => moeda(v));
  const carimboOpacity = useTransform(scrollYProgress, [0.78, 0.84], [0, 1]);
  const carimboScale = useTransform(scrollYProgress, [0.78, 0.84, 0.88], [1.6, 0.96, 1]);
  const carimboRotate = useTransform(scrollYProgress, [0.78, 0.88], [-12, -6]);
  const brilho = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.25, 0.55, 0.3]);

  if (semMovimento) {
    return (
      <section className="bg-void px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-cyan">{texto.olho}</p>
          <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.05] tracking-tight text-cloud">{texto.titulo}</h2>
          <ul className="mt-10">
            {texto.linhas.map((l) => (
              <li key={l.descricao} className="flex items-baseline justify-between gap-6 border-b border-white/5 py-4">
                <span className="text-text-bright">{l.descricao}</span>
                <span className="font-mono text-[13px] text-text-dim">{l.horas}</span>
                <span className="w-24 text-right font-mono tabular-nums text-text-bright">{moeda(l.valor)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-right font-mono text-[22px] text-cloud">{moeda(total)}</p>
          <p className="mt-6 text-[15px] text-text-dim">{texto.legenda}</p>
        </div>
      </section>
    );
  }

  return (
    <div ref={alvo} className="relative h-[320vh] bg-void">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        {/* Luz de fundo, como o feixe da Apple: uma fonte só, suave. */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: brilho }}
          className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,.55),transparent)] blur-[90px]"
        />

        <motion.div style={{ opacity: tituloOpacity, y: tituloY }} className="relative z-10 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan md:text-[13px]">{texto.olho}</p>
          <h2 className="mx-auto mt-4 max-w-[16ch] font-display text-[44px] font-bold leading-[0.98] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[92px]">
            {texto.titulo}
          </h2>
        </motion.div>

        <motion.div
          style={{ scale: papelScale, opacity: papelOpacity }}
          className="relative z-10 mt-10 w-full max-w-[720px] rounded-2xl border border-white/10 bg-[#0b0b13]/90 p-6 shadow-[0_40px_120px_-30px_rgba(0,102,255,.35)] backdrop-blur md:mt-14 md:p-10"
        >
          <ul>
            {texto.linhas.map((l, i) => (
              <LinhaFatura key={l.descricao} progresso={scrollYProgress} inicio={0.14 + i * 0.1} linha={l} />
            ))}
          </ul>

          <motion.div style={{ opacity: somasOpacity }} className="mt-6 space-y-2 font-mono text-[14px] md:text-[15px]">
            <p className="flex justify-between text-text-dim">
              <span>{texto.rotuloSubtotal}</span>
              <span className="tabular-nums">{moeda(subtotal)}</span>
            </p>
            <p className="flex justify-between text-text-dim">
              <span>{texto.rotuloImposto}</span>
              <span className="tabular-nums">{moeda(imposto)}</span>
            </p>
          </motion.div>

          <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6">
            <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-text-dim">{texto.rotuloTotal}</span>
            <motion.span className="font-display text-[34px] font-bold tabular-nums text-cloud md:text-[52px]">
              {totalTexto}
            </motion.span>
          </div>

          <motion.span
            style={{ opacity: carimboOpacity, scale: carimboScale, rotate: carimboRotate }}
            /* No canto de cima: em baixo, o carimbo caia por cima do total (16/09). */
            className="pointer-events-none absolute -top-4 right-6 rounded-lg border-2 border-success bg-void/70 px-4 py-2 font-mono text-[14px] font-bold uppercase tracking-[0.18em] text-success backdrop-blur md:-top-5 md:right-10 md:text-[18px]"
          >
            {texto.carimbo}
          </motion.span>
        </motion.div>

        <motion.p style={{ opacity: somasOpacity }} className="relative z-10 mt-8 max-w-md text-center text-[14px] leading-6 text-text-dim md:text-[15px]">
          {texto.legenda}
        </motion.p>
      </div>
    </div>
  );
}
