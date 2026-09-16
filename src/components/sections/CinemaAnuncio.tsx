import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Search, MessageCircle } from "lucide-react";

/**
 * CAPÍTULO EM TELA CHEIA: DO ANÚNCIO AO CLIENTE (16/09/2026).
 *
 * O Matheus corrigiu o rumo: a página estava a vender um sistema de limpeza, e
 * o que ele faz é software à medida, landings e campanhas. Este capítulo mostra
 * a parte de marketing em movimento: a busca é escrita, o anúncio aparece, a
 * landing monta-se, o formulário preenche-se e a mensagem cai no telemóvel.
 *
 * Nenhum número de desempenho aparece aqui de propósito: prometer taxas de
 * conversão que não medimos seria inventar. O que se mostra é o CAMINHO.
 */

export interface CinemaAnuncioTexto {
  olho: string;
  titulo: string;
  legenda: string;
  busca: string;
  anuncioTitulo: string;
  anuncioUrl: string;
  anuncioTexto: string;
  campos: string[];
  botao: string;
  mensagem: string;
}

/* Cada campo com os seus próprios hooks: chamá-los dentro de um .map() é
   ordem de hooks presa ao tamanho do array, e isso parte no dia em que o texto
   de uma língua tiver um campo a mais. */
function CampoLanding({ progresso, inicio, rotulo }: { progresso: MotionValue<number>; inicio: number; rotulo: string }) {
  const entrada = useTransform(progresso, [inicio, inicio + 0.04], [0, 1]);
  const opacity = useTransform(entrada, (v) => 0.35 + v * 0.65);
  return (
    <motion.div
      style={{ opacity }}
      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 md:px-4 md:py-3"
    >
      <span className="text-[13px] text-text-dim">{rotulo}</span>
      <motion.span style={{ scaleX: entrada }} className="h-[2px] w-24 origin-left rounded bg-cyan/70" />
    </motion.div>
  );
}

export function CinemaAnuncio({ texto, ctaHref }: { texto: CinemaAnuncioTexto; ctaHref: string }) {
  const alvo = useRef<HTMLDivElement>(null);
  const semMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start start", "end end"] });

  /* Coreografia: 0.10 escreve a busca · 0.28 anúncio · 0.44 landing ·
     0.62 formulário · 0.80 mensagem. */
  const letras = useTransform(scrollYProgress, [0.08, 0.26], [0, texto.busca.length]);
  const buscaTexto = useTransform(letras, (v) => texto.busca.slice(0, Math.round(v)));
  const cursorOpacity = useTransform(scrollYProgress, [0.24, 0.28], [1, 0]);

  const tituloOpacity = useTransform(scrollYProgress, [0, 0.07, 0.9, 0.98], [0, 1, 1, 0]);
  const tituloY = useTransform(scrollYProgress, [0, 0.07], [40, 0]);

  const anuncioOpacity = useTransform(scrollYProgress, [0.28, 0.35], [0, 1]);
  const anuncioY = useTransform(scrollYProgress, [0.28, 0.35], [14, 0]);

  const landingOpacity = useTransform(scrollYProgress, [0.44, 0.52], [0, 1]);
  const landingY = useTransform(scrollYProgress, [0.44, 0.52], [26, 0]);
  const landingScale = useTransform(scrollYProgress, [0.44, 0.52], [0.96, 1]);

  const botaoGlow = useTransform(scrollYProgress, [0.72, 0.78], [0, 1]);
  const botaoSombra = useTransform(botaoGlow, (v) => `0 0 ${v * 40}px rgba(0,102,255,${v * 0.7})`);

  /* Os cartões que ainda não apareceram já ocupam o espaço deles, por isso no
     primeiro tempo o que se vê fica encostado ao topo e sobra meio ecrã em
     baixo — foi o que o Matheus viu num ecrã grande. O palco começa mais baixo,
     centrado na busca, e sobe à medida que os cartões entram. */
  const palcoY = useTransform(scrollYProgress, [0.08, 0.44], ["15%", "0%"]);

  const msgOpacity = useTransform(scrollYProgress, [0.8, 0.86], [0, 1]);
  const msgY = useTransform(scrollYProgress, [0.8, 0.86], [24, 0]);

  const Estatico = (
    <section className="bg-void px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-cyan">{texto.olho}</p>
        <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.05] tracking-tight text-cloud">{texto.titulo}</h2>
        <div className="mt-10 rounded-xl border border-white/10 bg-[#0b0b13] p-5">
          <p className="font-mono text-[14px] text-text-dim">{texto.busca}</p>
          <p className="mt-4 text-[15px] font-semibold text-cloud">{texto.anuncioTitulo}</p>
          <p className="text-[13px] text-cyan">{texto.anuncioUrl}</p>
          <p className="mt-1 text-[14px] text-text">{texto.anuncioTexto}</p>
        </div>
        <p className="mt-6 text-[15px] leading-6 text-text-dim">{texto.legenda}</p>
      </div>
    </section>
  );

  if (semMovimento) return Estatico;

  return (
    <div ref={alvo} className="relative h-[340vh] bg-void">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <motion.div style={{ y: palcoY }} className="flex w-full flex-col items-center">
        <motion.div style={{ opacity: tituloOpacity, y: tituloY }} className="relative z-10 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan md:text-[13px]">{texto.olho}</p>
          <h2 className="mx-auto mt-3 max-w-[15ch] font-display text-[30px] font-bold leading-[1] tracking-[-0.03em] text-cloud [text-wrap:balance] md:mt-4 md:text-[88px]">
            {texto.titulo}
          </h2>
        </motion.div>

        {/* A BUSCA, grande e ao centro. Era um campo pequeno encostado à
           esquerda: num ecrã grande o primeiro tempo do capítulo ficava vazio,
           que foi o que o Matheus viu. É a busca que abre a história, por isso
           é ela que ocupa o palco enquanto o resto ainda não existe. */}
        <div className="relative z-10 mt-6 w-full max-w-[760px] md:mt-12">
          <div className="flex items-center gap-3 rounded-full border border-white/12 bg-[#0b0b13] px-4 py-2.5 shadow-[0_24px_60px_-30px_rgba(0,102,255,.7)] md:gap-4 md:px-7 md:py-4.5">
            <Search className="h-4 w-4 shrink-0 text-text-dim md:h-5 md:w-5" aria-hidden="true" />
            <motion.span className="truncate font-sans text-[15px] text-text-bright md:text-[20px]">{buscaTexto}</motion.span>
            <motion.span style={{ opacity: cursorOpacity }} className="inline-block h-4 w-[2px] bg-cyan md:h-5 md:w-[2.5px]" />
          </div>
        </div>

        <div className="relative z-10 mt-4 grid w-full max-w-[1060px] gap-4 md:mt-8 md:gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-start">
          {/* Esquerda: o anúncio que aparece na busca */}
          <motion.div
            style={{ opacity: anuncioOpacity, y: anuncioY }}
            className="rounded-xl border border-white/10 bg-[#0b0b13] p-4 md:rounded-2xl md:p-6"
          >
            <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim md:text-[11px]">
              Ad
            </span>
            <p className="mt-2 text-[16px] font-semibold leading-snug text-cloud md:mt-3 md:text-[20px]">{texto.anuncioTitulo}</p>
            <p className="font-mono text-[12px] text-cyan md:text-[13px]">{texto.anuncioUrl}</p>
            <p className="mt-1 text-[14px] leading-6 text-text md:mt-2 md:text-[15px] md:leading-7">{texto.anuncioTexto}</p>
          </motion.div>

          {/* Direita: a landing que monta e o formulário que se preenche */}
          <motion.div
            style={{ opacity: landingOpacity, y: landingY, scale: landingScale }}
            className="rounded-2xl border border-white/10 bg-[#0b0b13] p-4 shadow-[0_40px_120px_-40px_rgba(0,102,255,.5)] md:p-7"
          >
            <div className="h-1.5 w-24 rounded-full bg-white/15 md:h-2 md:w-32" />
            <div className="mt-3 h-1.5 w-40 rounded-full bg-white/8 md:h-2 md:w-52" />
            <div className="mt-4 space-y-2 md:mt-7 md:space-y-3">
              {texto.campos.map((c, i) => (
                <CampoLanding key={c} progresso={scrollYProgress} inicio={0.6 + i * 0.04} rotulo={c} />
              ))}
            </div>
            <motion.div
              style={{ boxShadow: botaoSombra }}
              className="mt-4 flex items-center justify-center rounded-lg bg-blue py-2.5 text-[13px] font-semibold text-white md:mt-6 md:rounded-xl md:py-3.5 md:text-[15px]"
            >
              {texto.botao}
            </motion.div>
          </motion.div>
        </div>

        {/* A mensagem que chega ao telemóvel: o fim real da campanha */}
        <motion.a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ opacity: msgOpacity, y: msgY }}
          className="relative z-10 mt-5 inline-flex items-center gap-2.5 rounded-2xl border border-success/40 bg-success/10 px-4 py-2.5 text-[13px] text-text-bright md:mt-8 md:gap-3 md:px-5 md:py-3 md:text-[15px]"
        >
          <MessageCircle className="h-5 w-5 text-success" aria-hidden="true" />
          {texto.mensagem}
        </motion.a>

        <motion.p style={{ opacity: msgOpacity }} className="relative z-10 mt-4 max-w-xl text-center text-[13px] leading-5 text-text-dim md:mt-6 md:text-[15px] md:leading-6">
          {texto.legenda}
        </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
