import type { LucideIcon } from "lucide-react";
import { Boxes, Smartphone, Layers, Compass } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  stack: string[];
  meta: string;
}

export const services: Service[] = [
  {
    id: "saas",
    title: "SaaS & Web Apps do zero",
    description:
      "Produto inteiro: back-end, front-end, banco, deploy. Do primeiro commit até cliente pagante usando.",
    icon: Boxes,
    stack: ["React", "Node.js", "PostgreSQL", "Docker"],
    meta: "01",
  },
  {
    id: "mobile",
    title: "Apps Mobile iOS & Android",
    description:
      "Apps nativos com React Native / Expo. Push notifications, auth, fluxos reais que vão pra loja.",
    icon: Smartphone,
    stack: ["React Native", "Expo", "TypeScript"],
    meta: "02",
  },
  {
    id: "white-label",
    title: "SaaS White-Label",
    description:
      "Sistema de gestão pronto pra operar com a marca da sua empresa. Mesma base, sua identidade, sua operação.",
    icon: Layers,
    stack: ["Multi-tenant", "Tema custom", "i18n"],
    meta: "03",
  },
  {
    id: "consulting",
    title: "Consultoria & Product Review",
    description:
      "Audit técnico, decisões de arquitetura, desbloqueio de dev. Quando você precisa de um segundo par de olhos sério.",
    icon: Compass,
    stack: ["Audit", "Arquitetura", "Code review"],
    meta: "04",
  },
];
