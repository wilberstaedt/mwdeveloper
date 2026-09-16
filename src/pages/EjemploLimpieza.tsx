import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { Phone, Check, Sparkles, Building2, Home as Casa, ArrowRight, Plus, ShieldCheck, Clock, Repeat } from "lucide-react";

/**
 * PÁGINA DE EXEMPLO: LANDING DE UMA EMPRESA DE LIMPEZA (16/09/2026).
 *
 * É esta a página que corre dentro do MacBook e do iPhone na home, num iframe,
 * e é também uma página a sério com rota própria. O Matheus pediu que estivesse
 * "ao mesmo nível" da landing dele, "pra mostrar um padrão e excelência".
 *
 * REGRA DE OURO DESTA PÁGINA: o movimento vem do SCROLL ou do CSS, nunca de um
 * temporizador em JavaScript. Medido a 16/09: o Chrome trava o
 * requestAnimationFrame de um iframe que ainda não considera visível, e o nosso
 * iframe nasce com a tampa do portátil fechada e o ecrã a opacidade 0. As
 * animações de entrada por tempo ficavam congeladas a meio (opacity 0,
 * translateY parado em 15,5 px) e o herói aparecia em branco lá dentro. As que
 * dependem do scroll não têm esse problema, porque quem as move somos nós.
 * Por isso: `initial` só quando a página é aberta a sério (sem ?embed=1), e as
 * pulsações de fundo em keyframes CSS, que correm no compositor.
 *
 * "Nítida" é um nome INVENTADO e a página diz isso no topo: não é cliente, não
 * tem avaliações, não tem preços e não usa marca de ninguém. Vai com noindex
 * para não competir com as páginas que vendem.
 */

const VERDE = "#0f9d76";
const VERDE_FUNDO = "#e8f4f0";
const TINTA = "#0c1a16";

const VER = { once: true, amount: 0.3 } as const;

/* ?plano=1: página toda no estado final, sem capítulo fixo e sem revelações
   ligadas ao scroll. Serve só para tirar as capturas de reserva que entram nos
   ecrãs pequenos — numa captura de página inteira o scroll nunca acontece, e
   tudo o que depende dele sairia apagado. */
const PLANO = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("plano");

/* Só as keyframes que têm de sobreviver ao travão de rAF do iframe. */
const CSS = `
@keyframes nitida-respira { 0%,100% { transform: scale(1); opacity:.5 } 50% { transform: scale(1.12); opacity:.78 } }
@keyframes nitida-brilho { 0% { transform: translateX(-120%) } 55%,100% { transform: translateX(220%) } }
.nitida-respira { animation: nitida-respira 12s ease-in-out infinite }
.nitida-respira-lenta { animation: nitida-respira 15s ease-in-out infinite reverse }
.nitida-brilho::after {
  content:""; position:absolute; inset:0; border-radius:inherit; overflow:hidden;
  background:linear-gradient(105deg, transparent 38%, rgba(255,255,255,.45) 50%, transparent 62%);
  animation: nitida-brilho 4.5s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .nitida-respira, .nitida-respira-lenta, .nitida-brilho::after { animation: none }
}
`;

/* A estrela de quatro pontas da marca, vazada ao centro. Vai em SVG e não em
   imagem porque aparece a 20 px no cabeçalho e a 200 px no rodapé. */
function Estrela({ className, cor = "currentColor" }: { className?: string; cor?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill={cor} fillRule="evenodd" aria-hidden="true">
      <path d="M50 2 Q54.5 45.5 98 50 Q54.5 54.5 50 98 Q45.5 54.5 2 50 Q45.5 45.5 50 2 Z M50 30 Q52 48 70 50 Q52 52 50 70 Q48 52 30 50 Q48 48 50 30 Z" />
    </svg>
  );
}

function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: VERDE }}>
        <Estrela className="h-[18px] w-[18px]" cor="#fff" />
      </span>
      <span className="font-display text-[19px] font-bold tracking-[-0.02em]" style={{ color: claro ? "#fff" : TINTA }}>
        Nítida
      </span>
    </span>
  );
}

function Botao({ children, grande = false, brilho = false }: { children: React.ReactNode; grande?: boolean; brilho?: boolean }) {
  return (
    <span
      className={`relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full font-semibold text-white shadow-[0_14px_30px_-12px_rgba(15,157,118,.9)] transition-transform duration-200 ease-[cubic-bezier(.05,.7,.1,1)] hover:scale-[1.03] active:scale-[.98] ${
        grande ? "px-7 py-3.5 text-[16px]" : "px-5 py-2.5 text-[15px]"
      } ${brilho ? "nitida-brilho" : ""}`}
      style={{ background: VERDE }}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </span>
  );
}

/* Cada palavra acende ao passar: o efeito é do SCROLL, por isso continua vivo
   dentro do iframe. Componente próprio porque chamar hooks num .map() prende a
   ordem dos hooks ao número de palavras. */
function Palavra({ palavra, progresso, i, total }: { palavra: string; progresso: MotionValue<number>; i: number; total: number }) {
  const inicio = (i / total) * 0.72;
  const opacity = useTransform(progresso, [inicio, inicio + 0.28], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {palavra}
    </motion.span>
  );
}

function TituloAceso({ texto, className, escuro = false }: { texto: string; className?: string; escuro?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const semMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.42"] });
  const palavras = texto.split(" ");
  if (semMovimento || PLANO) return <h2 className={`${className} ${escuro ? "text-white" : ""}`}>{texto}</h2>;
  return (
    <h2 ref={ref} className={`${className} ${escuro ? "text-white" : ""}`}>
      {palavras.map((p, i) => (
        <Palavra key={`${p}-${i}`} palavra={p} progresso={scrollYProgress} i={i} total={palavras.length} />
      ))}
    </h2>
  );
}

const SERVICOS = [
  {
    icone: Casa,
    nome: "Limpieza del hogar",
    texto: "Semanal, quincenal o puntual. Siempre el mismo equipo, que ya sabe cómo te gusta tu casa.",
    itens: ["Cocina y baños a fondo", "Cambio de sábanas", "Productos incluidos"],
  },
  {
    icone: Building2,
    nome: "Oficinas y locales",
    texto: "Fuera del horario de trabajo, con parte de servicio firmado en cada visita.",
    itens: ["Antes de abrir o al cerrar", "Parte firmado por visita", "Factura mensual"],
  },
  {
    icone: Sparkles,
    nome: "Limpieza a fondo",
    texto: "Mudanzas, fin de alquiler y después de obra, para entregar la casa como nueva.",
    itens: ["Electrodomésticos por dentro", "Cristales y persianas", "Juntas y cal"],
  },
];

const PASSOS = [
  { t: "Cuéntanos tu casa", d: "Metros, habitaciones y cada cuánto la quieres limpia. Dos minutos y sin registrarte." },
  { t: "Recibes el presupuesto", d: "Cerrado y por escrito el mismo día. Sin visita comercial y sin letra pequeña." },
  { t: "Reservas el día", d: "Confirmamos por mensaje y te avisamos cuando el equipo sale hacia tu casa." },
];

const GARANTIAS = [
  { icone: ShieldCheck, t: "Personal propio", d: "Dado de alta y asegurado. Nada de subcontratas." },
  { icone: Clock, t: "Puntualidad", d: "Si el equipo se retrasa, te avisamos antes de la hora." },
  { icone: Repeat, t: "Sin permanencia", d: "Reservas cuando te hace falta y paras cuando quieras." },
];

const PERGUNTAS = [
  { p: "¿Tengo que estar en casa?", r: "No hace falta. Muchos clientes nos dejan llave o código, y te avisamos al entrar y al salir." },
  { p: "¿Traéis los productos?", r: "Sí, van incluidos. Si prefieres que usemos los tuyos por alergias o superficies delicadas, también." },
  { p: "¿Puedo cambiar el día?", r: "Sí, avisando con 24 horas reorganizamos el equipo sin coste." },
];

/* Um passo do capítulo fixo: acende, fica, apaga. */
function PassoFixo({
  progresso,
  i,
  total,
  passo,
}: {
  progresso: MotionValue<number>;
  i: number;
  total: number;
  passo: { t: string; d: string };
}) {
  const fatia = 1 / total;
  const ini = 0.08 + i * fatia * 0.82;
  const opacity = useTransform(progresso, [ini, ini + 0.1], [0.18, 1]);
  const y = useTransform(progresso, [ini, ini + 0.1], [26, 0]);
  const anel = useTransform(progresso, [ini, ini + 0.1], [0.3, 1]);
  return (
    <motion.div style={{ opacity, y }} className="flex gap-5 md:gap-7">
      <motion.span
        style={{ scale: anel }}
        className="block h-11 w-11 shrink-0 md:h-14 md:w-14"
      >
        <span
          className="grid h-full w-full place-items-center rounded-full font-mono text-[16px] font-bold text-white md:text-[19px]"
          style={{ background: VERDE }}
        >
          {i + 1}
        </span>
      </motion.span>
      <div>
        <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-white md:text-[30px]">{passo.t}</h3>
        <p className="mt-2 max-w-[44ch] text-[15px] leading-6 text-white/55 md:text-[17px] md:leading-7">{passo.d}</p>
      </div>
    </motion.div>
  );
}

/* Banda de foto a toda a largura, com parallax. A imagem entra mais alta do
   que a janela e desliza devagar: e o unico sitio desta pagina onde uma foto
   faz falta, por isso leva cuidado a mais. */
function BandaFoto({ src, alt, legenda }: { src: string; alt: string; legenda: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const semMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section
      ref={ref}
      /* Em ?plano=1 a altura vai em pixeis: a captura de pagina inteira usa uma
         janela de milhares de pixeis, e 62vh dava uma banda de tres metros. */
      className={`relative overflow-hidden ${PLANO ? "h-[420px]" : "h-[46vh] min-h-[280px] md:h-[62vh]"}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y: semMovimento ? 0 : y }}
        className="absolute inset-0 h-[118%] w-full object-cover"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black/45"
      />
      <p className="absolute bottom-6 left-0 right-0 mx-auto max-w-6xl px-5 text-[14px] font-medium text-white/85 md:bottom-8 md:text-[16px]">
        {legenda}
      </p>
    </section>
  );
}

function Pergunta({ p, r, aberta, aoAbrir }: { p: string; r: string; aberta: boolean; aoAbrir: () => void }) {
  return (
    <div className="border-b border-black/[0.08]">
      <button type="button" onClick={aoAbrir} className="flex w-full items-center justify-between gap-6 py-5 text-left">
        <span className="text-[17px] font-semibold tracking-[-0.01em]">{p}</span>
        <span
          className="shrink-0 transition-transform duration-300"
          style={{ transform: aberta ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <Plus className="h-5 w-5" style={{ color: VERDE }} aria-hidden="true" />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
        style={{ gridTemplateRows: aberta ? "1fr" : "0fr", opacity: aberta ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-10 text-[15px] leading-6 text-black/60">{r}</p>
        </div>
      </div>
    </div>
  );
}

export default function EjemploLimpieza() {
  const semMovimento = useReducedMotion();
  /* ?embed=1 → está dentro do portátil na home. Ver o comentário do topo. */
  const [embutido] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("embed"),
  );
  /* ?plano=1 → sem o capítulo fixo. Serve para tirar a captura de reserva que
     entra nos ecrãs pequenos: uma secção de 240vh numa captura de página
     inteira sairia como dois mil pixéis de vazio. */
  const plano = PLANO;
  const quieto = embutido || semMovimento;
  const [encolhido, setEncolhido] = useState(false);
  const [aberta, setAberta] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const passosRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setEncolhido(v > 40));

  const { scrollYProgress: progressoPassos } = useScroll({ target: passosRef, offset: ["start start", "end end"] });

  const { scrollYProgress: progressoHero } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(progressoHero, [0, 1], ["0%", "14%"]);
  const cartaoY = useTransform(progressoHero, [0, 1], ["0%", "-9%"]);
  const heroOpacity = useTransform(progressoHero, [0.5, 1], [1, 0.25]);

  /* Entra de baixo ao aparecer. Só quando a página é aberta a sério. */
  const entra = quieto
    ? {}
    : ({
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: VER,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      } as const);

  const entraTarde = (i: number) =>
    quieto
      ? {}
      : ({
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: VER,
          transition: { duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] },
        } as const);

  useEffect(() => {
    document.title = "Nítida · ejemplo de landing para empresa de limpieza";
    document.documentElement.lang = "es";
    let m = document.querySelector('meta[name="robots"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "robots");
      document.head.appendChild(m);
    }
    m.setAttribute("content", "noindex, nofollow");
    return () => m?.setAttribute("content", "index, follow");
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <style>{CSS}</style>
      <div className="min-h-screen bg-white" style={{ color: TINTA }}>
        {/* Isto é uma demonstração, não uma empresa que existe. */}
        <div className="bg-[#0c1a16] px-5 py-2 text-center text-[12px] font-medium text-white/70">
          Página de ejemplo · empresa ficticia creada para mostrar un trabajo de MW Dev
        </div>

        <header
          className="sticky top-0 z-30 border-b border-black/[0.06] backdrop-blur transition-[background-color,box-shadow] duration-300"
          style={{
            backgroundColor: encolhido ? "rgba(255,255,255,.88)" : "#ffffff",
            boxShadow: encolhido ? "0 10px 30px -18px rgba(12,26,22,.5)" : "none",
          }}
        >
          <div
            className="mx-auto flex max-w-6xl items-center justify-between px-5 transition-[height] duration-300"
            style={{ height: encolhido ? 58 : 70 }}
          >
            <Marca />
            <div className="flex items-center gap-6">
              <nav className="hidden gap-6 text-[15px] font-medium text-black/55 md:flex">
                <span className="cursor-pointer transition-colors hover:text-[#0f9d76]">Servicios</span>
                <span className="cursor-pointer transition-colors hover:text-[#0f9d76]">Cómo funciona</span>
                <span className="cursor-pointer transition-colors hover:text-[#0f9d76]">Preguntas</span>
              </nav>
              <Botao>
                <Phone className="h-4 w-4" aria-hidden="true" /> Pedir presupuesto
              </Botao>
            </div>
          </div>
        </header>

        <main>
          {/* HERO */}
          <section ref={heroRef} className="relative overflow-hidden bg-[#f3f8f6]">
            <motion.div aria-hidden="true" style={{ y: semMovimento ? 0 : heroY }} className="pointer-events-none absolute inset-0">
              <div
                className="nitida-respira absolute -right-32 -top-40 h-[620px] w-[620px] rounded-full"
                style={{ background: `radial-gradient(closest-side, ${VERDE}38, transparent)` }}
              />
              <div
                className="nitida-respira-lenta absolute -bottom-52 -left-28 h-[520px] w-[520px] rounded-full"
                style={{ background: "radial-gradient(closest-side, #8ed8c3aa, transparent)" }}
              />
            </motion.div>

            <motion.div
              style={{ opacity: semMovimento ? 1 : heroOpacity }}
              className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24"
            >
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: VERDE }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: VERDE }} /> Hogares y oficinas
                </span>
                <h1 className="mt-5 font-display text-[40px] font-bold leading-[1.02] tracking-[-0.035em] md:text-[60px]">
                  Tu casa impecable sin tener que estar encima.
                </h1>
                <p className="mt-6 max-w-[46ch] text-[17px] leading-7 text-black/65">
                  Equipo propio, asegurado y siempre el mismo en tu domicilio. Presupuesto cerrado antes de empezar y sin
                  permanencia.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Botao grande brilho>
                    Pedir presupuesto <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Botao>
                  <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/12 bg-white px-7 py-3.5 text-[16px] font-semibold transition-transform duration-200 hover:scale-[1.03]">
                    Ver servicios
                  </span>
                </div>
                <ul className="mt-8 grid gap-2.5 text-[15px] text-black/70">
                  {[
                    "Personal propio, dado de alta y asegurado",
                    "Productos incluidos en el precio",
                    "Sin permanencia: reservas cuando te hace falta",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: VERDE }} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* O formulário é o coração de uma landing: fica no primeiro ecrã. */}
              <motion.div
                style={{ y: semMovimento ? 0 : cartaoY }}
                className="rounded-3xl border border-black/[0.07] bg-white p-7 shadow-[0_40px_90px_-40px_rgba(12,26,22,.45)] md:p-8"
              >
                <span
                  className="inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{ background: VERDE_FUNDO, color: VERDE }}
                >
                  Sin compromiso
                </span>
                <h2 className="mt-4 font-display text-[26px] font-bold tracking-[-0.025em]">Presupuesto en el día</h2>
                <p className="mt-2 text-[15px] leading-6 text-black/55">
                  Rellena tres datos y te llamamos con el precio cerrado.
                </p>
                <div className="mt-6 space-y-3.5">
                  {["Nombre", "Teléfono", "Ciudad o código postal"].map((r) => (
                    <label key={r} className="block">
                      <span className="text-[13px] font-medium text-black/55">{r}</span>
                      <span className="mt-1.5 block h-12 rounded-xl border border-black/10 bg-[#f7faf9] transition-colors duration-200 hover:border-[#0f9d76]" />
                    </label>
                  ))}
                  <div>
                    <span className="text-[13px] font-medium text-black/55">¿Qué necesitas?</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Hogar", "Oficina", "A fondo"].map((o, i) => (
                        <span
                          key={o}
                          className="cursor-pointer rounded-full border px-4 py-2 text-[14px] font-medium transition-transform duration-200 hover:-translate-y-0.5"
                          style={
                            i === 0
                              ? { background: VERDE, borderColor: VERDE, color: "#fff" }
                              : { borderColor: "rgba(0,0,0,.12)", color: "rgba(0,0,0,.6)" }
                          }
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span
                  className="nitida-brilho relative mt-6 flex h-13 cursor-pointer items-center justify-center overflow-hidden rounded-xl text-[16px] font-semibold text-white shadow-[0_16px_34px_-14px_rgba(15,157,118,.95)]"
                  style={{ background: VERDE }}
                >
                  <span className="relative z-10">Quiero mi presupuesto</span>
                </span>
                <p className="mt-3 text-center text-[12px] text-black/40">Respondemos en el mismo día laborable.</p>
              </motion.div>
            </motion.div>
          </section>

          {/* GARANTIAS */}
          <section className="border-y border-black/[0.06] bg-white">
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-3 md:py-12">
              {GARANTIAS.map(({ icone: Icone, t, d }, i) => (
                <motion.div key={t} {...entraTarde(i)} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: VERDE_FUNDO }}>
                    <Icone className="h-5 w-5" style={{ color: VERDE }} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{t}</h3>
                    <p className="mt-1 text-[14px] leading-6 text-black/55">{d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* UMA IMAGEM, EM BANDA. Parallax ligado ao scroll (nada de tempo). */}
          <BandaFoto
            src="/work/nitida-sala.webp"
            alt="Salón luminoso y recogido después de una limpieza"
            legenda="Así queda un salón después de una visita nuestra"
          />

          {/* SERVIÇOS */}
          <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <TituloAceso
              texto="Qué limpiamos"
              className="max-w-[16ch] font-display text-[34px] font-bold tracking-[-0.03em] md:text-[46px]"
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {SERVICOS.map(({ icone: Icone, nome, texto, itens }, i) => (
                <motion.article
                  key={nome}
                  {...entraTarde(i)}
                  className="group rounded-2xl border border-black/[0.07] bg-[#f7faf9] p-7 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.05,.7,.1,1)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgba(12,26,22,.55)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-[0_6px_18px_-8px_rgba(12,26,22,.4)] transition-transform duration-300 group-hover:scale-110">
                    <Icone className="h-5 w-5" style={{ color: VERDE }} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.015em]">{nome}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-black/60">{texto}</p>
                  <ul className="mt-5 space-y-2 border-t border-black/[0.07] pt-5 text-[14px] text-black/60">
                    {itens.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: VERDE }} aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>

          {/* COMO FUNCIONA: capítulo fixo, os passos acendem um a um */}
          <div ref={passosRef} className={`relative bg-[#0c1a16] ${plano ? "py-16 md:py-24" : "h-[240vh]"}`}>
            <div className={plano ? "px-5" : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5"}>
              <div className="mx-auto w-full max-w-4xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: VERDE }}>
                  Tres pasos
                </p>
                <TituloAceso
                  texto="Cómo funciona"
                  escuro
                  className="mt-3 font-display text-[34px] font-bold tracking-[-0.03em] md:text-[52px]"
                />
                <div className="mt-10 space-y-8 md:mt-14 md:space-y-10">
                  {PASSOS.map((p, i) =>
                    plano ? (
                      <div key={p.t} className="flex gap-5 md:gap-7">
                        <span className="block h-11 w-11 shrink-0 md:h-14 md:w-14">
                          <span
                            className="grid h-full w-full place-items-center rounded-full font-mono text-[16px] font-bold text-white md:text-[19px]"
                            style={{ background: VERDE }}
                          >
                            {i + 1}
                          </span>
                        </span>
                        <div>
                          <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-white md:text-[30px]">{p.t}</h3>
                          <p className="mt-2 max-w-[44ch] text-[15px] leading-6 text-white/55 md:text-[17px] md:leading-7">{p.d}</p>
                        </div>
                      </div>
                    ) : (
                      <PassoFixo key={p.t} progresso={progressoPassos} i={i} total={PASSOS.length} passo={p} />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PERGUNTAS, com a cozinha ao lado */}
          <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-14">
              <motion.div {...entra} className="md:sticky md:top-28">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src="/work/nitida-cozinha.webp"
                    alt="Encimera de cocina impecable a contraluz"
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[4/3] w-full object-cover md:aspect-[3/4]"
                  />
                </div>
              </motion.div>
              <div>
                <TituloAceso
                  texto="Preguntas frecuentes"
                  className="font-display text-[34px] font-bold tracking-[-0.03em] md:text-[46px]"
                />
                <motion.div {...entra} className="mt-8">
                  {PERGUNTAS.map((q, i) => (
                    <Pergunta key={q.p} p={q.p} r={q.r} aberta={aberta === i} aoAbrir={() => setAberta(aberta === i ? -1 : i)} />
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* FECHO */}
          <section className="relative overflow-hidden bg-[#f3f8f6] py-16 md:py-24">
            <div
              aria-hidden="true"
              className="nitida-respira pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: `radial-gradient(closest-side, ${VERDE}33, transparent)` }}
            />
            <motion.div {...entra} className="relative mx-auto max-w-3xl px-5 text-center">
              <h2 className="mx-auto max-w-[18ch] font-display text-[34px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[48px]">
                ¿Limpiamos en tu zona?
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-7 text-black/60">
                Escríbenos tu código postal y te decimos el mismo día si tenemos equipo disponible y cuánto costaría.
              </p>
              <div className="mt-8 flex justify-center">
                <Botao grande brilho>
                  <Phone className="h-4 w-4" aria-hidden="true" /> Pedir presupuesto
                </Botao>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="bg-[#0c1a16] py-10 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-[14px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <Marca claro />
            <span>Ejemplo de landing page · no es una empresa real</span>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
