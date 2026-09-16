import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * TRABALHO EM PRODUÇÃO (16/09/2026, refeito à noite).
 *
 * Eram duas miniaturas lado a lado com um parágrafo por baixo. Passam a duas
 * peças grandes e alternadas, com a captura a correr devagar dentro da moldura
 * enquanto se rola. É a única secção da página onde há clientes a sério, por
 * isso é a que devia ter mais presença — e tinha menos.
 *
 * Os textos não mudam: continuam a dizer só o que é verdade, e não há link
 * para os sites dos clientes de propósito, porque aqui eles estão sem nome.
 */

export interface CasosTexto {
  provaTitulo: string;
  casos: { etiqueta: string; titulo: string; texto: string; alt: string }[];
}

function Caso({ caso, src, i }: { caso: CasosTexto["casos"][number]; src: string; i: number }) {
  const alvo = useRef<HTMLElement>(null);
  const semMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start end", "end start"] });
  /* A captura é mais alta do que a moldura e desliza: mostra a página inteira
     sem cortar nada e dá vida a uma imagem parada. */
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const inverso = i % 2 === 1;

  return (
    <motion.article
      ref={alvo}
      initial={semMovimento ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group grid items-center gap-8 md:gap-14 ${
        inverso ? "md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]" : "md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
      }`}
    >
      <div className={`${inverso ? "md:order-2" : ""}`}>
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_50px_120px_-50px_rgba(0,102,255,.5)] transition-[border-color] duration-300 group-hover:border-cyan/30">
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
              src={src}
              alt={caso.alt}
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              style={{ y: semMovimento ? 0 : y }}
              className="absolute inset-x-0 top-0 block h-[124%] w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(.05,.7,.1,1)] group-hover:scale-[1.03]"
            />
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.08)_0%,transparent_34%)]"
          />
        </div>
      </div>

      <div className={`${inverso ? "md:order-1" : ""}`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan md:text-[12px]">{caso.etiqueta}</p>
        <h3 className="mt-3 font-display text-[28px] font-bold leading-[1.05] tracking-[-0.025em] text-cloud md:text-[40px]">
          {caso.titulo}
        </h3>
        <p className="mt-4 max-w-[44ch] text-[16px] leading-7 text-text md:text-[17px]">{caso.texto}</p>
      </div>
    </motion.article>
  );
}

const IMAGENS = ["/lp/samba-site-1200.webp", "/lp/cleaning-dashboard-1200.webp"] as const;

export function Casos({ texto }: { texto: CasosTexto }) {
  const semMovimento = useReducedMotion();
  return (
    <section className="relative overflow-hidden border-t border-border bg-void px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6%] top-0 h-[50vh] w-[45vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,.14),transparent)] blur-[110px]"
      />
      <div className="relative mx-auto max-w-[1180px]">
        <motion.h2
          initial={semMovimento ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[16ch] font-display text-[38px] font-bold leading-[1] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[68px]"
        >
          {texto.provaTitulo}
        </motion.h2>

        <div className="mt-16 grid gap-16 md:mt-20 md:gap-24">
          {texto.casos.map((c, i) => (
            <Caso key={c.titulo} caso={c} src={IMAGENS[i] ?? IMAGENS[0]} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
