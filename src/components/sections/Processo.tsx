import { motion } from "framer-motion";

/**
 * COMO FUNCIONA (16/09/2026). Quatro passos, sem promessa de prazo que não
 * controlamos: o que está escrito é o que ele faz de facto em cada projecto.
 */

export interface ProcessoTexto {
  olho: string;
  titulo: string;
  passos: { n: string; titulo: string; texto: string }[];
}

export function Processo({ texto }: { texto: ProcessoTexto }) {
  return (
    <section className="relative border-t border-border bg-void px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan md:text-[13px]">{texto.olho}</p>
        <h2 className="mt-4 max-w-[16ch] font-display text-[38px] font-bold leading-[1] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[68px]">
          {texto.titulo}
        </h2>

        <ol className="mt-14 space-y-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
          {texto.passos.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-4 bg-void p-7 md:grid-cols-[84px_minmax(0,1fr)_minmax(0,1.3fr)] md:items-baseline md:p-9"
            >
              <span className="font-mono text-[13px] tracking-[0.18em] text-cyan">{p.n}</span>
              <h3 className="font-display text-[22px] font-bold leading-tight text-cloud md:text-[26px]">{p.titulo}</h3>
              <p className="text-[15px] leading-7 text-text">{p.texto}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
