export type ProjectStatus = "live" | "in-development" | "personal" | "planning";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  year: string;
  role: string;
  stack: string[];
  highlights: string[];
  href?: string;
  featured?: boolean;
  metric?: { label: string; value: string };
}

export const projects: Project[] = [
  {
    id: "sistema-cleaning",
    name: "Sistema Cleaning",
    tagline: "SaaS white-label rodando na Austrália.",
    description:
      "Plataforma completa de gestão para empresas de limpeza. Admin, cleaner e cliente veem tudo no mesmo lugar — com a marca da empresa. Primeira cliente: GlowArt, em Brisbane.",
    status: "live",
    statusLabel: "Live em produção",
    year: "2026",
    role: "Dev solo · Do 1º commit ao deploy",
    stack: [
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "JWT",
      "Resend",
    ],
    highlights: [
      "3 portais (admin, cleaner, cliente) — mobile-first",
      "80+ endpoints, 237+ testes, audit logs em toda mutação",
      "Invoice em PDF, chat em tempo quase real, i18n EN/PT-BR",
      "Deploy em VPS próprio com Docker Compose + Caddy",
    ],
    href: "https://glowartcleaning.com.au",
    featured: true,
    metric: { label: "Empresa cliente", value: "GlowArt · Brisbane" },
  },
  {
    id: "fourhub",
    name: "FourHub",
    tagline: "Marketplace de veículos mobile-first.",
    description:
      "App que conecta pessoas físicas que querem vender carro com lojistas verificados. PF não define preço — só recebe ofertas reais. Foco inicial em Santa Catarina.",
    status: "in-development",
    statusLabel: "Em desenvolvimento · Launch set/2026",
    year: "2025 — 2026",
    role: "Dev solo · CTO · 3 sócios comerciais",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "AWS EC2",
      "Push Notifications",
    ],
    highlights: [
      "App iOS em TestFlight com fluxo completo",
      "22 models Prisma · 11 grupos de rotas",
      "Admin com audit log, beta allowlist, bid com trade-in",
      "Landing pública + painel web para lojistas",
    ],
    metric: { label: "Mercado alvo", value: "Santa Catarina · BR" },
  },
  {
    id: "segundo-cerebro",
    name: "Segundo Cérebro",
    tagline: "Sistema pessoal de memória persistente para o Claude Code.",
    description:
      "Vault em Obsidian integrado ao Claude Code. Mantém contexto dos meus projetos entre sessões — decisões, aprendizados, pipeline. Âncora pra não perder o fio durante a mudança de país.",
    status: "personal",
    statusLabel: "Projeto pessoal · Em uso",
    year: "2026",
    role: "Builder e usuário",
    stack: ["Obsidian", "Claude Code", "Markdown", "YAML"],
    highlights: [
      "8 slash commands customizados",
      "Decisions · Learnings · Sessions versionados em git",
      "Brain-inbox que processa trabalho remoto do celular",
    ],
  },
];
