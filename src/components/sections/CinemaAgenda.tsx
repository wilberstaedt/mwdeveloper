import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * CAPÍTULO EM TELA CHEIA: A SEMANA QUE SE ENCHE (16/09/2026).
 *
 * Segundo capítulo do registo novo. A grelha da semana preenche-se ao ritmo do
 * scroll e o contador de horas sobe com ela. Os blocos são os de uma semana
 * real de operação (serviços de 1h30 a 3h, duas pessoas por serviço), não
 * números inventados para ficar bonito.
 */

export interface CinemaAgendaTexto {
  olho: string;
  titulo: string;
  legenda: string;
  dias: string[];
  rotuloHoras: string;
  rotuloServicos: string;
}

interface Bloco {
  dia: number;
  inicio: number; // linha na grelha (0 = primeira faixa da manhã)
  duracao: number; // em faixas de meia hora
  cor: string;
}

/* Uma semana real: cheia de manhã, mais leve à sexta, nada ao fim de semana. */
const BLOCOS: Bloco[] = [
  { dia: 0, inicio: 0, duracao: 3, cor: "from-blue/80 to-blue/40" },
  { dia: 0, inicio: 4, duracao: 4, cor: "from-cyan/70 to-cyan/30" },
  { dia: 1, inicio: 1, duracao: 3, cor: "from-cyan/70 to-cyan/30" },
  { dia: 1, inicio: 5, duracao: 3, cor: "from-blue/80 to-blue/40" },
  { dia: 2, inicio: 0, duracao: 4, cor: "from-blue/80 to-blue/40" },
  { dia: 2, inicio: 5, duracao: 2, cor: "from-cyan/70 to-cyan/30" },
  { dia: 3, inicio: 2, duracao: 3, cor: "from-cyan/70 to-cyan/30" },
  { dia: 3, inicio: 6, duracao: 3, cor: "from-blue/80 to-blue/40" },
  { dia: 4, inicio: 1, duracao: 4, cor: "from-blue/80 to-blue/40" },
  { dia: 5, inicio: 3, duracao: 2, cor: "from-cyan/70 to-cyan/30" },
];

const FAIXAS = 10;

function BlocoAgenda({ progresso, bloco, ordem, total }: { progresso: MotionValue<number>; bloco: Bloco; ordem: number; total: number }) {
  const inicio = 0.18 + (ordem / total) * 0.5;
  const opacity = useTransform(progresso, [inicio, inicio + 0.05], [0, 1]);
  const scaleY = useTransform(progresso, [inicio, inicio + 0.06], [0.2, 1]);
  return (
    <motion.div
      style={{
        opacity,
        scaleY,
        gridColumn: bloco.dia + 1,
        gridRow: `${bloco.inicio + 1} / span ${bloco.duracao}`,
        originY: 0,
      }}
      className={`rounded-lg bg-gradient-to-b ${bloco.cor} shadow-[0_8px_30px_-10px_rgba(0,102,255,.6)]`}
    />
  );
}

export function CinemaAgenda({ texto }: { texto: CinemaAgendaTexto }) {
  const alvo = useRef<HTMLDivElement>(null);
  const semMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start start", "end end"] });

  const horas = BLOCOS.reduce((a, b) => a + b.duracao * 0.5, 0) * 2; // duas pessoas por serviço
  const servicos = BLOCOS.length;

  const tituloOpacity = useTransform(scrollYProgress, [0, 0.08, 0.88, 0.97], [0, 1, 1, 0]);
  const tituloY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);
  const grelhaOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.92, 0.99], [0, 1, 1, 0.25]);
  const horasVal = useTransform(scrollYProgress, [0.2, 0.72], [0, horas]);
  const horasTexto = useTransform(horasVal, (v) => `${Math.round(v)} h`);
  const servicosVal = useTransform(scrollYProgress, [0.2, 0.72], [0, servicos]);
  const servicosTexto = useTransform(servicosVal, (v) => String(Math.round(v)));
  const legendaOpacity = useTransform(scrollYProgress, [0.74, 0.82], [0, 1]);

  const grelha = (animada: boolean) => (
    <div className="w-full max-w-[880px]">
      <div className="grid grid-cols-6 gap-2 pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-dim md:text-[12px]">
        {texto.dias.map((d) => (
          <span key={d} className="text-center">{d}</span>
        ))}
      </div>
      <div
        className="grid gap-2 rounded-2xl border border-white/10 bg-[#0b0b13]/80 p-3 md:p-4"
        style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gridTemplateRows: `repeat(${FAIXAS}, 26px)` }}
      >
        {BLOCOS.map((b, i) =>
          animada ? (
            <BlocoAgenda key={i} progresso={scrollYProgress} bloco={b} ordem={i} total={BLOCOS.length} />
          ) : (
            <div
              key={i}
              style={{ gridColumn: b.dia + 1, gridRow: `${b.inicio + 1} / span ${b.duracao}` }}
              className={`rounded-lg bg-gradient-to-b ${b.cor}`}
            />
          ),
        )}
      </div>
    </div>
  );

  if (semMovimento) {
    return (
      <section className="bg-void px-6 py-24">
        <div className="mx-auto flex max-w-[880px] flex-col items-center">
          <p className="self-start font-mono text-[13px] uppercase tracking-[0.16em] text-cyan">{texto.olho}</p>
          <h2 className="mt-4 self-start font-display text-[36px] font-bold leading-[1.05] tracking-tight text-cloud">{texto.titulo}</h2>
          <div className="mt-10 w-full">{grelha(false)}</div>
          <p className="mt-8 self-start text-[15px] leading-6 text-text-dim">{texto.legenda}</p>
        </div>
      </section>
    );
  }

  return (
    <div ref={alvo} className="relative h-[300vh] bg-void">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <motion.div style={{ opacity: tituloOpacity, y: tituloY }} className="relative z-10 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan md:text-[13px]">{texto.olho}</p>
          <h2 className="mx-auto mt-4 max-w-[14ch] font-display text-[44px] font-bold leading-[0.98] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[92px]">
            {texto.titulo}
          </h2>
        </motion.div>

        <motion.div style={{ opacity: grelhaOpacity }} className="relative z-10 mt-10 flex w-full flex-col items-center md:mt-14">
          {grelha(true)}
          <div className="mt-8 flex items-end gap-12">
            <div className="text-center">
              <motion.p className="font-display text-[34px] font-bold tabular-nums text-cloud md:text-[52px]">{horasTexto}</motion.p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim md:text-[12px]">{texto.rotuloHoras}</p>
            </div>
            <div className="text-center">
              <motion.p className="font-display text-[34px] font-bold tabular-nums text-cloud md:text-[52px]">{servicosTexto}</motion.p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim md:text-[12px]">{texto.rotuloServicos}</p>
            </div>
          </div>
        </motion.div>

        <motion.p style={{ opacity: legendaOpacity }} className="relative z-10 mt-8 max-w-lg text-center text-[14px] leading-6 text-text-dim md:text-[15px]">
          {texto.legenda}
        </motion.p>
      </div>
    </div>
  );
}
