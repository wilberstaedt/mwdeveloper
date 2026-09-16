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
  /* Capitulo em ecra cheio: a fatura que se monta sozinha (16/09/2026). */
  fatura: {
    olho: string;
    titulo: string;
    legenda: string;
    linhas: { descricao: string; horas: string; valor: number }[];
    rotuloSubtotal: string;
    rotuloImposto: string;
    rotuloTotal: string;
    carimbo: string;
  };
  dicaScroll: string;
  /* Rotulo que diz que o capitulo e UM caso, nao o negocio todo (16/09). */
  rotuloCaso: string;
  /* Capitulo: do anuncio ao cliente no WhatsApp. */
  anuncio: {
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
  };
  /* O que da para construir, por familia. */
  capacidades: {
    olho: string;
    titulo: string;
    familias: { nome: string; itens: string[] }[];
    nota: string;
  };
  /* Como funciona trabalhar comigo. */
  processo: {
    olho: string;
    titulo: string;
    passos: { n: string; titulo: string; texto: string }[];
  };
  /* Capitulo em ecra cheio: a semana que se enche (16/09/2026). */
  agenda: {
    olho: string;
    titulo: string;
    legenda: string;
    dias: string[];
    rotuloHoras: string;
    rotuloServicos: string;
  };
  /* Historia presa ao scroll (16/09/2026): quatro atos, do codigo ao cliente. */
  historia: {
    olho: string;
    atos: { n: string; titulo: string; texto: string }[];
    fecho: string;
    cta: string;
  };
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
    rotuloCaso: "Caso real · empresa de limpieza en Australia",
    anuncio: {
      olho: "Del anuncio al cliente",
      titulo: "Alguien busca. Tú apareces.",
      legenda: "Campaña en Google Ads, landing con un solo objetivo y medición que sí funciona: cada clic acaba en un mensaje tuyo, no en una estadística vacía.",
      busca: "empresa de limpieza en Valencia",
      anuncioTitulo: "Limpieza profesional en Valencia",
      anuncioUrl: "tunegocio.es/limpieza",
      anuncioTexto: "Presupuesto en el día. Equipo propio y seguro.",
      campos: ["Nombre", "Teléfono", "¿Qué necesitas?"],
      botao: "Pedir presupuesto",
      mensagem: "Nuevo contacto: Marta, 3 habitaciones, Ruzafa",
    },
    capacidades: {
      olho: "Qué construyo",
      titulo: "Software a medida, para el negocio que sea.",
      familias: [
        { nome: "Webs y landings", itens: ["Web de empresa", "Landing para campañas", "Medición y consentimiento", "Textos y estructura"] },
        { nome: "Sistemas a medida", itens: ["Reservas y agenda", "Presupuestos en PDF", "Facturación con impuestos", "Panel financiero", "Portal de cliente", "Inventario y equipos"] },
        { nome: "Marketing que se mide", itens: ["Campañas de Google Ads", "Seguimiento de conversiones", "Informes claros", "Mejoras mes a mes"] },
        { nome: "Y después", itens: ["Publicación y dominio", "Soporte directo conmigo", "Cambios y mejoras", "Copias de seguridad"] },
      ],
      nota: "Si tu negocio no está en esta lista, probablemente también encaje: el trabajo es entender el problema y construirlo.",
    },
    processo: {
      olho: "Cómo funciona",
      titulo: "Hablamos, lo construyo, lo publicas.",
      passos: [
        { n: "01", titulo: "Una conversación", texto: "Me cuentas el problema por WhatsApp. Te digo si tiene solución y por dónde iría." },
        { n: "02", titulo: "Una propuesta clara", texto: "Alcance, plazo y precio por escrito, sin letra pequeña ni agencia de por medio." },
        { n: "03", titulo: "Lo construyo", texto: "Trabajo por partes y te lo enseño funcionando, no en presentaciones." },
        { n: "04", titulo: "Publicación y soporte", texto: "Lo pongo en producción, lo mido y sigo contigo después de la entrega." },
      ],
    },
    agenda: {
      olho: "La operación de una semana",
      titulo: "La semana se llena sola.",
      legenda: "Servicios, equipos y horas en una sola pantalla. Lo que antes eran llamadas y una hoja de cálculo.",
      dias: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      rotuloHoras: "Horas de equipo",
      rotuloServicos: "Servicios",
    },
    dicaScroll: "Baja para ver un sistema real",
    fatura: {
      olho: "Un sistema real, no una maqueta",
      titulo: "La factura se escribe sola.",
      legenda: "El sistema toma los servicios de la semana, calcula el impuesto y la envía al cliente. Nadie abre una hoja de cálculo.",
      linhas: [
        { descricao: "Limpieza semanal · 3 hab / 2 baños", horas: "3 h", valor: 150 },
        { descricao: "Limpieza de fin de contrato", horas: "11 h", valor: 734 },
        { descricao: "Horno y ventanas", horas: "1,5 h", valor: 75 },
      ],
      rotuloSubtotal: "Subtotal",
      rotuloImposto: "Impuesto (10%)",
      rotuloTotal: "Total",
      carimbo: "Enviada",
    },
    historia: {
      olho: "Cómo trabajo",
      atos: [
        { n: "01", titulo: "Del primer commit", texto: "Escribo el sistema entero, de la base de datos al botón. Sin plantillas y sin equipo intermediario." },
        { n: "02", titulo: "Al panel que usan cada día", texto: "Agenda, clientes y servicios en un solo sitio, con el trabajo real del negocio dentro." },
        { n: "03", titulo: "A la factura que sale sola", texto: "Presupuestos, facturas con IVA y cobros generados por el sistema, sin hojas de cálculo." },
        { n: "04", titulo: "Al cliente que paga", texto: "En producción 24/7, con soporte directo conmigo cuando algo hace falta." },
      ],
      fecho: "Esto no es una maqueta: son pantallas de sistemas que están funcionando hoy.",
      cta: "Quiero algo así",
    },
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
    rotuloCaso: "Caso real · empresa de limpeza na Austrália",
    anuncio: {
      olho: "Do anúncio ao cliente",
      titulo: "Alguém procura. Você aparece.",
      legenda: "Campanha no Google Ads, landing com um objetivo só e medição que funciona: cada clique termina numa mensagem sua, não num gráfico vazio.",
      busca: "empresa de limpeza em Valencia",
      anuncioTitulo: "Limpeza profissional em Valencia",
      anuncioUrl: "seunegocio.com/limpeza",
      anuncioTexto: "Orçamento no mesmo dia. Equipe própria e seguro.",
      campos: ["Nome", "Telefone", "O que você precisa?"],
      botao: "Pedir orçamento",
      mensagem: "Novo contato: Marta, 3 quartos, Ruzafa",
    },
    capacidades: {
      olho: "O que eu construo",
      titulo: "Software sob medida, para o negócio que for.",
      familias: [
        { nome: "Sites e landings", itens: ["Site da empresa", "Landing para campanha", "Medição e consentimento", "Texto e estrutura"] },
        { nome: "Sistemas sob medida", itens: ["Reservas e agenda", "Orçamento em PDF", "Faturamento com impostos", "Painel financeiro", "Portal do cliente", "Estoque e equipes"] },
        { nome: "Marketing que se mede", itens: ["Campanhas no Google Ads", "Rastreio de conversão", "Relatório claro", "Melhoria mês a mês"] },
        { nome: "E depois", itens: ["Publicação e domínio", "Suporte direto comigo", "Mudanças e melhorias", "Backup"] },
      ],
      nota: "Se o seu negócio não está nessa lista, provavelmente também cabe: o trabalho é entender o problema e construir.",
    },
    processo: {
      olho: "Como funciona",
      titulo: "A gente conversa, eu construo, você publica.",
      passos: [
        { n: "01", titulo: "Uma conversa", texto: "Você me conta o problema no WhatsApp. Eu digo se tem solução e por onde eu iria." },
        { n: "02", titulo: "Uma proposta clara", texto: "Escopo, prazo e preço por escrito, sem letra miúda e sem agência no meio." },
        { n: "03", titulo: "Eu construo", texto: "Trabalho por partes e te mostro funcionando, não em apresentação." },
        { n: "04", titulo: "Publicação e suporte", texto: "Ponho no ar, meço, e sigo com você depois da entrega." },
      ],
    },
    agenda: {
      olho: "A operação de uma semana",
      titulo: "A semana se enche sozinha.",
      legenda: "Serviços, equipes e horas numa tela só. O que antes era ligação e planilha.",
      dias: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      rotuloHoras: "Horas de equipe",
      rotuloServicos: "Serviços",
    },
    dicaScroll: "Desça para ver um sistema real",
    fatura: {
      olho: "Um sistema real, não uma maquete",
      titulo: "A fatura se escreve sozinha.",
      legenda: "O sistema pega os serviços da semana, calcula o imposto e envia para o cliente. Ninguém abre planilha.",
      linhas: [
        { descricao: "Limpeza semanal · 3 quartos / 2 banheiros", horas: "3 h", valor: 150 },
        { descricao: "Limpeza de fim de contrato", horas: "11 h", valor: 734 },
        { descricao: "Forno e janelas", horas: "1,5 h", valor: 75 },
      ],
      rotuloSubtotal: "Subtotal",
      rotuloImposto: "Imposto (10%)",
      rotuloTotal: "Total",
      carimbo: "Enviada",
    },
    historia: {
      olho: "Como eu trabalho",
      atos: [
        { n: "01", titulo: "Do primeiro commit", texto: "Escrevo o sistema inteiro, do banco de dados ao botão. Sem template e sem agência no meio." },
        { n: "02", titulo: "Ao painel usado todo dia", texto: "Agenda, clientes e serviços num lugar só, com a operação real da empresa dentro." },
        { n: "03", titulo: "À fatura que sai sozinha", texto: "Orçamento, fatura com imposto e cobrança gerados pelo sistema, sem planilha." },
        { n: "04", titulo: "Ao cliente que paga", texto: "No ar 24 horas, com suporte direto comigo quando precisa." },
      ],
      fecho: "Isso não é maquete: são telas de sistemas rodando hoje.",
      cta: "Quero algo assim",
    },
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
    rotuloCaso: "Real case · cleaning company in Australia",
    anuncio: {
      olho: "From the ad to the client",
      titulo: "Someone searches. You show up.",
      legenda: "A Google Ads campaign, a landing page with one job, and measurement that actually works: every click ends in a message to you, not in an empty chart.",
      busca: "cleaning company in Valencia",
      anuncioTitulo: "Professional cleaning in Valencia",
      anuncioUrl: "yourbusiness.com/cleaning",
      anuncioTexto: "Same-day quote. Own crew, fully insured.",
      campos: ["Name", "Phone", "What do you need?"],
      botao: "Ask for a quote",
      mensagem: "New enquiry: Marta, 3 bedrooms, Ruzafa",
    },
    capacidades: {
      olho: "What I build",
      titulo: "Custom software, for whatever the business is.",
      familias: [
        { nome: "Websites and landings", itens: ["Company website", "Campaign landing page", "Measurement and consent", "Copy and structure"] },
        { nome: "Custom systems", itens: ["Bookings and schedule", "Quotes as PDF", "Invoicing with tax", "Finance dashboard", "Client portal", "Stock and crews"] },
        { nome: "Marketing you can measure", itens: ["Google Ads campaigns", "Conversion tracking", "Reports in plain words", "Month by month tuning"] },
        { nome: "And after that", itens: ["Launch and domain", "Support straight from me", "Changes and improvements", "Backups"] },
      ],
      nota: "If your business is not on this list, it probably still fits: the work is understanding the problem and building it.",
    },
    processo: {
      olho: "How it works",
      titulo: "We talk, I build it, you launch.",
      passos: [
        { n: "01", titulo: "One conversation", texto: "You tell me the problem on WhatsApp. I tell you whether it has a solution and how I would approach it." },
        { n: "02", titulo: "A clear proposal", texto: "Scope, timeline and price in writing, no small print and no agency in between." },
        { n: "03", titulo: "I build it", texto: "I work in parts and show it running, not in slides." },
        { n: "04", titulo: "Launch and support", texto: "I put it live, measure it, and stay with you after delivery." },
      ],
    },
    agenda: {
      olho: "One week of operations",
      titulo: "The week fills itself.",
      legenda: "Jobs, crews and hours on a single screen. What used to be phone calls and a spreadsheet.",
      dias: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      rotuloHoras: "Crew hours",
      rotuloServicos: "Jobs",
    },
    dicaScroll: "Scroll to see a real system",
    fatura: {
      olho: "A real system, not a mockup",
      titulo: "The invoice writes itself.",
      legenda: "The system picks up the week's jobs, works out the tax and sends it to the client. Nobody opens a spreadsheet.",
      linhas: [
        { descricao: "Weekly clean · 3 bed / 2 bath", horas: "3 h", valor: 150 },
        { descricao: "End of lease clean", horas: "11 h", valor: 734 },
        { descricao: "Oven and windows", horas: "1.5 h", valor: 75 },
      ],
      rotuloSubtotal: "Subtotal",
      rotuloImposto: "Tax (10%)",
      rotuloTotal: "Total",
      carimbo: "Sent",
    },
    historia: {
      olho: "How I work",
      atos: [
        { n: "01", titulo: "From the first commit", texto: "I write the whole system, from the database to the button. No templates, no agency in between." },
        { n: "02", titulo: "To the panel used every day", texto: "Schedule, clients and jobs in one place, with the real operation inside it." },
        { n: "03", titulo: "To the invoice that sends itself", texto: "Quotes, invoices with tax and payments generated by the system, with no spreadsheets." },
        { n: "04", titulo: "To the paying customer", texto: "Live 24/7, with support straight from me when something is needed." },
      ],
      fecho: "This is not a mockup: these are screens from systems running today.",
      cta: "I want something like this",
    },
  },
};
