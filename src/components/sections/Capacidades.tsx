import { motion } from "framer-motion";

/**
 * O QUE EU CONSTRUO (16/09/2026).
 *
 * Nasce de uma correcção do Matheus: a página parecia vender um sistema de
 * limpeza. Esta secção abre o leque sem inventar clientes — fala do que se
 * constrói, não de quem já comprou. As provas com nome ficam na secção de
 * casos, que só tem trabalho real.
 */

export interface CapacidadesTexto {
  olho: string;
  titulo: string;
  familias: { nome: string; itens: string[] }[];
  nota: string;
}

export function Capacidades({ texto }: { texto: CapacidadesTexto }) {
  return (
    <section className="relative border-t border-border bg-void px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan md:text-[13px]">{texto.olho}</p>
        <h2 className="mt-4 max-w-[18ch] font-display text-[38px] font-bold leading-[1] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[68px]">
          {texto.titulo}
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] md:grid-cols-2">
          {texto.familias.map((f, i) => (
            <motion.div
              key={f.nome}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-void p-7 md:p-9"
            >
              <h3 className="font-display text-[22px] font-bold text-cloud md:text-[26px]">{f.nome}</h3>
              <ul className="mt-5 space-y-2.5">
                {f.itens.map((it) => (
                  <li key={it} className="flex items-baseline gap-3 text-[15px] leading-6 text-text">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 max-w-[60ch] text-[15px] leading-7 text-text-dim">{texto.nota}</p>
      </div>
    </section>
  );
}
