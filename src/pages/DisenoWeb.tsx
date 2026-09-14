import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Gauge, Globe, LayoutTemplate, Mail, MessageCircle, Workflow } from "lucide-react";
import { contact, mailto } from "@/data/contact";
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
   verificavel - os dois casos sao os mesmos do portfolio, sem numero novo. */

/* Uma pagina por grupo de anuncios: o Google premia a pagina que repete o que a
   pessoa pesquisou. Prova, processo e medicao sao partilhados. */
export type Variante = "web" | "landing";

const TEXTOS: Record<Variante, {
  titulo: string; descricao: string; olho: string; h1: string; sub: string;
  wa: string; assunto: string; ordem: number[];
}> = {
  web: {
    titulo: "Diseño de páginas web a medida para pymes | MW Dev",
    descricao: "Páginas web y landing pages a medida para pymes y autónomos en España. Trato directo con el desarrollador, presupuesto claro antes de empezar y medición de contactos incluida.",
    olho: "Diseño y desarrollo web · España",
    h1: "Tu página web a medida, con trato directo con quien la programa.",
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

function CtaWhatsApp({ href, className = "", texto = "Pedir presupuesto por WhatsApp" }: { href: string; className?: string; texto?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => registarConversao("whatsapp")}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue px-6 text-[15px] font-semibold text-white transition-[transform,background-color] duration-150 ease-[cubic-bezier(.05,.7,.1,1)] hover:scale-[1.02] hover:bg-[#1a75ff] active:scale-[.98] ${className}`}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {texto}
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

export default function DisenoWeb({ variante = "web" }: { variante?: Variante }) {
  const tx = TEXTOS[variante];
  const waHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(tx.wa)}`;
  const mailHref = mailto(tx.assunto);
  const servicios = tx.ordem.map((i) => SERVICIOS[i]);
  const faq = variante === "landing" ? [FAQ_LANDING, ...FAQ] : FAQ;
  const [bannerAberto, setBannerAberto] = useState(false);
  const [barraVisivel, setBarraVisivel] = useState(false);
  const ctaHero = useRef<HTMLDivElement>(null);

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
      <header className="sticky top-0 z-40 border-b border-border bg-void/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <span className="font-mono text-[13px] font-semibold tracking-[0.14em] text-text-bright">MW DEV</span>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => registarConversao("whatsapp")}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-strong px-4 text-[13px] font-semibold text-text-bright hover:border-cyan"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-5 pb-16 pt-12 md:pb-24 md:pt-20">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-cyan">{tx.olho}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[34px] font-bold leading-[1.1] tracking-tight text-cloud [text-wrap:balance] md:text-[52px]">
            {tx.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-7 text-text">
            {tx.sub}
          </p>
          <div ref={ctaHero} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaWhatsApp href={waHref} />
            <a href="#trabajos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong px-6 text-[15px] font-semibold text-text-bright hover:border-cyan">
              Ver trabajos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <ul className="mt-8 flex flex-col gap-2 text-[15px] text-text sm:flex-row sm:gap-6">
            {["Webs rápidas y adaptadas al móvil", "Medición de contactos incluida", "Clientes en Australia y Brasil"].map((x) => (
              <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" aria-hidden="true" />{x}</li>
            ))}
          </ul>
        </section>

        {/* Servicios */}
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <h2 className="font-display text-[28px] font-bold leading-tight text-cloud md:text-[36px]">Qué puedo hacer por tu negocio</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {servicios.map(({ icon: Icon, titulo, texto }) => (
                <article key={titulo} className="rounded-2xl border border-border bg-card p-6">
                  <Icon className="h-6 w-6 text-cyan" aria-hidden="true" />
                  <h3 className="mt-4 text-[20px] font-semibold leading-snug text-text-bright">{titulo}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-text">{texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Trabajos */}
        <section id="trabajos" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 md:py-24">
          <h2 className="font-display text-[28px] font-bold leading-tight text-cloud md:text-[36px]">Trabajos en producción</h2>
          <p className="mt-3 max-w-2xl text-[17px] leading-7 text-text">Dos negocios reales que usan todos los días lo que construí.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {CASOS.map((c) => (
              <article key={c.titulo} className="flex flex-col">
                <div className="overflow-hidden rounded-2xl border border-border-strong bg-card">
                  <img src={c.img} alt={c.alt} width={1200} height={750} loading="lazy" decoding="async" className="block h-auto w-full" />
                </div>
                <p className="mt-5 font-mono text-[13px] uppercase tracking-[0.12em] text-cyan">{c.etiqueta}</p>
                <h3 className="mt-2 text-[20px] font-semibold text-text-bright">{c.titulo}</h3>
                <p className="mt-2 text-[15px] leading-6 text-text">{c.texto}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Como trabajo */}
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <h2 className="font-display text-[28px] font-bold leading-tight text-cloud md:text-[36px]">Cómo trabajamos</h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-4">
              {PASOS.map(([titulo, texto], i) => (
                <li key={titulo} className="rounded-2xl border border-border bg-card p-6">
                  <span className="font-mono text-[13px] font-semibold text-cyan">Paso {i + 1}</span>
                  <h3 className="mt-3 text-[17px] font-semibold leading-snug text-text-bright">{titulo}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-text">{texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Por que */}
        <section className="mx-auto max-w-5xl px-5 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
            <div>
              <Gauge className="h-7 w-7 text-cyan" aria-hidden="true" />
              <h2 className="mt-4 font-display text-[28px] font-bold leading-tight text-cloud md:text-[36px]">Por qué trabajar conmigo</h2>
            </div>
            <ul className="flex flex-col gap-4">
              {PORQUE.map((x) => (
                <li key={x} className="flex gap-3 text-[17px] leading-7 text-text-bright">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
            <h2 className="font-display text-[28px] font-bold leading-tight text-cloud md:text-[36px]">Preguntas frecuentes</h2>
            <div className="mt-8 flex flex-col gap-3">
              {faq.map(([p, r]) => (
                <details key={p} className="group rounded-2xl border border-border bg-card px-6 py-5">
                  <summary className="cursor-pointer list-none text-[17px] font-semibold text-text-bright marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {p}
                      <ArrowRight className="h-4 w-4 shrink-0 text-text-dim transition-transform duration-200 group-open:rotate-90" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-6 text-text">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-5xl px-5 py-16 md:py-24">
          <div className="rounded-3xl border border-border-strong bg-card p-8 text-center md:p-14">
            <h2 className="mx-auto max-w-2xl font-display text-[28px] font-bold leading-tight text-cloud [text-wrap:balance] md:text-[36px]">
              Cuéntame qué necesita tu negocio
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-7 text-text">Te respondo yo, personalmente, con los siguientes pasos y un presupuesto por escrito.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CtaWhatsApp href={waHref} texto="Escribir por WhatsApp" />
              <a
                href={mailHref}
                onClick={() => registarConversao("email")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong px-6 text-[15px] font-semibold text-text-bright hover:border-cyan"
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
