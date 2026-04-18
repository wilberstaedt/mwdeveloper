export type StackGroupId = "frontend" | "backend" | "infra" | "tooling";

export interface StackGroup {
  id: StackGroupId;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    id: "frontend",
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
    id: "backend",
    items: ["Node.js", "Express", "Fastify", "Prisma", "PostgreSQL", "Zod", "JWT"],
  },
  {
    id: "infra",
    items: ["Docker", "AWS EC2", "Hostinger VPS", "Caddy", "GitHub Actions", "Vercel"],
  },
  {
    id: "tooling",
    items: ["Claude Code", "VS Code", "DBeaver", "Postman", "Obsidian", "Figma"],
  },
];
