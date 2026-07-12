export type CaseKey = "cleaning" | "pipeline" | "moving" | "fourhub" | "lumen";

export interface CaseImage {
  src: string;
  /** Descriptive English alt text (screenshots are the same in every locale). */
  alt: string;
}

export interface WorkCase {
  key: CaseKey;
  /** Non-translatable tech stack, rendered as mono chips. */
  stack: string[];
  /** Short URL shown in the browser-frame chrome (fake/anonymized when needed). */
  frameUrl?: string;
  image?: CaseImage;
  /** Optional second screenshot layered behind the main one (large screens only). */
  imageSecondary?: CaseImage;
  /** External production link — only where a public URL exists. */
  href?: string;
}

/**
 * Non-translatable half of the Selected Work cases. All copy (problem / built /
 * outcome) lives in i18n under `p.work.cases.*` keyed by `key`.
 */
export const workCases: WorkCase[] = [
  {
    key: "cleaning",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Caddy",
    ],
    frameUrl: "sistemacleaning.app/schedule",
    image: {
      src: "/work/cleaning-schedule.png",
      alt: "Sistema Cleaning admin portal showing the weekly job scheduling calendar with cleaners assigned to jobs",
    },
    imageSecondary: {
      src: "/work/cleaning-dashboard.png",
      alt: "Sistema Cleaning admin dashboard with revenue, jobs and invoicing metrics",
    },
  },
  {
    key: "pipeline",
    stack: ["Node.js", "Amazon Bedrock", "AWS S3"],
  },
  {
    key: "moving",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    frameUrl: "sambaremoval.com.au",
    image: {
      src: "/work/samba-site.png",
      alt: "Public website of an Australian moving company with hero section and quote call to action",
    },
    href: "https://sambaremoval.com.au",
  },
  {
    key: "fourhub",
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "AWS EC2"],
    frameUrl: "fourhub.com.br",
    image: {
      src: "/work/fourhub-landing.png",
      alt: "FourHub landing page introducing the mobile marketplace for car owners and verified shops",
    },
    href: "https://fourhub.com.br",
  },
  {
    key: "lumen",
    stack: ["React", "Three.js", "WebSockets", "Claude API"],
  },
];
