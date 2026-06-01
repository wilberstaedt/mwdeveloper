export type ProjectStatus = "live" | "in-development" | "personal" | "planning";

export type ProjectId =
  | "sistemaCleaning"
  | "fourhub"
  | "removalistSite"
  | "mwflow"
  | "maestri"
  | "imagemEAcao"
  | "jarvis";

export interface Project {
  id: ProjectId;
  status: ProjectStatus;
  year: string;
  stack: string[];
  href?: string;
  featured?: boolean;
  hasMetric?: boolean;
}

export const projects: Project[] = [
  {
    id: "sistemaCleaning",
    status: "live",
    year: "2026",
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
    href: "/cleaning-system",
    featured: true,
    hasMetric: true,
  },
  {
    id: "fourhub",
    status: "in-development",
    year: "2025 — 2026",
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
    href: "https://fourhub.com.br",
    hasMetric: true,
  },
  {
    id: "removalistSite",
    status: "live",
    year: "2026",
    stack: [
      "React 18",
      "Vite",
      "TypeScript",
      "PHP",
      "SendGrid",
      "Apache",
      "FTP deploy",
    ],
    hasMetric: true,
  },
  {
    id: "mwflow",
    status: "personal",
    year: "2026",
    stack: [
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Cloudflare Tunnel",
    ],
    href: "/flow",
  },
  {
    id: "maestri",
    status: "personal",
    year: "2026",
    stack: ["Claude Code", "Node.js", "Obsidian", "Telegram Bot API"],
  },
  {
    id: "imagemEAcao",
    status: "personal",
    year: "2026",
    stack: ["React 19", "Vite", "TypeScript", "Express", "Prisma", "SQLite", "Playwright"],
  },
  {
    id: "jarvis",
    status: "personal",
    year: "2026",
    stack: [
      "React 19",
      "Vite",
      "TypeScript",
      "react-force-graph",
      "Web Speech",
      "WebAuthn",
      "PWA",
    ],
  },
];
