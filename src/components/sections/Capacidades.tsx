import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * O QUE EU CONSTRUO (16/09/2026, refeito à noite).
 *
 * Nasce de uma correcção do Matheus: a página parecia vender um sistema de
 * limpeza. Esta secção abre o leque sem inventar clientes — fala do que se
 * constrói, não de quem já comprou. As provas com nome ficam na secção de
 * casos, que só tem trabalho real.
 *
 * A primeira versão era uma grelha de listas dentro de uma caixa, e parecia uma
 * ficha técnica no meio de uma página que e toda cinema. Agora o título fica
 * preso à esquerda enquanto as quatro famílias passam à direita, cada uma com a
 * sua régua a desenhar-se e os itens a acender em cascata.
 *
 * Sem ícones de propósito: mapear ícone a família pela ordem do array parte no
 * dia em que alguém trocar a ordem dos textos. O índice grande faz o mesmo
 * trabalho e não mente.
 */

export interface CapacidadesTexto {
  olho: string;
  titulo: string;
  familias: { nome: string; itens: string[] }[];
  nota: string;
}

function Familia({
  familia,
  i,
  progresso,
  semMovimento,
}: {
  familia: { nome: string; itens: string[] };
  i: number;
  progresso: MotionValue<number>;
  semMovimento: boolean;
}) {
  /* A régua do topo enche-se à medida que a família sobe pelo ecrã. */
  const inicio = 0.08 + i * 0.15;
  const regua = useTransform(progresso, [inicio, inicio + 0.16], [0, 1]);

  return (
    <motion.article
      initial={semMovimento ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,0))] p-7 transition-[border-color,transform] duration-300 ease-[cubic-bezier(.05,.7,.1,1)] hover:-translate-y-1 hover:border-cyan/30 md:p-9"
    >
      {/* A régua: começa em nada e enche com o scroll. */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: semMovimento ? 1 : regua }}
        className="absolute inset-x-7 top-0 h-px origin-left bg-gradient-to-r from-cyan via-blue to-transparent md:inset-x-9"
      />

      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[12px] tracking-[0.2em] text-cyan/70">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="font-display text-[23px] font-bold leading-tight text-cloud md:text-[28px]">{familia.nome}</h3>
      </div>

      <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {familia.itens.map((it, j) => (
          <motion.li
            key={it}
            initial={semMovimento ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.1 + j * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-3 text-[15px] leading-6 text-text"
          >
            <span
              aria-hidden="true"
              className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan transition-[box-shadow] duration-300 group-hover:shadow-[0_0_10px_2px_rgba(0,212,255,.55)]"
            />
            {it}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

export function Capacidades({ texto }: { texto: CapacidadesTexto }) {
  const alvo = useRef<HTMLElement>(null);
  const semMovimento = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start end", "end start"] });

  return (
    /* Sem overflow-hidden na secção: um antepassado com overflow escondido
       mata o position:sticky dos descendentes, e era isso que estava a
       desprender o título (16/09). A luz é que leva a sua própria caixa a
       cortar. */
    <section ref={alvo} className="relative border-t border-border bg-void px-6 py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-1/4 h-[60vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,.16),transparent)] blur-[100px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] md:gap-16">
        {/* O título fica preso enquanto as famílias passam. */}
        <div className="md:sticky md:top-24 md:self-start">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan md:text-[13px]">{texto.olho}</p>
          <h2 className="mt-4 max-w-[14ch] font-display text-[38px] font-bold leading-[1] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[60px]">
            {texto.titulo}
          </h2>
          <p className="mt-7 max-w-[42ch] text-[15px] leading-7 text-text-dim">{texto.nota}</p>
        </div>

        <div className="grid gap-5">
          {texto.familias.map((f, i) => (
            <Familia key={f.nome} familia={f} i={i} progresso={scrollYProgress} semMovimento={semMovimento} />
          ))}
        </div>
      </div>
    </section>
  );
}
