import type { LucideIcon } from "lucide-react";
import { Boxes, Smartphone, Layers, Compass } from "lucide-react";

export interface Service {
  id: "saas" | "mobile" | "whiteLabel" | "consulting";
  icon: LucideIcon;
  stack: string[];
  meta: string;
}

export const services: Service[] = [
  {
    id: "saas",
    icon: Boxes,
    stack: ["React", "Node.js", "PostgreSQL", "Docker"],
    meta: "01",
  },
  {
    id: "mobile",
    icon: Smartphone,
    stack: ["React Native", "Expo", "TypeScript"],
    meta: "02",
  },
  {
    id: "whiteLabel",
    icon: Layers,
    stack: ["Multi-tenant", "Theming", "i18n"],
    meta: "03",
  },
  {
    id: "consulting",
    icon: Compass,
    stack: ["Audit", "Architecture", "Code review"],
    meta: "04",
  },
];
