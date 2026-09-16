import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * FECHO (16/09/2026). O último ecrã antes do rodapé, no mesmo registo dos
 * capítulos: preto, tipo grande, uma acção só. O CV fica como linha discreta
 * porque quem chega aqui é cliente, não recrutador.
 */

export interface FechoTexto {
  olho: string;
  titulo: string;
  sub: string;
  cta: string;
}

export function Fecho({ texto, ctaHref }: { texto: FechoTexto; ctaHref: string }) {
  const alvo = useRef<HTMLDivElement>(null);
  const semMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start end", "end end"] });
  const escala = useTransform(scrollYProgress, [0, 1], semMovimento ? [1, 1] : [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], semMovimento ? [1, 1] : [0, 1]);
  const brilho = useTransform(scrollYProgress, [0, 1], [0.15, 0.55]);

  return (
    <section ref={alvo} className="relative overflow-hidden border-t border-border bg-void px-6 py-32 md:py-44">
      <motion.div
        aria-hidden="true"
        style={{ opacity: brilho }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,.45),transparent)] blur-[100px]"
      />
      <motion.div style={{ scale: escala, opacity }} className="relative z-10 mx-auto max-w-[900px] text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan md:text-[13px]">{texto.olho}</p>
        <h2 className="mx-auto mt-5 max-w-[14ch] font-display text-[44px] font-bold leading-[0.95] tracking-[-0.035em] text-cloud [text-wrap:balance] md:text-[92px]">
          {texto.titulo}
        </h2>
        <p className="mx-auto mt-7 max-w-[46ch] text-[17px] leading-7 text-text md:text-[19px]">{texto.sub}</p>
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-blue px-8 text-[16px] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.05,.7,.1,1)] hover:scale-[1.03] hover:bg-[#1a75ff] active:scale-[.98]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> {texto.cta}
        </a>
      </motion.div>
    </section>
  );
}
