import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * HERO EM TELA CHEIA (16/09/2026, refeito à noite).
 *
 * A primeira versão era tipo grande sobre preto e mais nada, e o Matheus disse
 * o óbvio: era o único momento parado de uma página que a seguir é toda cinema.
 *
 * Agora é uma mesa de trabalho no escuro. Atrás do texto, em quatro planos de
 * profundidade diferentes, estão ECRÃS REAIS — o site da mudança, a agenda, as
 * faturas, a landing de exemplo — muito escurecidos e desfocados, com uma fonte
 * de luz só. Derivam com o rato e com o scroll a velocidades diferentes, o que
 * dá a profundidade; uma vinheta por cima garante que o texto ganha sempre.
 *
 * O título entra linha a linha por trás de uma máscara. É a única animação por
 * tempo desta página, e pode ser: isto é o topo, não vive dentro de um iframe.
 *
 * Nada aqui inventa nada. Os ecrãs são de sistemas que existem e a linha de
 * prova repete o que o site já afirma noutras páginas.
 */

interface CinemaHeroProps {
  olho: string;
  h1: string;
  linhas: string[];
  sub: string;
  cta: string;
  ctaHref: string;
  dica: string;
  prova: string;
}

/* Cada plano: imagem, sítio, profundidade (quanto reage) e quanto se vê. */
const PLANOS = [
  { src: "/lp/samba-site-1200.webp", caixa: "left-[-12%] top-[4%] w-[36vw] rotate-[-8deg]", z: 24, op: 0.26, desfoque: 2 },
  { src: "/work/cleaning-schedule-1000.webp", caixa: "right-[-10%] top-[0%] w-[34vw] rotate-[7deg]", z: 40, op: 0.22, desfoque: 2.5 },
  { src: "/work/cleaning-invoices-1000.webp", caixa: "right-[4%] bottom-[-14%] w-[26vw] rotate-[-5deg]", z: 58, op: 0.17, desfoque: 3 },
  { src: "/work/demo-limpieza-desktop.webp", caixa: "left-[2%] bottom-[-20%] w-[24vw] rotate-[6deg]", z: 76, op: 0.14, desfoque: 3.5 },
];

function Plano({
  plano,
  ratoX,
  ratoY,
  desceY,
}: {
  plano: (typeof PLANOS)[number];
  ratoX: MotionValue<number>;
  ratoY: MotionValue<number>;
  desceY: MotionValue<string>;
}) {
  /* Quanto mais à frente o plano, mais se desloca: é isso que faz a profundidade. */
  const x = useTransform(ratoX, (v) => v * plano.z);
  const y = useTransform(ratoY, (v) => v * plano.z);
  return (
    <motion.div style={{ x, y }} className={`absolute ${plano.caixa}`}>
      <motion.div style={{ y: desceY }}>
        <img
          src={plano.src}
          alt=""
          loading="eager"
          decoding="async"
          style={{ opacity: plano.op, filter: `blur(${plano.desfoque}px) grayscale(45%)` }}
          className="block w-full rounded-lg border border-cyan/15 md:rounded-xl"
        />
      </motion.div>
    </motion.div>
  );
}

/* A entrada vai em CSS e não em JavaScript, de propósito. Medido a 16/09: se o
   frameloop não correr no momento da montagem (separador aberto em segundo
   plano, que é o que acontece quando alguém abre o link num separador novo), a
   animação do framer fica presa em opacity 0 e o texto NUNCA aparece. Com
   keyframes e fill-mode both o estado final está garantido, e quem tem
   "reduzir movimento" não tem animação nenhuma — logo vê tudo. Numa página que
   vai receber tráfego pago, o texto não pode depender de JavaScript para
   existir. */
function Linha({ texto, i }: { texto: string; i: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span className="linha block" style={{ animationDelay: `${0.12 + i * 0.11}s` }}>
        {texto}
      </span>
    </span>
  );
}

export function CinemaHero({ olho, h1, linhas, sub, cta, ctaHref, dica, prova }: CinemaHeroProps) {
  const alvo = useRef<HTMLElement>(null);
  const semMovimento = useReducedMotion();
  const [comRato, setComRato] = useState(false);
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start start", "end start"] });

  /* Só em quem tem rato: num telemóvel não há paralaxe de rato, e o hover de
     toque só dispara uma vez e fica preso. */
  useEffect(() => {
    if (semMovimento) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const ver = () => setComRato(mq.matches);
    ver();
    mq.addEventListener("change", ver);
    return () => mq.removeEventListener("change", ver);
  }, [semMovimento]);

  const cruX = useMotionValue(0);
  const cruY = useMotionValue(0);
  const ratoX = useSpring(cruX, { stiffness: 60, damping: 20, mass: 0.6 });
  const ratoY = useSpring(cruY, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!comRato) return;
    const mexer = (e: PointerEvent) => {
      cruX.set((e.clientX / window.innerWidth - 0.5) * 2);
      cruY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", mexer, { passive: true });
    return () => window.removeEventListener("pointermove", mexer);
  }, [comRato, cruX, cruY]);

  /* O primeiro ecrã afunda enquanto o próximo sobe. */
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const escala = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  /* Os planos de trás sobem mais devagar do que o texto: paralaxe de scroll. */
  const planosY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const planosOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const conteudo = (
    <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1100px] flex-col justify-center px-6 pb-24 pt-28 md:pb-32">
      <p className="entra font-mono text-[12px] uppercase tracking-[0.22em] text-cyan md:text-[13px]">{olho}</p>

      {/* O texto completo fica no aria-label: o que se lê em voz alta é a frase
          inteira, não três pedaços. */}
      <h1
        aria-label={h1}
        /* Cada linha é uma linha: a partir do md não parte, e o tamanho está
           preso ao viewport para nunca transbordar o contentor de 1100 px. */
        className="mt-6 font-display text-[clamp(34px,7.6vw,44px)] font-bold leading-[0.98] tracking-[-0.035em] text-cloud md:whitespace-nowrap md:text-[clamp(38px,5.4vw,74px)]"
      >
        {linhas.map((l, i) => (
          <Linha key={l} texto={l} i={i} />
        ))}
      </h1>

      <p
        className="entra mt-8 max-w-[52ch] text-[17px] leading-7 text-text md:text-[20px] md:leading-8"
        style={{ animationDelay: "0.5s" }}
      >
        {sub}
      </p>

      <div className="entra mt-10 flex flex-wrap items-center gap-x-5 gap-y-4" style={{ animationDelay: "0.62s" }}>
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex min-h-13 items-center justify-center gap-2 overflow-hidden rounded-full bg-blue px-7 text-[16px] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.05,.7,.1,1)] hover:scale-[1.03] hover:bg-[#1a75ff] active:scale-[.98]"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            <MessageCircle className="h-5 w-5" aria-hidden="true" /> {cta}
          </span>
          {/* Um brilho que atravessa o botão de tempos a tempos. Em CSS. */}
          <span aria-hidden="true" className="varre pointer-events-none absolute inset-0" />
        </a>
        <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-dim">{dica}</span>
      </div>

      <p
        className="entra mt-9 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text md:text-[12px]"
        style={{ animationDelay: "0.8s" }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
        {prova}
      </p>
    </div>
  );

  if (semMovimento) {
    return (
      <section className="relative bg-void">
        <style>{CSS}</style>
        {conteudo}
      </section>
    );
  }

  return (
    <section ref={alvo} className="relative overflow-hidden bg-void">
      <style>{CSS}</style>

      {/* OS ECRÃS, ATRÁS. */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: planosOpacity }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        {PLANOS.map((p) => (
          <Plano key={p.src} plano={p} ratoX={ratoX} ratoY={ratoY} desceY={planosY} />
        ))}
      </motion.div>

      {/* A VINHETA, por cima dos ecrãs: devolve o preto ao centro e garante que
         o texto ganha sempre, seja qual for a captura que está por trás. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_34%_50%,rgba(6,6,12,.97)_0%,rgba(6,6,12,.88)_34%,rgba(6,6,12,.6)_70%,rgba(6,6,12,.72)_100%)]"
      />

      {/* A LUZ, por cima da vinheta e em modo screen, para somar em vez de tapar. */}
      <motion.div
        aria-hidden="true"
        style={{ scale: escala }}
        className="pointer-events-none absolute inset-0 z-10 mix-blend-screen"
      >
        <div className="respira absolute left-[62%] top-[-34%] h-[120vh] w-[88vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,.72),rgba(0,212,255,.2),transparent)] blur-[110px]" />
        <div className="respira-lenta absolute bottom-[-32%] left-[4%] h-[70vh] w-[52vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,212,255,.26),transparent)] blur-[120px]" />
      </motion.div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[42vh] bg-gradient-to-b from-transparent to-void" />

      <motion.div style={{ y, opacity }} className="relative z-20">
        {conteudo}
      </motion.div>
    </section>
  );
}

/* Keyframes em CSS e não em JavaScript: correm no compositor e não dependem do
   frameloop, por isso não param quando o separador perde o foco. */
const CSS = `
@keyframes mw-respira { 0%,100% { opacity:.45; transform:translateX(-50%) scale(1) } 50% { opacity:.72; transform:translateX(-50%) scale(1.06) } }
@keyframes mw-respira-b { 0%,100% { opacity:.4; transform:scale(1) } 50% { opacity:.7; transform:scale(1.1) } }
@keyframes mw-varre { 0% { transform:translateX(-140%) } 60%,100% { transform:translateX(240%) } }
@keyframes mw-entra { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:none } }
@keyframes mw-linha { from { transform:translateY(115%) } to { transform:none } }
.entra { animation: mw-entra .9s cubic-bezier(.16,1,.3,1) both }
.linha { animation: mw-linha 1s cubic-bezier(.16,1,.3,1) both }
.respira { animation: mw-respira 11s ease-in-out infinite }
.respira-lenta { animation: mw-respira-b 15s ease-in-out infinite reverse }
.varre::after {
  content:""; position:absolute; inset:0;
  background:linear-gradient(105deg, transparent 40%, rgba(255,255,255,.35) 50%, transparent 60%);
  animation: mw-varre 5s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .respira, .respira-lenta, .varre::after, .entra, .linha { animation: none }
}
`;
