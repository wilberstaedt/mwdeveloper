import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * HERO EM TELA CHEIA (16/09/2026).
 *
 * O que a página do iPhone faz no primeiro ecrã, medido: preto total, uma
 * fonte de luz, tipo enorme e quase nada mais. Nenhuma grelha, nenhum cartão.
 * Aqui é o mesmo, com a luz feita em CSS em vez de render de estúdio, e com o
 * botão de WhatsApp que é o que esta página tem de converter.
 */

interface CinemaHeroProps {
  olho: string;
  h1: string;
  sub: string;
  cta: string;
  ctaHref: string;
  dica: string;
}

export function CinemaHero({ olho, h1, sub, cta, ctaHref, dica }: CinemaHeroProps) {
  const alvo = useRef<HTMLDivElement>(null);
  const semMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start start", "end start"] });

  /* O primeiro ecrã afunda enquanto o próximo sobe: dá profundidade sem mexer
     no conteúdo, e é barato (só transform e opacity). */
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const escala = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const conteudo = (
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1100px] flex-col justify-center px-6 pb-24 pt-28 md:pb-32">
      <motion.p
        initial={semMovimento ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-[12px] uppercase tracking-[0.22em] text-cyan md:text-[13px]"
      >
        {olho}
      </motion.p>

      <motion.h1
        initial={semMovimento ? false : { opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 max-w-[15ch] font-display text-[44px] font-bold leading-[0.95] tracking-[-0.035em] text-cloud [text-wrap:balance] sm:text-[64px] lg:text-[104px]"
      >
        {h1}
      </motion.h1>

      <motion.p
        initial={semMovimento ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 max-w-[52ch] text-[17px] leading-7 text-text md:text-[20px] md:leading-8"
      >
        {sub}
      </motion.p>

      <motion.div
        initial={semMovimento ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-wrap items-center gap-5"
      >
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-blue px-7 text-[16px] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.05,.7,.1,1)] hover:scale-[1.03] hover:bg-[#1a75ff] active:scale-[.98]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> {cta}
        </a>
        <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-dim">{dica}</span>
      </motion.div>
    </div>
  );

  if (semMovimento) return <section className="relative bg-void">{conteudo}</section>;

  return (
    <section ref={alvo} className="relative overflow-hidden bg-void">
      {/* Uma fonte de luz só, viva mas lenta. */}
      <motion.div
        aria-hidden="true"
        style={{ scale: escala }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          animate={{ opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[-30%] h-[110vh] w-[92vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,.5),rgba(0,212,255,.12),transparent)] blur-[110px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-b from-transparent to-void" />
      </motion.div>

      <motion.div style={{ y, opacity }}>{conteudo}</motion.div>
    </section>
  );
}
