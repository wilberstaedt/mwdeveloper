export interface StackGroup {
  label: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    label: "Frontend",
    items: [
      "React",
      "React Native",
      "Expo",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "TanStack Query",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Zod",
      "JWT",
    ],
  },
  {
    label: "Infra & DevOps",
    items: [
      "Docker",
      "AWS EC2",
      "Hostinger VPS",
      "Caddy",
      "GitHub Actions",
      "Vercel",
    ],
  },
  {
    label: "Tooling & Ops",
    items: [
      "Claude Code",
      "VS Code",
      "DBeaver",
      "Postman",
      "Obsidian",
      "Figma",
    ],
  },
];
