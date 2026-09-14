/* Home de servicos (14/09/2026): o portfolio para vagas passou para /cv.
   Uma lingua por visitante (es, pt-BR, en; fr/de caem em en). Cada mercado so
   aponta para uma pagina quando ela existe; ate la, o botao abre o WhatsApp na
   lingua certa - nunca um link morto. */

export type LinguaInicio = "es" | "pt-BR" | "en";

export interface Mercado {
  id: "es" | "br" | "au";
  nome: string;
  texto: string;
  /** Rota interna quando a pagina do mercado existe. */
  rota?: string;
  /** Mensagem pre-preenchida quando ainda nao ha pagina. */
  wa?: string;
  cta: string;
}

export const INICIO: Record<LinguaInicio, {
  titulo: string; descricao: string; olho: string; h1: string; sub: string;
  cta: string; wa: string; servicosTitulo: string;
  servicos: { titulo: string; texto: string }[];
  mercadosTitulo: string; mercados: Mercado[];
  provaTitulo: string; casos: { etiqueta: string; titulo: string; texto: string; alt: string }[];
  cv: string; cvLink: string;
}> = {
  es: {
    titulo: "MW Dev | Páginas web y sistemas a medida",
    descricao: "Páginas web, landing pages y sistemas a medida para pymes y autónomos, con trato directo con el desarrollador.",
    olho: "MW Dev · Matheus Wilberstaedt",
    h1: "Páginas web y sistemas a medida, con trato directo con quien los programa.",
    sub: "Diseño, desarrollo, publicación y soporte para pymes y autónomos. Sin plantillas y sin agencia de por medio.",
    cta: "Escribir por WhatsApp",
    wa: "Hola Matheus, he visto tu web y quiero hablar de un proyecto.",
    servicosTitulo: "Qué hago",
    servicos: [
      { titulo: "Páginas web", texto: "Rápidas, adaptadas al móvil y con un botón claro para que te escriban." },
      { titulo: "Landing pages", texto: "Una página con un solo objetivo y la medición lista para Google Ads." },
      { titulo: "Sistemas a medida", texto: "Reservas, presupuestos, paneles y facturación cuando la web se queda corta." },
    ],
    mercadosTitulo: "¿Dónde está tu negocio?",
    mercados: [
      { id: "es", nome: "España", texto: "Webs y landing pages para pymes y autónomos.", rota: "/es/diseno-web", cta: "Ver servicios" },
      { id: "br", nome: "Brasil", texto: "Sites e sistemas para empresas brasileiras.", wa: "Oi Matheus, vi seu site e quero falar sobre um projeto.", cta: "Hablar por WhatsApp" },
      { id: "au", nome: "Australia", texto: "Websites and custom systems for Australian businesses.", wa: "Hi Matheus, I saw your website and want to talk about a project.", cta: "Hablar por WhatsApp" },
    ],
    provaTitulo: "Trabajos en producción",
    casos: [
      { etiqueta: "Web + CRM · Australia", titulo: "Empresa de mudanzas", texto: "Web nueva publicada sin un minuto de caída y un CRM a medida para presupuestos, trabajos y facturación.", alt: "Web pública de una empresa de mudanzas australiana" },
      { etiqueta: "Sistema a medida · Australia", titulo: "Empresa de limpieza", texto: "Un sistema propio que genera unas 160 facturas al mes para cerca de 80 clientes.", alt: "Panel de gestión de una empresa de limpieza" },
    ],
    cv: "¿Eres reclutador?",
    cvLink: "Ver mi CV y experiencia",
  },
  "pt-BR": {
    titulo: "MW Dev | Sites e sistemas sob medida",
    descricao: "Sites, landing pages e sistemas sob medida para pequenas e médias empresas, falando direto com o desenvolvedor.",
    olho: "MW Dev · Matheus Wilberstaedt",
    h1: "Sites e sistemas sob medida, falando direto com quem programa.",
    sub: "Design, desenvolvimento, publicação e suporte para pequenas e médias empresas. Sem template e sem agência no meio.",
    cta: "Chamar no WhatsApp",
    wa: "Oi Matheus, vi seu site e quero falar sobre um projeto.",
    servicosTitulo: "O que eu faço",
    servicos: [
      { titulo: "Sites", texto: "Rápidos, bons no celular e com um botão claro para o cliente te chamar." },
      { titulo: "Landing pages", texto: "Uma página com um objetivo só e a medição pronta para Google Ads." },
      { titulo: "Sistemas sob medida", texto: "Agendamento, orçamentos, painéis e faturamento quando o site não basta." },
    ],
    mercadosTitulo: "Onde está o seu negócio?",
    mercados: [
      { id: "br", nome: "Brasil", texto: "Sites e sistemas para empresas brasileiras.", wa: "Oi Matheus, vi seu site e quero falar sobre um projeto.", cta: "Chamar no WhatsApp" },
      { id: "es", nome: "Espanha", texto: "Sites e landing pages para empresas na Espanha.", rota: "/es/diseno-web", cta: "Ver serviços" },
      { id: "au", nome: "Austrália", texto: "Websites and custom systems for Australian businesses.", wa: "Hi Matheus, I saw your website and want to talk about a project.", cta: "Chamar no WhatsApp" },
    ],
    provaTitulo: "Trabalhos em produção",
    casos: [
      { etiqueta: "Site + CRM · Austrália", titulo: "Empresa de mudanças", texto: "Site novo publicado sem um minuto fora do ar e um CRM sob medida para orçamentos, serviços e faturamento.", alt: "Site público de uma empresa de mudanças australiana" },
      { etiqueta: "Sistema sob medida · Austrália", titulo: "Empresa de limpeza", texto: "Um sistema próprio que gera cerca de 160 faturas por mês para uns 80 clientes.", alt: "Painel de gestão de uma empresa de limpeza" },
    ],
    cv: "É recrutador?",
    cvLink: "Ver meu CV e experiência",
  },
  en: {
    titulo: "MW Dev | Websites and custom systems",
    descricao: "Websites, landing pages and custom systems for small businesses, built by the developer you talk to.",
    olho: "MW Dev · Matheus Wilberstaedt",
    h1: "Websites and custom systems, built by the developer you actually talk to.",
    sub: "Design, development, launch and support for small businesses. No templates and no agency in between.",
    cta: "Message on WhatsApp",
    wa: "Hi Matheus, I saw your website and want to talk about a project.",
    servicosTitulo: "What I build",
    servicos: [
      { titulo: "Websites", texto: "Fast, mobile-first and with a clear button for customers to get in touch." },
      { titulo: "Landing pages", texto: "One page, one goal, with conversion tracking ready for Google Ads." },
      { titulo: "Custom systems", texto: "Bookings, quotes, dashboards and invoicing when a website isn't enough." },
    ],
    mercadosTitulo: "Where is your business?",
    mercados: [
      { id: "au", nome: "Australia", texto: "Websites and custom systems for Australian businesses.", wa: "Hi Matheus, I saw your website and want to talk about a project.", cta: "Message on WhatsApp" },
      { id: "es", nome: "Spain", texto: "Websites and landing pages for businesses in Spain.", rota: "/es/diseno-web", cta: "See services" },
      { id: "br", nome: "Brazil", texto: "Sites e sistemas para empresas brasileiras.", wa: "Oi Matheus, vi seu site e quero falar sobre um projeto.", cta: "Message on WhatsApp" },
    ],
    provaTitulo: "Work in production",
    casos: [
      { etiqueta: "Website + CRM · Australia", titulo: "Moving company", texto: "A new website launched with zero downtime and a custom CRM for quotes, jobs and invoicing.", alt: "Public website of an Australian moving company" },
      { etiqueta: "Custom system · Australia", titulo: "Cleaning company", texto: "Its own system, generating about 160 invoices a month for around 80 clients.", alt: "Management dashboard of a cleaning company" },
    ],
    cv: "Recruiter?",
    cvLink: "See my CV and experience",
  },
};
