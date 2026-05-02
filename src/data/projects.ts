export type ProjectStatus = "live" | "in-development" | "personal" | "planning";

export type ProjectId = "sistemaCleaning" | "fourhub" | "agendaCheia" | "mwflow" | "maestri";

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
    id: "agendaCheia",
    status: "live",
    year: "2026",
    stack: [
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind 4",
      "shadcn/ui",
      "Vercel Serverless",
      "Supabase",
      "Resend",
    ],
    href: "https://agendacheia.mwdeveloper.tech",
    hasMetric: false,
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
    href: "https://flow.mwdeveloper.tech",
  },
  {
    id: "maestri",
    status: "personal",
    year: "2026",
    stack: ["Claude Code", "Node.js", "Obsidian", "Telegram Bot API"],
  },
];
