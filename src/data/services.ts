import type { LucideIcon } from "lucide-react";
import { Boxes, Smartphone, Layers, Compass, Globe } from "lucide-react";

export interface Service {
  id: "saas" | "mobile" | "whiteLabel" | "consulting" | "portfolio";
  icon: LucideIcon;
  stack: string[];
  meta: string;
  /** When true, render the priceFrom badge using i18n key services.items.<id>.priceFrom */
  hasPrice?: boolean;
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
    id: "portfolio",
    icon: Globe,
    stack: ["React", "Vite", "Tailwind", "i18n", "SendGrid"],
    meta: "04",
    hasPrice: true,
  },
  {
    id: "consulting",
    icon: Compass,
    stack: ["Audit", "Architecture", "Code review"],
    meta: "05",
  },
];
