export type ProjectStatus = "live" | "in-development" | "personal" | "planning";

export type ProjectId = "sistemaCleaning" | "fourhub" | "maestri";

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
    href: "https://glowartcleaning.com.au",
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
    hasMetric: true,
  },
  {
    id: "maestri",
    status: "personal",
    year: "2026",
    stack: ["Claude Code", "Node.js", "Obsidian", "Telegram Bot API"],
  },
];
