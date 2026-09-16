import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Gauge, Globe, LayoutTemplate, Mail, MessageCircle, Workflow } from "lucide-react";
import { contact, mailto } from "@/data/contact";
import { MarcaMW } from "@/components/brand/MarcaMW";
import { MacBook, IPhone } from "@/components/brand/Aparelhos";
import {
  guardarConsentimento,
  iniciarMedicao,
  lerConsentimento,
  medicaoConfigurada,
  registarConversao,
} from "@/lib/ads";

/* Landing de captacao para Google Ads - Espanha, espanhol, sites e landing pages.
   Decisao do Matheus a 14/09/2026. Separada da home, que continua a ser o
   portfolio para vagas: um dono de negocio que pesquisou "pagina web" nao
   pode cair num CV.

   Uma so tarefa: fazer a pessoa mandar mensagem. Tudo o que esta aqui e
   verificavel - os dois casos sao os mesmos do portfolio, sem numero novo.

   REFEITA A 16/09/2026 com o registo da home, mas com uma diferenca de fundo:
   aqui o visitante e PAGO. Nao leva capitulos fixos de 400vh nem iframes vivos
   - a demonstracao entra como captura dentro das mesmas molduras, e o caminho
   ate ao botao continua curto. Todos os ganchos de medicao ficam onde estavam:
   registarConversao em cada WhatsApp e no email, iniciarMedicao na montagem,
   banner de consentimento e barra fixa no telemovel. A COPY NAO MUDA: o titulo,
   o h1 e as descricoes sao os que o Google Ads esta a avaliar. */

export type Variante = "web" | "landing";

const TEXTOS: Record<Variante, {
  titulo: string; descricao: string; olho: string; h1: string; h1Linhas: string[]; sub: string;
  wa: string; assunto: string; ordem: number[];
}> = {
  web: {
    titulo: "Diseño de páginas web a medida para pymes | MW Dev",
    descricao: "Páginas web y landing pages a medida para pymes y autónomos en España. Trato directo con el desarrollador, presupuesto claro antes de empezar y medición de contactos incluida.",
    olho: "Diseño y desarrollo web · España",
    h1: "Tu página web a medida, con trato directo con quien la programa.",
    h1Linhas: ["Tu página web a medida,", "con trato directo", "con quien la programa."],
    sub: "Diseño, desarrollo, publicación y soporte para pymes y autónomos. Sin plantillas, sin intermediarios y con presupuesto claro antes de empezar.",
    wa: "Hola Matheus, he visto tu web y quiero presupuesto para una página web.",
    assunto: "Presupuesto página web",
    ordem: [0, 1, 2],
  },
  landing: {
    titulo: "Diseño de landing pages para campañas de Google Ads | MW Dev",
    descricao: "Landing pages a medida para pymes y autónomos en España: una página con un solo objetivo, conseguir contactos, y la medición de conversiones lista para Google Ads.",
    olho: "Landing pages · España",
    h1: "Tu landing page a medida, pensada para convertir las visitas de tus anuncios en contactos.",
    h1Linhas: ["Tu landing page a medida,", "pensada para convertir", "las visitas de tus anuncios", "en contactos."],
    sub: "Una página con un solo objetivo, medición de conversiones incluida y trato directo con quien la programa. Presupuesto claro antes de empezar.",
    wa: "Hola Matheus, he visto tu web y quiero presupuesto para una landing page.",
    assunto: "Presupuesto landing page",
    ordem: [1, 0, 2],
  },
};

const SERVICIOS = [
  {
    icon: Globe,
    titulo: "Página web para tu negocio",
    texto: "Rápida, adaptada al móvil y preparada para que Google la entienda. Con tus textos, tus fotos y un botón claro para que te escriban.",
  },
  {
    icon: LayoutTemplate,
    titulo: "Landing page para campañas",
    texto: "Una página con un solo objetivo: que el visitante te contacte. Con la medición de conversiones lista para Google Ads.",
  },
  {
    icon: Workflow,
    titulo: "Web que crece a sistema",
    texto: "Cuando la web se queda corta: reservas, presupuestos, panel de clientes o facturación, sobre la misma base.",
  },
] as const;

const CASOS = [
  {
    img: "/lp/samba-site-1200.webp",
    alt: "Web pública de una empresa de mudanzas australiana con la cabecera y el botón de presupuesto",
    etiqueta: "Web + CRM · Australia",
    titulo: "Empresa de mudanzas",
    texto: "Sustituí su web lenta en WordPress por una web nueva, publicada sin un minuto de caída, y un CRM a medida para presupuestos, trabajos y facturación.",
  },
  {
    img: "/lp/cleaning-dashboard-1200.webp",
    alt: "Panel de gestión de una empresa de limpieza con ingresos, trabajos y facturas",
    etiqueta: "Sistema a medida · Australia",
    titulo: "Empresa de limpieza",
    texto: "Pasó de hojas de cálculo, WhatsApp y papel a un sistema propio que genera unas 160 facturas al mes para cerca de 80 clientes.",
  },
] as const;

const PASOS = [
  ["Me cuentas qué necesitas", "Por WhatsApp o email. Qué haces, a quién vendes y qué quieres que haga la web."],
  ["Te envío la propuesta", "Qué incluye, el plazo y el precio, antes de empezar nada."],
  ["La construyo contigo", "Te enseño avances y ajustamos sobre la web real, no sobre un documento."],
  ["La publico y la mido", "Dominio, publicación y medición de contactos. Y sigo ahí si algo falla."],
] as const;

const PORQUE = [
  "Hablas directamente con quien programa tu web. Sin comerciales ni agencia en medio.",
  "Código propio, no una plantilla genérica, pensado para crecer si lo necesitas.",
  "La medición de contactos va incluida: sabrás qué te trae clientes.",
] as const;

const FAQ_LANDING: readonly [string, string] = [
  "¿Qué diferencia hay entre una web y una landing page?",
  "Una web presenta tu negocio entero. Una landing page tiene un solo objetivo, como que te pidan presupuesto desde un anuncio. Muchas veces conviene tener las dos.",
];

const FAQ = [
  ["¿Cuánto cuesta una página web?", "Depende de lo que necesites. Después de la primera conversación te doy un precio cerrado por escrito, antes de empezar."],
  ["¿Cuánto tarda?", "Depende del alcance. El plazo va en la propuesta, con fecha, para que sepas cuándo estará publicada."],
  ["¿Trabajas con negocios de toda España?", "Sí. Trabajo en remoto y hablamos por WhatsApp, email o videollamada."],
  ["¿Puedes llevar también el Google Ads?", "Sí. Puedo dejar la campaña y la medición de conversiones configuradas, para que cada euro tenga un número detrás."],
] as const;

/* Entradas em keyframes CSS e nao em JavaScript: numa pagina que recebe trafego
   pago, o botao nao pode depender do frameloop para existir. */
const CSS = `
@keyframes lp-entra { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:none } }
@keyframes lp-linha { from { transform:translateY(112%) } to { transform:none } }
@keyframes lp-respira { 0%,100% { opacity:.42; transform:translateX(-50%) scale(1) } 50% { opacity:.7; transform:translateX(-50%) scale(1.06) } }
@keyframes lp-varre { 0% { transform:translateX(-140%) } 60%,100% { transform:translateX(240%) } }
.lp-entra { animation: lp-entra .8s cubic-bezier(.16,1,.3,1) both }
.lp-linha { animation: lp-linha .95s cubic-bezier(.16,1,.3,1) both }
.lp-respira { animation: lp-respira 11s ease-in-out infinite }
.lp-varre::after {
  content:""; position:absolute; inset:0; border-radius:inherit;
  background:linear-gradient(105deg, transparent 40%, rgba(255,255,255,.32) 50%, transparent 60%);
  animation: lp-varre 5s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .lp-entra, .lp-linha, .lp-respira, .lp-varre::after { animation: none }
}
`;

function CtaWhatsApp({ href, className = "", texto = "Pedir presupuesto por WhatsApp", brilho = false }: { href: string; className?: string; texto?: string; brilho?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => registarConversao("whatsapp")}
      className={`relative inline-flex min-h-13 items-center justify-center gap-2 overflow-hidden rounded-full bg-blue px-7 text-[16px] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.05,.7,.1,1)] hover:scale-[1.03] hover:bg-[#1a75ff] active:scale-[.98] ${brilho ? "lp-varre" : ""} ${className}`}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        {texto}
      </span>
    </a>
  );
}

function BannerConsentimento({ onFechar }: { onFechar: () => void }) {
  const escolher = (v: "aceite" | "recusado") => {
    guardarConsentimento(v);
    onFechar();
  };
  return (
    <div role="dialog" aria-label="Cookies" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-border-strong bg-card p-5 shadow-card md:bottom-6">
      <p className="text-[15px] leading-6 text-text-bright">
        Uso cookies de Google Ads solo para medir qué anuncios traen contactos. Nada de publicidad personalizada.{" "}
        <Link to="/es/privacidad" className="text-cyan underline underline-offset-4">Más información</Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => escolher("aceite")} className="min-h-11 flex-1 rounded-xl bg-blue px-4 text-[15px] font-semibold text-white">Aceptar</button>
        <button onClick={() => escolher("recusado")} className="min-h-11 flex-1 rounded-xl border border-border-strong px-4 text-[15px] font-semibold text-text-bright">Rechazar</button>
      </div>
    </div>
  );
}

/* Um passo da linha do tempo: acende quando o traco la chega. */
function Paso({ i, total, titulo, texto, progresso, parado }: { i: number; total: number; titulo: string; texto: string; progresso: MotionValue<number>; parado: boolean }) {
  const marca = (i + 0.35) / total;
  const opacity = useTransform(progresso, [marca - 0.16, marca], [0.32, 1]);
  const x = useTransform(progresso, [marca - 0.16, marca], [12, 0]);
  const ponto = useTransform(progresso, [marca - 0.12, marca], [0.45, 1]);
  const brilho = useTransform(progresso, [marca - 0.12, marca], [0, 1]);
  const sombra = useTransform(brilho, (v) => `0 0 ${v * 20}px ${v * 3}px rgba(0,212,255,${v * 0.5})`);
  const cor = useTransform(brilho, (v) => (v > 0.5 ? "#00d4ff" : "#2a2a3a"));
  return (
    <motion.li style={parado ? undefined : { opacity, x }} className="relative grid gap-2 pb-10 pl-12 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-8 md:pb-12 md:pl-16">
      <motion.span
        aria-hidden="true"
        style={parado ? undefined : { scale: ponto, backgroundColor: cor, boxShadow: sombra }}
        className="absolute left-[13px] top-[7px] h-[11px] w-[11px] rounded-full ring-4 ring-void md:left-[17px]"
      />
      <div>
        <span className="font-mono text-[12px] tracking-[0.18em] text-cyan/80">Paso {i + 1}</span>
        <h3 className="mt-2 font-display text-[21px] font-bold leading-tight text-cloud md:text-[26px]">{titulo}</h3>
      </div>
      <p className="max-w-[46ch] text-[15px] leading-7 text-text md:pt-7">{texto}</p>
    </motion.li>
  );
}

/* Um caso, grande e com a captura a correr devagar dentro da moldura. */
function Caso({ caso, i, parado }: { caso: (typeof CASOS)[number]; i: number; parado: boolean }) {
  const alvo = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const inverso = i % 2 === 1;
  return (
    <motion.article
      ref={alvo}
      initial={parado ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`group grid items-center gap-8 md:gap-12 ${inverso ? "md:grid-cols-[0.9fr_1.1fr]" : "md:grid-cols-[1.1fr_0.9fr]"}`}
    >
      <div className={inverso ? "md:order-2" : ""}>
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_44px_100px_-50px_rgba(0,102,255,.5)] transition-[border-color] duration-300 group-hover:border-cyan/30">
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
              src={caso.img}
              alt={caso.alt}
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              style={{ y: parado ? 0 : y }}
              className="absolute inset-x-0 top-0 block h-[122%] w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(.05,.7,.1,1)] group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
      <div className={inverso ? "md:order-1" : ""}>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan md:text-[12px]">{caso.etiqueta}</p>
        <h3 className="mt-3 font-display text-[26px] font-bold leading-[1.05] tracking-[-0.02em] text-cloud md:text-[34px]">{caso.titulo}</h3>
        <p className="mt-4 max-w-[46ch] text-[16px] leading-7 text-text">{caso.texto}</p>
      </div>
    </motion.article>
  );
}

export default function DisenoWeb({ variante = "web" }: { variante?: Variante }) {
  const tx = TEXTOS[variante];
  const waHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(tx.wa)}`;
  const mailHref = mailto(tx.assunto);
  const servicios = tx.ordem.map((i) => SERVICIOS[i]);
  const faq = variante === "landing" ? [FAQ_LANDING, ...FAQ] : FAQ;
  const [bannerAberto, setBannerAberto] = useState(false);
  const [barraVisivel, setBarraVisivel] = useState(false);
  const ctaHero = useRef<HTMLDivElement>(null);
  const listaPasos = useRef<HTMLOListElement>(null);
  const semMovimento = !!useReducedMotion();

  const { scrollYProgress: progressoPasos } = useScroll({ target: listaPasos, offset: ["start 0.8", "end 0.6"] });
  const alturaTraco = useTransform(progressoPasos, [0, 1], ["0%", "100%"]);

  // A barra fixa so aparece quando o botao principal sai do ecra: dois botoes
  // iguais no mesmo ecra e ruido, nao insistencia.
  useEffect(() => {
    const avaliar = () => {
      const r = ctaHero.current?.getBoundingClientRect();
      setBarraVisivel(!!r && r.bottom < 0);
    };
    avaliar();
    window.addEventListener("scroll", avaliar, { passive: true });
    return () => window.removeEventListener("scroll", avaliar);
  }, []);

  useEffect(() => {
    setBannerAberto(medicaoConfigurada && lerConsentimento() === null);
  }, []);

  useEffect(() => {
    document.title = tx.titulo;
    document.documentElement.lang = "es";
    document.querySelector('meta[name="description"]')?.setAttribute("content", tx.descricao);
    iniciarMedicao();
  }, [tx]);

  return (
    <div className="min-h-screen bg-void text-text">
      <style>{CSS}</style>

      <header className="sticky top-0 z-40 border-b border-border bg-void/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <MarcaMW />
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => registarConversao("whatsapp")}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-[13px] font-semibold text-text-bright transition-colors hover:border-cyan"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </header>

      <main>
        {/* HERO: o mesmo registo da home, sem o peso dela. */}
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="lp-respira absolute left-[58%] top-[-40%] h-[100vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,.5),rgba(0,212,255,.12),transparent)] blur-[110px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_32%_46%,rgba(6,6,12,.94)_0%,rgba(6,6,12,.76)_46%,rgba(6,6,12,.55)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-b from-transparent to-void" />
          </div>

          <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-14 md:pb-24 md:pt-24">
            <p className="lp-entra font-mono text-[12px] uppercase tracking-[0.18em] text-cyan md:text-[13px]">{tx.olho}</p>
            <h1
              aria-label={tx.h1}
              className="mt-5 font-display text-[clamp(30px,7.4vw,38px)] font-bold leading-[1.02] tracking-[-0.035em] text-cloud md:whitespace-nowrap md:text-[clamp(32px,4.5vw,54px)]"
            >
              {tx.h1Linhas.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]">
                  <span className="lp-linha block" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                    {l}
                  </span>
                </span>
              ))}
            </h1>
            <p className="lp-entra mt-7 max-w-2xl text-[17px] leading-7 text-text md:text-[19px] md:leading-8" style={{ animationDelay: "0.45s" }}>
              {tx.sub}
            </p>
            <div ref={ctaHero} className="lp-entra mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.58s" }}>
              <CtaWhatsApp href={waHref} brilho />
              <a
                href="#trabajos"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-border-strong px-7 text-[16px] font-semibold text-text-bright transition-[transform,border-color] duration-200 hover:scale-[1.02] hover:border-cyan"
              >
                Ver trabajos <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <ul className="lp-entra mt-9 flex flex-col gap-2.5 text-[15px] text-text sm:flex-row sm:gap-7" style={{ animationDelay: "0.7s" }}>
              {["Webs rápidas y adaptadas al móvil", "Medición de contactos incluida", "Clientes en Australia y Brasil"].map((x) => (
                <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" aria-hidden="true" />{x}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <motion.h2
              initial={semMovimento ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[18ch] font-display text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[46px]"
            >
              Qué puedo hacer por tu negocio
            </motion.h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {servicios.map(({ icon: Icon, titulo, texto }, i) => (
                <motion.article
                  key={titulo}
                  initial={semMovimento ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,0))] p-7 transition-[border-color,transform] duration-300 ease-[cubic-bezier(.05,.7,.1,1)] hover:-translate-y-1.5 hover:border-cyan/30"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan via-blue to-transparent transition-transform duration-500 ease-[cubic-bezier(.05,.7,.1,1)] group-hover:scale-x-100" />
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-cyan" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[20px] font-semibold leading-snug text-text-bright">{titulo}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-text">{texto}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* UN EJEMPLO: a demonstracao, em captura para nao pesar. */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <motion.div
              initial={semMovimento ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-cyan md:text-[13px]">Un ejemplo que puedes abrir</p>
              <h2 className="mt-4 max-w-[20ch] font-display text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[46px]">
                Una página hecha para que te llamen.
              </h2>

              <div className="mt-12 flex w-full items-end justify-center gap-[4%] md:gap-[3%]">
                <div className="w-[56%] md:w-[68%]">
                  <MacBook
                    url="mwdeveloper.tech/ejemplo/limpieza"
                    conteudo={
                      <div className="h-full w-full overflow-hidden bg-[#f3f8f6]">
                        <img
                          src="/work/demo-desktop-es.webp"
                          alt="Landing de ejemplo para una empresa de limpieza, vista en ordenador"
                          loading="lazy"
                          decoding="async"
                          className="block w-full"
                        />
                      </div>
                    }
                  />
                  <p className="mt-4 whitespace-nowrap text-center font-mono text-[9px] uppercase tracking-[0.12em] text-text-dim md:mt-5 md:text-[11px] md:tracking-[0.16em]">
                    Ordenador · 1440 px
                  </p>
                </div>
                <div className="w-[28%] md:w-[15%]">
                  <IPhone
                    conteudo={
                      <div className="h-full w-full overflow-hidden bg-[#f3f8f6]">
                        <img src="/work/demo-movil-es.webp" alt="" loading="lazy" decoding="async" className="block w-full" />
                      </div>
                    }
                  />
                  <p className="mt-4 whitespace-nowrap text-center font-mono text-[9px] uppercase tracking-[0.12em] text-text-dim md:mt-5 md:text-[11px] md:tracking-[0.16em]">
                    Móvil · 390 px
                  </p>
                </div>
              </div>

              <p className="mx-auto mt-10 max-w-[58ch] text-center text-[15px] leading-7 text-text-dim">
                Una landing para una empresa de limpieza, con el formulario de presupuesto en el primer golpe de vista. La
                empresa es ficticia, la página está hecha de verdad.{" "}
                <a href="/ejemplo/limpieza" className="whitespace-nowrap font-semibold text-cyan hover:text-cloud">
                  Abrir el ejemplo <ArrowUpRight className="inline h-4 w-4" aria-hidden="true" />
                </a>
              </p>
            </motion.div>
          </div>
        </section>

        {/* TRABAJOS */}
        <section id="trabajos" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <motion.div
              initial={semMovimento ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="max-w-[16ch] font-display text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[46px]">
                Trabajos en producción
              </h2>
              <p className="mt-4 max-w-2xl text-[17px] leading-7 text-text">Dos negocios reales que usan todos los días lo que construí.</p>
            </motion.div>
            <div className="mt-14 grid gap-16 md:mt-16 md:gap-20">
              {CASOS.map((c, i) => (
                <Caso key={c.titulo} caso={c} i={i} parado={semMovimento} />
              ))}
            </div>
          </div>
        </section>

        {/* CÓMO TRABAJAMOS: linha do tempo que se enche com o scroll. */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <motion.h2
              initial={semMovimento ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[16ch] font-display text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[46px]"
            >
              Cómo trabajamos
            </motion.h2>
            <ol ref={listaPasos} className="relative mt-14">
              <span aria-hidden="true" className="absolute bottom-2 left-[18px] top-2 w-px bg-white/10 md:left-[22px]" />
              <motion.span
                aria-hidden="true"
                style={{ height: semMovimento ? "100%" : alturaTraco }}
                className="absolute left-[18px] top-2 w-px origin-top bg-gradient-to-b from-cyan via-blue to-blue/20 md:left-[22px]"
              />
              {PASOS.map(([titulo, texto], i) => (
                <Paso key={titulo} i={i} total={PASOS.length} titulo={titulo} texto={texto} progresso={progressoPasos} parado={semMovimento} />
              ))}
            </ol>
          </div>
        </section>

        {/* POR QUÉ */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16">
              <div className="md:sticky md:top-24 md:self-start">
                <Gauge className="h-7 w-7 text-cyan" aria-hidden="true" />
                <h2 className="mt-4 max-w-[14ch] font-display text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-cloud [text-wrap:balance] md:text-[46px]">
                  Por qué trabajar conmigo
                </h2>
              </div>
              <ul className="flex flex-col gap-5">
                {PORQUE.map((x, i) => (
                  <motion.li
                    key={x}
                    initial={semMovimento ? false : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-[17px] leading-7 text-text-bright md:p-6"
                  >
                    <Check className="mt-1 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                    {x}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ: fica em <details> de proposito — funciona sem JavaScript e o
            Google le-a na mesma. */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
            <h2 className="font-display text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-cloud md:text-[46px]">
              Preguntas frecuentes
            </h2>
            <div className="mt-10 flex flex-col">
              {faq.map(([p, r]) => (
                <details key={p} className="group border-b border-white/[0.08] py-1">
                  <summary className="cursor-pointer list-none py-5 text-[17px] font-semibold text-text-bright marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {p}
                      <ArrowRight className="h-4 w-4 shrink-0 text-cyan transition-transform duration-300 group-open:rotate-90" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="pb-5 pr-8 text-[15px] leading-7 text-text">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative overflow-hidden border-t border-border">
          <div aria-hidden="true" className="lp-respira pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,.4),transparent)] blur-[100px]" />
          <div className="relative mx-auto max-w-5xl px-5 py-20 text-center md:py-28">
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan md:text-[13px]">Hablemos</p>
            <h2 className="mx-auto mt-5 max-w-[16ch] font-display text-[34px] font-bold leading-[1] tracking-[-0.035em] text-cloud [text-wrap:balance] md:text-[64px]">
              Cuéntame qué necesita tu negocio
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-7 text-text md:text-[19px]">
              Te respondo yo, personalmente, con los siguientes pasos y un presupuesto por escrito.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CtaWhatsApp href={waHref} texto="Escribir por WhatsApp" brilho />
              <a
                href={mailHref}
                onClick={() => registarConversao("email")}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-border-strong px-7 text-[16px] font-semibold text-text-bright transition-[transform,border-color] duration-200 hover:scale-[1.02] hover:border-cyan"
              >
                <Mail className="h-5 w-5" aria-hidden="true" /> {contact.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border pb-24 md:pb-0">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-[13px] text-text-dim sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} MW Dev · Matheus Wilberstaedt</span>
          <span className="flex gap-4">
            <Link to="/es/privacidad" className="hover:text-text-bright">Privacidad y cookies</Link>
            <Link to="/" className="hover:text-text-bright">Inicio</Link>
          </span>
        </div>
      </footer>

      {/* Barra fixa no telemovel: o CTA nunca sai do polegar */}
      {barraVisivel && !bannerAberto && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border-strong bg-void/95 p-3 backdrop-blur md:hidden">
          <CtaWhatsApp href={waHref} className="w-full" />
        </div>
      )}

      {bannerAberto && <BannerConsentimento onFechar={() => setBannerAberto(false)} />}
    </div>
  );
}
