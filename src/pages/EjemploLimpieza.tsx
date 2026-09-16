import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import { Phone, Check, Sparkles, Building2, Home as Casa, ArrowRight, Plus, ShieldCheck, Clock, Repeat } from "lucide-react";

/**
 * PÁGINA DE EXEMPLO: LANDING DE UMA EMPRESA DE LIMPEZA (16/09/2026).
 *
 * O Matheus pediu duas coisas: que o capítulo do MacBook/iPhone não mostre a
 * landing dele própria, e que esta peça esteja "ao mesmo nível" da página que
 * a mostra — com animações. Por isso esta página é mesmo uma landing acabada,
 * com rota própria (`/ejemplo/limpieza`), e é ELA que corre dentro do portátil
 * e do telemóvel na home, num iframe. Não é captura: é a página a funcionar.
 *
 * "Nítida" é um nome INVENTADO para a demonstração e a página diz isso no topo:
 * não é cliente, não tem avaliações, não tem preços e não usa marca de ninguém.
 * Vai com noindex para não competir com as páginas que vendem a sério.
 */

const VERDE = "#0f9d76";
const VERDE_FUNDO = "#e8f4f0";
const TINTA = "#0c1a16";

/* Entrada por baixo, usada em quase tudo. Respeita "reduzir movimento" porque
   quem a desliga vê a página inteira parada, sem ficar com secções invisíveis. */
const sobe: Variants = {
  parado: { opacity: 0, y: 24 },
  visivel: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const VER = { once: true, amount: 0.35 } as const;

function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: VERDE }}>
        <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
      </span>
      <span
        className="font-display text-[19px] font-bold tracking-[-0.02em]"
        style={{ color: claro ? "#fff" : TINTA }}
      >
        Nítida
      </span>
    </span>
  );
}

function Botao({ children, grande = false }: { children: React.ReactNode; grande?: boolean }) {
  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full font-semibold text-white shadow-[0_14px_30px_-12px_rgba(15,157,118,.9)] ${
        grande ? "px-7 py-3.5 text-[16px]" : "px-5 py-2.5 text-[15px]"
      }`}
      style={{ background: VERDE }}
    >
      {children}
    </motion.span>
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
  { t: "Cuéntanos tu casa", d: "Metros, habitaciones y cada cuánto la quieres limpia. Dos minutos." },
  { t: "Recibes el presupuesto", d: "Cerrado y por escrito el mismo día. Sin visita comercial." },
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

function Pergunta({ p, r, aberta, aoAbrir }: { p: string; r: string; aberta: boolean; aoAbrir: () => void }) {
  return (
    <div className="border-b border-black/[0.08]">
      <button
        type="button"
        onClick={aoAbrir}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-[17px] font-semibold tracking-[-0.01em]">{p}</span>
        <motion.span animate={{ rotate: aberta ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
          <Plus className="h-5 w-5" style={{ color: VERDE }} aria-hidden="true" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: aberta ? "auto" : 0, opacity: aberta ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 pr-10 text-[15px] leading-6 text-black/60">{r}</p>
      </motion.div>
    </div>
  );
}

export default function EjemploLimpieza() {
  const semMovimento = useReducedMotion();
  const [encolhido, setEncolhido] = useState(false);
  const [aberta, setAberta] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const passosRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setEncolhido(v > 40));

  /* A linha do "cómo funciona" enche-se ao passar por ela. */
  const { scrollYProgress: progressoPassos } = useScroll({
    target: passosRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const linha = useTransform(progressoPassos, [0, 1], ["0%", "100%"]);

  const { scrollYProgress: progressoHero } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(progressoHero, [0, 1], ["0%", "12%"]);

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
    /* reducedMotion="user" desliga as transformações a quem pediu menos
       movimento, sem ter de duplicar cada animação desta página. */
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white" style={{ color: TINTA }}>
      {/* Aviso: isto é uma demonstração, não uma empresa que existe. */}
      <div className="bg-[#0c1a16] px-5 py-2 text-center text-[12px] font-medium text-white/70">
        Página de ejemplo · empresa ficticia creada para mostrar un trabajo de MW Dev
      </div>

      <motion.header
        animate={{
          backgroundColor: encolhido ? "rgba(255,255,255,.88)" : "rgba(255,255,255,1)",
          boxShadow: encolhido ? "0 10px 30px -18px rgba(12,26,22,.5)" : "0 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-30 border-b border-black/[0.06] backdrop-blur"
      >
        <motion.div
          animate={{ height: encolhido ? 58 : 68 }}
          transition={{ duration: 0.3 }}
          className="mx-auto flex max-w-6xl items-center justify-between px-5"
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
        </motion.div>
      </motion.header>

      <main>
        {/* HERO */}
        <section ref={heroRef} className="relative overflow-hidden bg-[#f3f8f6]">
          <motion.div aria-hidden="true" style={{ y: semMovimento ? 0 : heroY }} className="pointer-events-none absolute inset-0">
            <motion.div
              animate={semMovimento ? undefined : { scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-32 -top-40 h-[620px] w-[620px] rounded-full"
              style={{ background: `radial-gradient(closest-side, ${VERDE}33, transparent)` }}
            />
            <motion.div
              animate={semMovimento ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.45, 0.7, 0.45] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-52 -left-28 h-[520px] w-[520px] rounded-full"
              style={{ background: "radial-gradient(closest-side, #8ed8c3aa, transparent)" }}
            />
          </motion.div>

          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
            <div>
              <motion.p
                custom={0}
                initial="parado"
                animate="visivel"
                variants={sobe}
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]"
                style={{ color: VERDE }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: VERDE }} /> Hogares y oficinas
              </motion.p>
              <motion.h1
                custom={1}
                initial="parado"
                animate="visivel"
                variants={sobe}
                className="mt-5 font-display text-[40px] font-bold leading-[1.02] tracking-[-0.035em] md:text-[60px]"
              >
                Tu casa impecable sin tener que estar encima.
              </motion.h1>
              <motion.p
                custom={2}
                initial="parado"
                animate="visivel"
                variants={sobe}
                className="mt-6 max-w-[46ch] text-[17px] leading-7 text-black/65"
              >
                Equipo propio, asegurado y siempre el mismo en tu domicilio. Presupuesto cerrado antes de empezar y
                sin permanencia.
              </motion.p>
              <motion.div custom={3} initial="parado" animate="visivel" variants={sobe} className="mt-8 flex flex-wrap gap-3">
                <Botao grande>
                  Pedir presupuesto <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Botao>
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/12 bg-white px-7 py-3.5 text-[16px] font-semibold"
                >
                  Ver servicios
                </motion.span>
              </motion.div>
              <motion.ul custom={4} initial="parado" animate="visivel" variants={sobe} className="mt-8 grid gap-2.5 text-[15px] text-black/70">
                {["Personal propio, dado de alta y asegurado", "Productos incluidos en el precio", "Sin permanencia: reservas cuando te hace falta"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: VERDE }} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* O formulário é o coração de uma landing: fica no primeiro ecrã. */}
            <motion.div
              initial={semMovimento ? false : { opacity: 0, y: 40, rotate: -1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
                    <motion.span
                      whileHover={{ borderColor: VERDE }}
                      className="mt-1.5 block h-12 rounded-xl border border-black/10 bg-[#f7faf9]"
                    />
                  </label>
                ))}
                <div>
                  <span className="text-[13px] font-medium text-black/55">¿Qué necesitas?</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Hogar", "Oficina", "A fondo"].map((o, i) => (
                      <motion.span
                        key={o}
                        whileHover={{ y: -2 }}
                        className="cursor-pointer rounded-full border px-4 py-2 text-[14px] font-medium"
                        style={
                          i === 0
                            ? { background: VERDE, borderColor: VERDE, color: "#fff" }
                            : { borderColor: "rgba(0,0,0,.12)", color: "rgba(0,0,0,.6)" }
                        }
                      >
                        {o}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                className="mt-6 flex h-13 cursor-pointer items-center justify-center rounded-xl text-[16px] font-semibold text-white shadow-[0_16px_34px_-14px_rgba(15,157,118,.95)]"
                style={{ background: VERDE }}
              >
                Quiero mi presupuesto
              </motion.span>
              <p className="mt-3 text-center text-[12px] text-black/40">Respondemos en el mismo día laborable.</p>
            </motion.div>
          </div>
        </section>

        {/* GARANTIAS */}
        <section className="border-y border-black/[0.06] bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-3 md:py-12">
            {GARANTIAS.map(({ icone: Icone, t, d }, i) => (
              <motion.div
                key={t}
                custom={i}
                initial="parado"
                whileInView="visivel"
                viewport={VER}
                variants={sobe}
                className="flex gap-4"
              >
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

        {/* SERVIÇOS */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <motion.h2
            initial="parado"
            whileInView="visivel"
            viewport={VER}
            variants={sobe}
            className="max-w-[16ch] font-display text-[34px] font-bold tracking-[-0.03em] md:text-[46px]"
          >
            Qué limpiamos
          </motion.h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SERVICOS.map(({ icone: Icone, nome, texto, itens }, i) => (
              <motion.article
                key={nome}
                custom={i}
                initial="parado"
                whileInView="visivel"
                viewport={VER}
                variants={sobe}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="rounded-2xl border border-black/[0.07] bg-[#f7faf9] p-7 transition-shadow hover:shadow-[0_30px_60px_-35px_rgba(12,26,22,.55)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-[0_6px_18px_-8px_rgba(12,26,22,.4)]">
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

        {/* COMO FUNCIONA, com a linha que se enche ao passar */}
        <section className="bg-[#0c1a16] py-16 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <motion.h2
              initial="parado"
              whileInView="visivel"
              viewport={VER}
              variants={sobe}
              className="font-display text-[34px] font-bold tracking-[-0.03em] md:text-[46px]"
            >
              Cómo funciona
            </motion.h2>
            <div ref={passosRef} className="relative mt-14">
              <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/12 md:block">
                <motion.div style={{ width: semMovimento ? "100%" : linha, background: VERDE }} className="h-full" />
              </div>
              <div className="grid gap-10 md:grid-cols-3">
                {PASSOS.map((p, i) => (
                  <motion.div
                    key={p.t}
                    custom={i}
                    initial="parado"
                    whileInView="visivel"
                    viewport={VER}
                    variants={sobe}
                    className="relative"
                  >
                    <span
                      className="relative z-10 grid h-10 w-10 place-items-center rounded-full font-mono text-[15px] font-bold text-white ring-8 ring-[#0c1a16]"
                      style={{ background: VERDE }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.015em]">{p.t}</h3>
                    <p className="mt-2 text-[15px] leading-6 text-white/55">{p.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PERGUNTAS */}
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <motion.h2
            initial="parado"
            whileInView="visivel"
            viewport={VER}
            variants={sobe}
            className="font-display text-[34px] font-bold tracking-[-0.03em] md:text-[46px]"
          >
            Preguntas frecuentes
          </motion.h2>
          <motion.div initial="parado" whileInView="visivel" viewport={VER} variants={sobe} className="mt-8">
            {PERGUNTAS.map((q, i) => (
              <Pergunta key={q.p} p={q.p} r={q.r} aberta={aberta === i} aoAbrir={() => setAberta(aberta === i ? -1 : i)} />
            ))}
          </motion.div>
        </section>

        {/* FECHO */}
        <section className="relative overflow-hidden bg-[#f3f8f6] py-16 md:py-24">
          <motion.div
            aria-hidden="true"
            animate={semMovimento ? undefined : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: `radial-gradient(closest-side, ${VERDE}2e, transparent)` }}
          />
          <motion.div
            initial="parado"
            whileInView="visivel"
            viewport={VER}
            variants={sobe}
            className="relative mx-auto max-w-3xl px-5 text-center"
          >
            <h2 className="mx-auto max-w-[18ch] font-display text-[34px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[48px]">
              ¿Limpiamos en tu zona?
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-7 text-black/60">
              Escríbenos tu código postal y te decimos el mismo día si tenemos equipo disponible y cuánto costaría.
            </p>
            <div className="mt-8 flex justify-center">
              <Botao grande>
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
