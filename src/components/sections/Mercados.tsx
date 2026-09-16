import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * ONDE TRABALHO (16/09/2026, refeito à noite).
 *
 * Eram três cartões pequenos e iguais a tudo o resto. Passam a três portas
 * grandes, com o nome do país em display e uma régua que se desenha por cima.
 * O que muda é a hierarquia: o país é a coisa que o visitante procura aqui.
 */

export interface MercadoItem {
  id: string;
  nome: string;
  texto: string;
  cta: string;
  rota?: string;
  wa?: string;
}

export function Mercados({
  titulo,
  itens,
  href,
}: {
  titulo: string;
  itens: MercadoItem[];
  href: (wa: string) => string;
}) {
  const semMovimento = useReducedMotion();

  return (
    <section className="relative border-t border-border bg-void px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <motion.h2
          initial={semMovimento ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[18ch] font-display text-[34px] font-bold leading-[1.02] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[52px]"
        >
          {titulo}
        </motion.h2>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {itens.map((m, i) => {
            const classe =
              "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,0))] p-7 transition-[border-color,transform] duration-300 ease-[cubic-bezier(.05,.7,.1,1)] hover:-translate-y-1.5 hover:border-cyan/30 md:p-8";
            const corpo = (
              <>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan via-blue to-transparent transition-transform duration-500 ease-[cubic-bezier(.05,.7,.1,1)] group-hover:scale-x-100"
                />
                <h3 className="font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-cloud md:text-[32px]">
                  {m.nome}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-6 text-text">{m.texto}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-cyan">
                  {m.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.05,.7,.1,1)] group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </span>
              </>
            );
            const envolve = (
              <motion.div
                key={m.id}
                initial={semMovimento ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                {m.rota ? (
                  <Link to={m.rota} className={classe}>
                    {corpo}
                  </Link>
                ) : (
                  <a href={href(m.wa!)} target="_blank" rel="noopener noreferrer" className={classe}>
                    {corpo}
                  </a>
                )}
              </motion.div>
            );
            return envolve;
          })}
        </div>
      </div>
    </section>
  );
}
