import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * A HISTÓRIA PRESA AO SCROLL (16/09/2026).
 *
 * Quatro atos, do código ao cliente que paga, com o palco fixo na tela enquanto
 * a página rola. É a técnica dos sites da Apple: `position: sticky` mais o
 * progresso do scroll mapeado para transformações. Sem biblioteca nova: o
 * framer-motion já estava no projeto.
 *
 * Regras que este ficheiro não deve perder:
 *  - as telas são as REAIS dos sistemas em produção, não maquetes;
 *  - só se anima `transform` e `opacity` (o resto obriga o browser a repintar);
 *  - telemóvel e quem tem "reduzir movimento" ligado recebem a MESMA história
 *    em cartões estáticos: a mensagem nunca depende do movimento;
 *  - nenhum texto novo nasce aqui, tudo vem de `data/inicio.ts` nas três línguas.
 */

export interface Ato {
  n: string;
  titulo: string;
  texto: string;
}

interface ScrollStoryProps {
  olho: string;
  atos: Ato[];
  fecho: string;
  cta: string;
  ctaHref: string;
}

/* A ordem ESPELHA os atos: painel, fatura, e o site do cliente no ar. Trocar a
   ordem aqui sem trocar o texto em data/inicio.ts volta a pôr a agenda debaixo
   do ato que fala de faturação (defeito visto nos frames de 16/09). */
const TELAS = [
  { src: "/work/cleaning-dashboard-1000.webp", alt: "" },
  { src: "/work/cleaning-invoices-1000.webp", alt: "" },
  { src: "/work/samba-site-1000.webp", alt: "" },
] as const;

/** Janela de cada ato dentro do progresso total (0 a 1). */
const janela = (i: number, total: number): [number, number] => [i / total, (i + 1) / total];

function CodigoCartao() {
  const linhas = [
    ["const", " job = await ", "db", ".job.findUnique({ id });"],
    ["const", " invoice = await ", "gerarFatura", "(job);"],
    ["await", " enviar(invoice.pdf, cliente.email);"],
    ["await", " agendar(job.proximaVisita);"],
    ["// 163 faturas desde maio, sem planilha"],
  ];
  return (
    <div className="h-full w-full rounded-[inherit] bg-[#08080f] p-5 font-mono text-[11px] leading-6 md:p-7 md:text-[13px]">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="mt-5 space-y-1">
        {linhas.map((l, i) => (
          <p key={i} className={i === 4 ? "text-text-dim" : "text-text-bright"}>
            <span className="mr-3 select-none text-text-dim/60">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-cyan">{l[0]}</span>
            {l.slice(1).join("")}
          </p>
        ))}
        <p className="text-text-bright">
          <span className="mr-3 select-none text-text-dim/60">06</span>
          <span className="inline-block h-4 w-[7px] translate-y-[2px] bg-ember" />
        </p>
      </div>
    </div>
  );
}

/** Um cartão do baralho: entra, fica de frente no seu ato, e recua no seguinte. */
function Tela({
  progresso,
  indice,
  total,
  src,
  alt,
}: {
  progresso: MotionValue<number>;
  indice: number;
  total: number;
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}) {
  const [inicio, fim] = janela(indice, total);
  /* O cartao so existe na SUA janela, com uma faixa curta de entrada e saida.
     Com a rampa a comecar no ato anterior, o cartao seguinte aparecia girado
     por cima do da vez e lia-se como uma lasca clara (16/09, frames a 1440). */
  const faixa = 0.055;
  const entrada = Math.max(inicio - faixa, 0);
  const saida = Math.min(fim + faixa, 1);
  const pontos = [entrada, inicio, fim, saida];

  const opacity = useTransform(progresso, pontos, [0, 1, 1, 0]);
  const rotateY = useTransform(progresso, pontos, [22, 0, 0, -18]);
  const rotateX = useTransform(progresso, pontos, [9, 0, 0, -7]);
  const x = useTransform(progresso, pontos, ["14%", "0%", "0%", "-12%"]);
  const scale = useTransform(progresso, pontos, [0.88, 1, 1, 0.92]);
  const z = useTransform(progresso, pontos, [-140, 0, 0, -110]);

  return (
    <motion.figure
      style={{ opacity, rotateY, rotateX, x, scale, z, zIndex: total - indice }}
      className="absolute inset-0 overflow-hidden rounded-2xl border border-border-strong bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,.75)]"
    >
      {src ? (
        /* eager de proposito: sao 3 webp de ~30 KB e, em lazy, quem rola depressa
           via a moldura vazia antes da tela aparecer (16/09). */
        <img src={src} alt={alt ?? ""} width={1000} height={625} loading="eager" decoding="async" className="block h-full w-full object-cover object-top" />
      ) : (
        <CodigoCartao />
      )}
    </motion.figure>
  );
}

function TextoDoAto({ progresso, indice, total, ato }: { progresso: MotionValue<number>; indice: number; total: number; ato: Ato }) {
  const [inicio, fim] = janela(indice, total);
  const margem = 0.032;
  const opacity = useTransform(
    progresso,
    [inicio - margem, inicio + margem, fim - margem, fim + margem],
    [0, 1, 1, 0],
  );
  const y = useTransform(progresso, [inicio - margem, inicio + margem, fim - margem, fim + margem], [26, 0, 0, -26]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0">
      <p className="font-mono text-[13px] tracking-[0.14em] text-cyan">{ato.n}</p>
      <h3 className="mt-3 font-display text-[28px] font-bold leading-[1.1] tracking-tight text-cloud [text-wrap:balance] lg:text-[40px]">
        {ato.titulo}
      </h3>
      <p className="mt-4 max-w-md text-[16px] leading-7 text-text">{ato.texto}</p>
    </motion.div>
  );
}

/** Uma versao de cada vez no DOM: com as duas, o leitor de ecra e a busca liam
    os quatro atos a dobrar (medido a 16/09). */
function usaPalcoFixo(): boolean {
  const [largo, setLargo] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : true,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const ouvir = (e: MediaQueryListEvent) => setLargo(e.matches);
    mq.addEventListener("change", ouvir);
    return () => mq.removeEventListener("change", ouvir);
  }, []);
  return largo;
}

export function ScrollStory({ olho, atos, fecho, cta, ctaHref }: ScrollStoryProps) {
  const alvo = useRef<HTMLDivElement>(null);
  const semMovimento = useReducedMotion();
  const palcoFixo = usaPalcoFixo() && !semMovimento;
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start start", "end end"] });
  const total = atos.length;

  const cartoes = [{ src: undefined as string | undefined, alt: "" }, ...TELAS];
  const barra = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* Telemóvel e "reduzir movimento": a mesma história, sem palco fixo. */
  const estatico = (
    <div>
      <div className="mx-auto max-w-5xl px-5 py-16">
        <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-cyan">{olho}</p>
        <div className="mt-8 space-y-10">
          {atos.map((ato, i) => (
            <article key={ato.n}>
              <div className="overflow-hidden rounded-2xl border border-border-strong bg-card">
                {i === 0 ? (
                  <div className="aspect-[16/10]">
                    <CodigoCartao />
                  </div>
                ) : (
                  <img
                    src={TELAS[i - 1].src}
                    alt=""
                    width={1000}
                    height={625}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                )}
              </div>
              <p className="mt-5 font-mono text-[13px] tracking-[0.14em] text-cyan">{ato.n}</p>
              <h3 className="mt-2 font-display text-[22px] font-bold leading-tight text-cloud">{ato.titulo}</h3>
              <p className="mt-2 text-[15px] leading-6 text-text">{ato.texto}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-[15px] leading-6 text-text-dim">{fecho}</p>
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue px-6 text-[15px] font-semibold text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[.98]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> {cta}
        </a>
      </div>
    </div>
  );

  if (!palcoFixo) return <section className="border-t border-border bg-card/40">{estatico}</section>;

  return (
    <section className="border-t border-border bg-card/40">
      {/* Palco fixo: só em ecrã largo e com movimento permitido. */}
      <div ref={alvo} className="relative" style={{ height: `${(total + 1) * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1180px] grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-16 px-8">
            <div className="relative">
              <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-cyan">{olho}</p>
              <div className="relative mt-10 h-[300px]">
                {atos.map((ato, i) => (
                  <TextoDoAto key={ato.n} progresso={scrollYProgress} indice={i} total={total} ato={ato} />
                ))}
              </div>
              <div className="mt-2 h-px w-full max-w-[340px] bg-border-strong">
                <motion.div style={{ width: barra }} className="h-px bg-cyan" />
              </div>
              <p className="mt-5 max-w-[340px] text-[14px] leading-6 text-text-dim">{fecho}</p>
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue px-6 text-[15px] font-semibold text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[.98]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> {cta}
              </a>
            </div>

            <div className="relative [perspective:1600px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-16 rounded-full bg-[radial-gradient(60%_60%_at_50%_45%,var(--color-blue-soft),transparent_70%)] blur-2xl"
              />
              <div className="relative aspect-[16/10] w-full [transform-style:preserve-3d]">
                {cartoes.map((c, i) => (
                  <Tela key={i} progresso={scrollYProgress} indice={i} total={total} src={c.src} alt={c.alt} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
