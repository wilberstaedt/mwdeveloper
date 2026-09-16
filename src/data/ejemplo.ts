/**
 * TEXTOS DA LANDING DE EXEMPLO (16/09/2026).
 *
 * A página `/ejemplo/limpieza` corre dentro do MacBook e do iPhone da home. O
 * Matheus mudou a home para inglês e reparou no óbvio: a peça lá dentro
 * continuava em espanhol. Agora segue a língua do site.
 *
 * "Nítida" é um nome INVENTADO e mantém-se igual nas três línguas, como uma
 * marca real se manteria. Continua sem avaliações, sem preços e sem marca de
 * ninguém — o aviso do topo diz que a empresa é fictícia em todas elas.
 */

export type LinguaExemplo = "es" | "pt-BR" | "en";

export interface ExemploTexto {
  aviso: string;
  nav: string[];
  ctaCurto: string;
  heroOlho: string;
  heroH1: string;
  heroSub: string;
  heroCta: string;
  heroCta2: string;
  heroChecks: string[];
  formSelo: string;
  formTitulo: string;
  formSub: string;
  formCampos: string[];
  formPergunta: string;
  formOpcoes: string[];
  formBotao: string;
  formNota: string;
  garantias: { t: string; d: string }[];
  servicosTitulo: string;
  servicos: { nome: string; texto: string; itens: string[] }[];
  bandaLegenda: string;
  bandaAlt: string;
  cozinhaAlt: string;
  passosOlho: string;
  passosTitulo: string;
  passos: { t: string; d: string }[];
  perguntasTitulo: string;
  perguntas: { p: string; r: string }[];
  fechoTitulo: string;
  fechoSub: string;
  rodape: string;
  titulo: string;
}

export const EXEMPLO: Record<LinguaExemplo, ExemploTexto> = {
  es: {
    titulo: "Nítida · ejemplo de landing para empresa de limpieza",
    aviso: "Página de ejemplo · empresa ficticia creada para mostrar un trabajo de MW Dev",
    nav: ["Servicios", "Cómo funciona", "Preguntas"],
    ctaCurto: "Pedir presupuesto",
    heroOlho: "Hogares y oficinas",
    heroH1: "Tu casa impecable sin tener que estar encima.",
    heroSub:
      "Equipo propio, asegurado y siempre el mismo en tu domicilio. Presupuesto cerrado antes de empezar y sin permanencia.",
    heroCta: "Pedir presupuesto",
    heroCta2: "Ver servicios",
    heroChecks: [
      "Personal propio, dado de alta y asegurado",
      "Productos incluidos en el precio",
      "Sin permanencia: reservas cuando te hace falta",
    ],
    formSelo: "Sin compromiso",
    formTitulo: "Presupuesto en el día",
    formSub: "Rellena tres datos y te llamamos con el precio cerrado.",
    formCampos: ["Nombre", "Teléfono", "Ciudad o código postal"],
    formPergunta: "¿Qué necesitas?",
    formOpcoes: ["Hogar", "Oficina", "A fondo"],
    formBotao: "Quiero mi presupuesto",
    formNota: "Respondemos en el mismo día laborable.",
    garantias: [
      { t: "Personal propio", d: "Dado de alta y asegurado. Nada de subcontratas." },
      { t: "Puntualidad", d: "Si el equipo se retrasa, te avisamos antes de la hora." },
      { t: "Sin permanencia", d: "Reservas cuando te hace falta y paras cuando quieras." },
    ],
    servicosTitulo: "Qué limpiamos",
    servicos: [
      {
        nome: "Limpieza del hogar",
        texto: "Semanal, quincenal o puntual. Siempre el mismo equipo, que ya sabe cómo te gusta tu casa.",
        itens: ["Cocina y baños a fondo", "Cambio de sábanas", "Productos incluidos"],
      },
      {
        nome: "Oficinas y locales",
        texto: "Fuera del horario de trabajo, con parte de servicio firmado en cada visita.",
        itens: ["Antes de abrir o al cerrar", "Parte firmado por visita", "Factura mensual"],
      },
      {
        nome: "Limpieza a fondo",
        texto: "Mudanzas, fin de alquiler y después de obra, para entregar la casa como nueva.",
        itens: ["Electrodomésticos por dentro", "Cristales y persianas", "Juntas y cal"],
      },
    ],
    bandaLegenda: "Así queda un salón después de una visita nuestra",
    bandaAlt: "Salón luminoso y recogido después de una limpieza",
    cozinhaAlt: "Encimera de cocina impecable a contraluz",
    passosOlho: "Tres pasos",
    passosTitulo: "Cómo funciona",
    passos: [
      { t: "Cuéntanos tu casa", d: "Metros, habitaciones y cada cuánto la quieres limpia. Dos minutos y sin registrarte." },
      { t: "Recibes el presupuesto", d: "Cerrado y por escrito el mismo día. Sin visita comercial y sin letra pequeña." },
      { t: "Reservas el día", d: "Confirmamos por mensaje y te avisamos cuando el equipo sale hacia tu casa." },
    ],
    perguntasTitulo: "Preguntas frecuentes",
    perguntas: [
      { p: "¿Tengo que estar en casa?", r: "No hace falta. Muchos clientes nos dejan llave o código, y te avisamos al entrar y al salir." },
      { p: "¿Traéis los productos?", r: "Sí, van incluidos. Si prefieres que usemos los tuyos por alergias o superficies delicadas, también." },
      { p: "¿Puedo cambiar el día?", r: "Sí, avisando con 24 horas reorganizamos el equipo sin coste." },
    ],
    fechoTitulo: "¿Limpiamos en tu zona?",
    fechoSub:
      "Escríbenos tu código postal y te decimos el mismo día si tenemos equipo disponible y cuánto costaría.",
    rodape: "Ejemplo de landing page · no es una empresa real",
  },

  "pt-BR": {
    titulo: "Nítida · exemplo de landing para empresa de limpeza",
    aviso: "Página de exemplo · empresa fictícia criada para mostrar um trabalho da MW Dev",
    nav: ["Serviços", "Como funciona", "Perguntas"],
    ctaCurto: "Pedir orçamento",
    heroOlho: "Casas e escritórios",
    heroH1: "Sua casa impecável sem você precisar ficar em cima.",
    heroSub:
      "Equipe própria, registrada e sempre a mesma na sua casa. Orçamento fechado antes de começar e sem fidelidade.",
    heroCta: "Pedir orçamento",
    heroCta2: "Ver serviços",
    heroChecks: [
      "Equipe própria, registrada e com seguro",
      "Produtos inclusos no preço",
      "Sem fidelidade: você agenda quando precisa",
    ],
    formSelo: "Sem compromisso",
    formTitulo: "Orçamento no mesmo dia",
    formSub: "Preencha três dados e a gente liga com o preço fechado.",
    formCampos: ["Nome", "Telefone", "Cidade ou CEP"],
    formPergunta: "Do que você precisa?",
    formOpcoes: ["Casa", "Escritório", "Pesada"],
    formBotao: "Quero meu orçamento",
    formNota: "Respondemos no mesmo dia útil.",
    garantias: [
      { t: "Equipe própria", d: "Registrada e com seguro. Nada de terceirizar." },
      { t: "Pontualidade", d: "Se a equipe atrasar, a gente avisa antes da hora." },
      { t: "Sem fidelidade", d: "Você agenda quando precisa e para quando quiser." },
    ],
    servicosTitulo: "O que a gente limpa",
    servicos: [
      {
        nome: "Limpeza da casa",
        texto: "Semanal, quinzenal ou avulsa. Sempre a mesma equipe, que já sabe como você gosta.",
        itens: ["Cozinha e banheiros a fundo", "Troca de roupa de cama", "Produtos inclusos"],
      },
      {
        nome: "Escritórios e lojas",
        texto: "Fora do horário de trabalho, com ficha de serviço assinada em cada visita.",
        itens: ["Antes de abrir ou ao fechar", "Ficha assinada por visita", "Nota fiscal mensal"],
      },
      {
        nome: "Limpeza pesada",
        texto: "Mudança, fim de contrato e pós-obra, para entregar a casa como nova.",
        itens: ["Eletrodomésticos por dentro", "Vidros e persianas", "Rejuntes e calcário"],
      },
    ],
    bandaLegenda: "É assim que fica uma sala depois de uma visita nossa",
    bandaAlt: "Sala clara e arrumada depois de uma limpeza",
    cozinhaAlt: "Bancada de cozinha impecável em contraluz",
    passosOlho: "Três passos",
    passosTitulo: "Como funciona",
    passos: [
      { t: "Conta pra gente", d: "Metragem, cômodos e de quanto em quanto tempo. Dois minutos e sem cadastro." },
      { t: "Recebe o orçamento", d: "Fechado e por escrito no mesmo dia. Sem visita de vendedor e sem letra miúda." },
      { t: "Agenda o dia", d: "Confirmamos por mensagem e avisamos quando a equipe sai para a sua casa." },
    ],
    perguntasTitulo: "Perguntas frequentes",
    perguntas: [
      { p: "Preciso estar em casa?", r: "Não precisa. Muitos clientes deixam chave ou senha, e a gente avisa na entrada e na saída." },
      { p: "Vocês levam os produtos?", r: "Sim, já vão inclusos. Se preferir que a gente use os seus, por alergia ou superfície delicada, também dá." },
      { p: "Posso mudar o dia?", r: "Pode. Avisando com 24 horas a gente reorganiza a equipe sem custo." },
    ],
    fechoTitulo: "A gente atende na sua região?",
    fechoSub: "Manda o seu CEP e a gente diz no mesmo dia se tem equipe disponível e quanto custaria.",
    rodape: "Exemplo de landing page · não é uma empresa real",
  },

  en: {
    titulo: "Nítida · example landing page for a cleaning company",
    aviso: "Example page · fictional company built to show MW Dev's work",
    nav: ["Services", "How it works", "FAQ"],
    ctaCurto: "Get a quote",
    heroOlho: "Homes and offices",
    heroH1: "A spotless home without having to chase anyone.",
    heroSub:
      "Our own staff, insured, and always the same team in your home. A fixed quote before we start, and no lock-in.",
    heroCta: "Get a quote",
    heroCta2: "See services",
    heroChecks: [
      "Our own staff, employed and insured",
      "Products included in the price",
      "No lock-in: book whenever you need it",
    ],
    formSelo: "No obligation",
    formTitulo: "A quote the same day",
    formSub: "Fill in three details and we'll call you with a fixed price.",
    formCampos: ["Name", "Phone", "Suburb or postcode"],
    formPergunta: "What do you need?",
    formOpcoes: ["Home", "Office", "Deep clean"],
    formBotao: "Send me the quote",
    formNota: "We reply the same business day.",
    garantias: [
      { t: "Our own team", d: "Employed and insured. No subcontractors." },
      { t: "On time", d: "If the team is running late, we tell you before the hour." },
      { t: "No lock-in", d: "Book when you need it and stop whenever you want." },
    ],
    servicosTitulo: "What we clean",
    servicos: [
      {
        nome: "Home cleaning",
        texto: "Weekly, fortnightly or one-off. Always the same team, who already know how you like it.",
        itens: ["Kitchen and bathrooms in depth", "Bed linen changed", "Products included"],
      },
      {
        nome: "Offices and shops",
        texto: "Outside working hours, with a signed service sheet on every visit.",
        itens: ["Before opening or after closing", "Signed sheet per visit", "Monthly invoice"],
      },
      {
        nome: "Deep clean",
        texto: "Moving out, end of lease and after building work, to hand the place back like new.",
        itens: ["Inside the appliances", "Windows and blinds", "Grout and limescale"],
      },
    ],
    bandaLegenda: "This is how a living room looks after one of our visits",
    bandaAlt: "Bright, tidy living room after a clean",
    cozinhaAlt: "Spotless kitchen benchtop backlit by daylight",
    passosOlho: "Three steps",
    passosTitulo: "How it works",
    passos: [
      { t: "Tell us about the place", d: "Size, rooms and how often you want it cleaned. Two minutes, no sign-up." },
      { t: "Get the quote", d: "Fixed and in writing the same day. No sales visit and no fine print." },
      { t: "Book the day", d: "We confirm by message and tell you when the team is on the way." },
    ],
    perguntasTitulo: "Frequently asked questions",
    perguntas: [
      { p: "Do I need to be home?", r: "You don't. Many clients leave us a key or a code, and we message you on arrival and on the way out." },
      { p: "Do you bring the products?", r: "Yes, they're included. If you'd rather we used yours, for allergies or delicate surfaces, that works too." },
      { p: "Can I change the day?", r: "Yes. With 24 hours' notice we move the team at no cost." },
    ],
    fechoTitulo: "Do we clean in your area?",
    fechoSub: "Send us your postcode and we'll tell you the same day if we have a team free and what it would cost.",
    rodape: "Example landing page · not a real company",
  },
};

export function linguaExemplo(l: string | undefined | null): LinguaExemplo {
  if (l?.startsWith("es")) return "es";
  if (l?.startsWith("pt")) return "pt-BR";
  return "en";
}
