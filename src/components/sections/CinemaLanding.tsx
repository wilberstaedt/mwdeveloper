import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * CAPÍTULO EM TELA CHEIA: UMA LANDING A CORRER NUM MACBOOK E NUM IPHONE
 * (16/09/2026).
 *
 * Três pedidos do Matheus no mesmo dia, por ordem:
 *   1. molduras de portátil e telemóvel a sério ("passa mais credibilidade");
 *   2. mostrar uma peça de demonstração do setor da limpeza, não a landing dele;
 *   3. que essa demonstração esteja ao mesmo nível desta página, com animações,
 *      e que o portátil comece FECHADO e abra com o scroll.
 *
 * Por causa do (3) isto não é uma captura: dentro do ecrã corre a página
 * `/ejemplo/limpieza` num iframe da mesma origem, e o scroll desta página
 * empurra o scroll de dentro. As animações dela acontecem de verdade.
 *
 * Fallback para ecrãs pequenos e para quem tem "reduzir movimento": as capturas
 * estáticas em /work. Dois iframes com React dentro num telemóvel seria caro, e
 * a 390 px não se lia nada — o que se ganha não paga o que custa.
 */

export interface CinemaLandingTexto {
  olho: string;
  titulo: string;
  legenda: string;
  url: string;
  verMais: string;
  rotuloDesktop: string;
  rotuloMovel: string;
}

const DESKTOP = "/work/demo-limpieza-desktop.webp";
const MOVEL = "/work/demo-limpieza-movil.webp";

/* Largura lógica de cada aparelho: é a largura de viewport que o iframe tem de
   ter para a página lá dentro escolher o layout certo. Depois é escalada. */
const LOGICA_MAC = 1440;
const LOGICA_TELEFONE = 390;

/* A coreografia inteira num sítio só, para não andar a caçar números soltos. */
const ABRE = [0.06, 0.24] as const; // a tampa levanta
const CORRE = [0.28, 0.94] as const; // a página corre lá dentro

function usaPalcoVivo() {
  const [vivo, setVivo] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const ver = () => setVivo(mq.matches);
    ver();
    mq.addEventListener("change", ver);
    return () => mq.removeEventListener("change", ver);
  }, []);
  return vivo;
}

/**
 * O ecrã: um iframe com viewport lógico fixo, encolhido por transform até
 * caber na moldura. Medir em vez de assumir, porque a moldura é percentagem do
 * ecrã do visitante e muda com a janela.
 */
function Ecra({
  rota,
  logica,
  progresso,
  atraso = 0,
  className = "",
}: {
  rota: string;
  logica: number;
  progresso: MotionValue<number>;
  atraso?: number;
  className?: string;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const quadro = useRef<HTMLIFrameElement>(null);
  const [medida, setMedida] = useState({ escala: 0, altura: 0 });

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const medir = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      setMedida({ escala: width / logica, altura: Math.round((height / width) * logica) });
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [logica]);

  /* O scroll desta página empurra o scroll de dentro do aparelho. */
  const sincroniza = (p: number) => {
    const janela = quadro.current?.contentWindow;
    if (!janela) return;
    let curso = 0;
    try {
      curso = janela.document.documentElement.scrollHeight - janela.innerHeight;
    } catch {
      return;
    }
    if (curso <= 0) return;
    const [ini, fim] = CORRE;
    const t = Math.min(1, Math.max(0, (p - ini - atraso) / (fim - ini)));
    janela.scrollTo({ top: t * curso, behavior: "instant" as ScrollBehavior });
  };

  useMotionValueEvent(progresso, "change", sincroniza);

  /* Guardado num ref para o observador lá em baixo não ficar preso à versão
     antiga da função. */
  const sincronizaRef = useRef(sincroniza);
  sincronizaRef.current = sincroniza;

  /* O "load" do iframe chega quando o HTML carregou, e não quando o React lá
     dentro já pintou: nessa altura scrollHeight ainda é a altura da janela e a
     sincronização desistia (curso = 0). Ficava preso no topo até o visitante
     mexer, porque o "change" só dispara quando o valor muda — e quem abre a
     página já a meio do capítulo nunca o faz. Observar a altura do documento de
     dentro resolve isso e ainda apanha as fontes a assentar. */
  const observador = useRef<ResizeObserver | null>(null);
  const aoCarregar = () => {
    const janela = quadro.current?.contentWindow;
    if (!janela) return;
    const agora = () => sincronizaRef.current(progresso.get());
    agora();
    observador.current?.disconnect();
    try {
      /* O ResizeObserver do documento de dentro, quando existe: é quem vê a
         altura real daquele documento. */
      const RO = (janela as unknown as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver ?? ResizeObserver;
      const obs = new RO(agora);
      observador.current = obs;
      obs.observe(janela.document.documentElement);
    } catch {
      /* Sem observador ainda há as tentativas seguintes. */
    }
    [120, 400, 900, 2000].forEach((ms) => window.setTimeout(agora, ms));
  };

  useEffect(() => () => observador.current?.disconnect(), []);

  return (
    <div ref={caixa} className={`relative overflow-hidden bg-[#f3f8f6] ${className}`}>
      {medida.escala > 0 && (
        <iframe
          ref={quadro}
          /* ?embed=1: a página lá dentro sabe que está dentro do portátil e
             troca as entradas por tempo por movimento ligado ao scroll. */
          src={`${rota}?embed=1`}
          title=""
          aria-hidden="true"
          tabIndex={-1}
          scrolling="no"
          loading="lazy"
          onLoad={aoCarregar}
          style={{
            width: logica,
            height: medida.altura,
            transform: `scale(${medida.escala})`,
            transformOrigin: "top left",
            border: 0,
            pointerEvents: "none",
          }}
        />
      )}
      {/* Reflexo do vidro */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_38%,rgba(255,255,255,0)_62%,rgba(255,255,255,.06)_100%)]"
      />
    </div>
  );
}

/* PORTÁTIL. Tudo CSS, sem imagem nem marca de ninguém.
   A tampa roda sobre a aresta de baixo; por baixo dela ficam, por esta ordem,
   a dobradiça (escura, da largura da tampa), a base em cunha (mais larga, com
   o entalhe do dedo à frente) e a sombra de contacto. Foi o que faltava na
   primeira versão: sem dobradiça nem sombra, a barra clara parecia solta. */
function MacBook({
  url,
  conteudo,
  rotacao,
  ecraOpacity,
  capaOpacity,
}: {
  url: string;
  conteudo: React.ReactNode;
  rotacao?: MotionValue<number>;
  ecraOpacity?: MotionValue<number>;
  capaOpacity?: MotionValue<number>;
}) {
  return (
    <div className="relative w-full" style={{ perspective: 2000 }}>
      {/* TAMPA */}
      <motion.div
        style={
          rotacao ? { rotateX: rotacao, transformOrigin: "bottom center", transformStyle: "preserve-3d" } : undefined
        }
        className="relative z-10 rounded-[10px] bg-[linear-gradient(175deg,#c9ced6_0%,#8e949d_18%,#5c626b_55%,#31353b_100%)] p-[1.5px] shadow-[0_60px_130px_-45px_rgba(0,102,255,.5)] md:rounded-[18px] md:p-[2.5px]"
      >
        <div className="relative rounded-[9px] bg-[#0a0a0d] p-[4px] shadow-[inset_0_1px_0_rgba(255,255,255,.07)] md:rounded-[16px] md:p-[10px]">
          {/* Câmara */}
          <span className="absolute left-1/2 top-[1.5px] h-[2px] w-[2px] -translate-x-1/2 rounded-full bg-[#22252b] md:top-[4px] md:h-[4px] md:w-[4px]" />
          <motion.div style={ecraOpacity ? { opacity: ecraOpacity } : undefined} className="aspect-[16/10] w-full">
            <div className="flex h-full flex-col overflow-hidden rounded-[3px] bg-[#0b0b13] md:rounded-[5px]">
              {/* Barra do navegador, dentro do ecrã */}
              <div className="flex shrink-0 items-center gap-[3px] bg-[#1a1a22] px-[6px] py-[4px] md:gap-1.5 md:px-2.5 md:py-1.5">
                <span className="h-[3px] w-[3px] rounded-full bg-[#ff5f57] md:h-2 md:w-2" />
                <span className="h-[3px] w-[3px] rounded-full bg-[#febc2e] md:h-2 md:w-2" />
                <span className="h-[3px] w-[3px] rounded-full bg-[#28c840] md:h-2 md:w-2" />
                <span className="ml-1.5 hidden truncate rounded bg-white/[0.07] px-2 py-[2px] font-mono text-[9px] text-text-dim md:inline md:text-[10px]">
                  {url}
                </span>
              </div>
              <div className="min-h-0 flex-1">{conteudo}</div>
            </div>
          </motion.div>

          {/* Com a tampa em baixo vê-se o alumínio das costas, não o ecrã.
             Some assim que a tampa passa de meio caminho. */}
          {capaOpacity && (
            <motion.div
              aria-hidden="true"
              style={{ opacity: capaOpacity }}
              className="pointer-events-none absolute inset-0 rounded-[9px] bg-[linear-gradient(168deg,#c6ccd4_0%,#9ba1aa_36%,#787e87_66%,#adb3bc_100%)] md:rounded-[16px]"
            />
          )}
        </div>
      </motion.div>

      {/* DOBRADIÇA: escura, da largura da tampa, cola a tampa à base. */}
      <div className="relative z-0 mx-auto h-[2px] w-[97%] bg-[linear-gradient(180deg,#191c21,#2b2f36)] md:h-[5px]" />

      {/* BASE em cunha, mais larga do que a tampa. */}
      <div
        className="relative left-1/2 z-0 h-[5px] w-[111%] -translate-x-1/2 md:h-[13px]"
        style={{ clipPath: "polygon(0 0, 100% 0, 98.8% 100%, 1.2% 100%)" }}
      >
        <div className="h-full rounded-b-[4px] bg-[linear-gradient(180deg,#d9dee4_0%,#b0b6bf_24%,#878e97_60%,#565c65_100%)] md:rounded-b-[9px]" />
        {/* Entalhe do dedo, à frente e ao centro. */}
        <span className="absolute left-1/2 top-0 h-[2px] w-[13%] -translate-x-1/2 rounded-b-full bg-[#9ba1aa] md:h-[5px]" />
      </div>

      {/* Sombra de contacto: é o que assenta o objecto em vez de o deixar a
         flutuar em cima do preto. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative left-1/2 h-[14px] w-[92%] -translate-x-1/2 md:h-[26px]"
        style={{ background: "radial-gradient(closest-side, rgba(0,0,0,.75), transparent)" }}
      />
    </div>
  );
}

/* Telemóvel: aro de titânio, ilha dinâmica, botões laterais. */
function IPhone({ conteudo }: { conteudo: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <span className="absolute -left-[1.5px] top-[20%] h-[5%] w-[1.5px] rounded-l-sm bg-[#565b63] md:-left-[2.5px] md:w-[2.5px]" />
      <span className="absolute -left-[1.5px] top-[28%] h-[9%] w-[1.5px] rounded-l-sm bg-[#565b63] md:-left-[2.5px] md:w-[2.5px]" />
      <span className="absolute -right-[1.5px] top-[26%] h-[12%] w-[1.5px] rounded-r-sm bg-[#565b63] md:-right-[2.5px] md:w-[2.5px]" />
      <div className="relative aspect-[9/19.5] w-full rounded-[14px] bg-[linear-gradient(145deg,#8b9098_0%,#3e424a_35%,#22242a_70%,#5a5f68_100%)] p-[1.5px] shadow-[0_34px_80px_-22px_rgba(0,0,0,.95)] md:rounded-[30px] md:p-[2.5px]">
        <div className="h-full rounded-[13px] bg-[#0a0a0e] p-[1.5px] md:rounded-[28px] md:p-[3px]">
          <div className="relative h-full overflow-hidden rounded-[11px] md:rounded-[25px]">
            {conteudo}
            <span className="absolute left-1/2 top-[1%] h-[1.4%] w-[21%] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CinemaLanding({ texto, rota }: { texto: CinemaLandingTexto; rota: string }) {
  const alvo = useRef<HTMLDivElement>(null);
  const semMovimento = useReducedMotion();
  const largo = usaPalcoVivo();
  const vivo = largo && !semMovimento;
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start start", "end end"] });

  const tituloOpacity = useTransform(scrollYProgress, [0, 0.06, 0.9, 0.98], [0, 1, 1, 0]);
  const tituloY = useTransform(scrollYProgress, [0, 0.06], [40, 0]);
  const palcoOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const abertura = useTransform(scrollYProgress, [ABRE[0], ABRE[1]], [-90, 0]);
  const ecraOpacity = useTransform(scrollYProgress, [ABRE[0] + 0.09, ABRE[1]], [0, 1]);
  const capaOpacity = useTransform(scrollYProgress, [ABRE[0] + 0.05, ABRE[0] + 0.11], [1, 0]);
  /* A tampa roda sobre a aresta de baixo, por isso enquanto está fechada o
     objecto fica no fundo da caixa que ocupa e abre-se um buraco por cima.
     Subir o conjunto enquanto fecha compensa isso. */
  const macY = useTransform(scrollYProgress, [ABRE[0], ABRE[1]], ["-34%", "0%"]);
  const movelX = useTransform(scrollYProgress, [0.16, 0.32], [40, 0]);
  const movelOpacity = useTransform(scrollYProgress, [0.16, 0.32], [0, 1]);
  const legendaOpacity = useTransform(scrollYProgress, [0.26, 0.36], [0, 1]);
  /* Nas capturas estáticas o percurso é o background-position: em percentagem
     alinha o topo a 0% e o fundo a 100%, seja qual for a altura do ecrã. */
  const posParada = useTransform(scrollYProgress, [CORRE[0], CORRE[1]], ["0%", "100%"]);

  const parado = (src: string) => (
    <motion.div
      aria-hidden="true"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        backgroundPositionY: semMovimento ? "0%" : posParada,
      }}
      className="h-full w-full bg-[#f3f8f6]"
    />
  );

  /* No telemóvel manda o telemóvel; no computador manda o portátil. As larguras
     mantêm os dois em escala: um iPhone tem ~0,75 da altura do ecrã de um 14". */
  const Palco = (
    <div className="mx-auto flex w-full max-w-[1020px] items-end justify-center gap-[4%] md:gap-[3%]">
      <motion.div style={semMovimento ? undefined : { y: macY }} className="w-[56%] md:w-[70%]">
        <MacBook
          url={texto.url}
          rotacao={semMovimento ? undefined : abertura}
          ecraOpacity={semMovimento ? undefined : ecraOpacity}
          capaOpacity={semMovimento ? undefined : capaOpacity}
          conteudo={
            vivo ? (
              <Ecra rota={rota} logica={LOGICA_MAC} progresso={scrollYProgress} className="h-full w-full" />
            ) : (
              parado(DESKTOP)
            )
          }
        />
        <p className="mt-4 whitespace-nowrap text-center font-mono text-[9px] uppercase tracking-[0.12em] text-text-dim md:mt-5 md:text-[11px] md:tracking-[0.16em]">
          {texto.rotuloDesktop}
        </p>
      </motion.div>

      <motion.div
        style={semMovimento ? undefined : { x: movelX, opacity: movelOpacity }}
        className="w-[28%] md:w-[15%]"
      >
        <IPhone
          conteudo={
            vivo ? (
              <Ecra
                rota={rota}
                logica={LOGICA_TELEFONE}
                progresso={scrollYProgress}
                atraso={0.02}
                className="h-full w-full"
              />
            ) : (
              parado(MOVEL)
            )
          }
        />
        <p className="mt-4 whitespace-nowrap text-center font-mono text-[9px] uppercase tracking-[0.12em] text-text-dim md:mt-5 md:text-[11px] md:tracking-[0.16em]">
          {texto.rotuloMovel}
        </p>
      </motion.div>
    </div>
  );

  const legenda = (
    <>
      {texto.legenda}{" "}
      <a href={rota} className="whitespace-nowrap font-semibold text-cyan hover:text-cloud">
        {texto.verMais} <ArrowUpRight className="inline h-4 w-4" aria-hidden="true" />
      </a>
    </>
  );

  if (semMovimento) {
    return (
      <section className="bg-void px-6 py-24">
        <div className="mx-auto max-w-[1020px]">
          <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-cyan">{texto.olho}</p>
          <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.05] tracking-tight text-cloud">
            {texto.titulo}
          </h2>
          <div className="mt-12">{Palco}</div>
          <p className="mt-10 max-w-[58ch] text-[15px] leading-6 text-text-dim">{legenda}</p>
        </div>
      </section>
    );
  }

  return (
    <div ref={alvo} className="relative h-[400vh] bg-void">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <motion.div style={{ opacity: tituloOpacity, y: tituloY }} className="relative z-10 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan md:text-[13px]">{texto.olho}</p>
          <h2 className="mx-auto mt-3 max-w-[18ch] font-display text-[32px] font-bold leading-[1] tracking-[-0.03em] text-cloud [text-wrap:balance] md:mt-4 md:text-[60px]">
            {texto.titulo}
          </h2>
        </motion.div>

        <motion.div style={{ opacity: palcoOpacity }} className="relative z-10 mt-8 w-full md:mt-10">
          {Palco}
        </motion.div>

        <motion.p
          style={{ opacity: legendaOpacity }}
          className="relative z-10 mt-6 max-w-[58ch] text-center text-[14px] leading-6 text-text-dim md:mt-7 md:text-[15px]"
        >
          {legenda}
        </motion.p>
      </div>
    </div>
  );
}
