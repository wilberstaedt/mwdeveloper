// Corpus for the "ask" feature. Every fact is a standalone rewording of copy
// that already exists in the `p.*` namespace of src/i18n/locales/en.json —
// no new claims, no new numbers. That constraint is what makes the feature
// hallucination-proof: answers are always retrieved, never generated.

export interface AskFact {
  id: string;
  text: string;
  source: string;
  /**
   * Optional question paraphrases embedded alongside the fact text — they
   * pull question-shaped queries toward the right fact (the answer is always
   * `text`; these are retrieval hints, never shown).
   */
  queries?: string[];
}

export const facts: AskFact[] = [
  // ── Hero / positioning ────────────────────────────────────────────────
  {
    id: "role-stack",
    text: "Matheus Wilberstaedt is a full-stack engineer working with Node.js, React, TypeScript and AWS.",
    source: "Hero · Role",
    queries: ["What is Matheus's tech stack? What technologies does he work with?"],
  },
  {
    id: "positioning",
    text: "Matheus ships production SaaS end-to-end: from architecture to paying customers, amplified by AI-driven development.",
    source: "Hero · Positioning",
  },
  {
    id: "years-experience",
    text: "Matheus has 7+ years of experience building software. He is a product engineer, not a single-layer dev.",
    source: "Hero · Experience",
    queries: ["How many years of experience does Matheus have?", "How long has he been building software?"],
  },
  {
    id: "open-eu-remote",
    text: "Matheus is open to remote roles with EU teams and is looking for a remote EU team where an engineer who ships end-to-end is useful.",
    source: "Hero · Availability",
    queries: ["Is Matheus available for remote roles? Is he open to work?"],
  },
  {
    id: "location-timezone",
    text: "Matheus is based in Oropesa del Mar, in the Castellón province of Spain, on the CET timezone (UTC+1).",
    source: "About · Quick facts",
    queries: ["Where does Matheus live?", "Where is he based? What timezone is he in?"],
  },
  {
    id: "work-authorization",
    text: "Matheus is authorized to work in Spain.",
    source: "About · Work rights",
    queries: ["Can he legally work in Spain? Does he have work authorization?"],
  },

  // ── Proof numbers ─────────────────────────────────────────────────────
  {
    id: "proof-invoices",
    text: "Around 160 invoices are automated every month by software Matheus built and operates.",
    source: "Proof · Numbers",
  },
  {
    id: "proof-users",
    text: "An app Matheus built has about 10,000 members using it.",
    source: "Proof · Numbers",
  },
  {
    id: "proof-customers",
    text: "Matheus has 2 paying customers for his own products, and 4 products in production overall.",
    source: "Proof · Numbers",
    queries: ["Does he have paying customers? How many products does he run?"],
  },

  // ── Case: Sistema Cleaning ────────────────────────────────────────────
  {
    id: "cleaning-problem",
    text: "Sistema Cleaning is Matheus's founder product: a Brisbane-based cleaning company was running jobs, staff and invoicing on spreadsheets, WhatsApp and paper, and he replaced that with a SaaS.",
    source: "Work · Sistema Cleaning",
  },
  {
    id: "cleaning-built",
    text: "For Sistema Cleaning, Matheus built a multi-tenant, white-label SaaS with scheduling, staff management, timezone-aware recurring billing, an auditable invoice state machine, role-based access and audit logs — designed, built, deployed and operated by him alone.",
    source: "Work · Sistema Cleaning",
  },
  {
    id: "cleaning-outcome",
    text: "Sistema Cleaning is live in production 24/7 with a paying customer, generating around 160 invoices automatically every month for about 80 recurring clients.",
    source: "Work · Sistema Cleaning",
  },

  // ── Case: AI document pipeline ────────────────────────────────────────
  {
    id: "ai-pipeline-built",
    text: "Matheus led the build of an AI document-processing pipeline on Amazon Bedrock and Node.js that reads and validates thousands of purchase invoices automatically for a nationwide reseller network.",
    source: "Work · AI document pipeline",
  },
  {
    id: "ai-pipeline-outcome",
    text: "The AI invoice pipeline Matheus built was born in an internal hackathon, was hardened into a production service, and is still in production today, years later and beyond the end of his contract. The delivery earned him a promotion to senior in about 3 months.",
    source: "Work · AI document pipeline",
  },

  // ── Case: moving-company platform ─────────────────────────────────────
  {
    id: "moving-built",
    text: "For an Australian moving company, Matheus rewrote a slow WordPress site in React with a one-second production cutover and zero downtime, and is building a custom CRM handling quotes, jobs and Australian-market invoicing.",
    source: "Work · Moving-company platform",
  },
  {
    id: "moving-outcome",
    text: "The moving-company site has been live in production since June 2026; the CRM is in active development. It is the second paying customer of Matheus's studio.",
    source: "Work · Moving-company platform",
  },

  // ── Case: FourHub ─────────────────────────────────────────────────────
  {
    id: "fourhub-built",
    text: "FourHub is a mobile marketplace Matheus is building that connects car owners in Brazil with verified shops: React Native and Expo apps, a Node.js backend on AWS, push notifications and in-app negotiation.",
    source: "Work · FourHub",
  },
  {
    id: "fourhub-status",
    text: "FourHub is in development with launch planned for 2026, built alongside three partners.",
    source: "Work · FourHub",
  },

  // ── Case: Lúmen ───────────────────────────────────────────────────────
  {
    id: "lumen-built",
    text: "Lúmen is Matheus's AI operations partner: a persistent second brain with voice, a live 3D knowledge graph and multi-agent chat, wired into every project he runs.",
    source: "Work · Lúmen",
  },
  {
    id: "lumen-daily",
    text: "Lúmen plans, reviews and ships with Matheus daily — it even helped build his portfolio site.",
    source: "Work · Lúmen",
  },

  // ── Experience: MW Developer ──────────────────────────────────────────
  {
    id: "mwdev-role",
    text: "Since November 2025, Matheus is Founder and Full-Stack Engineer at MW Developer, his own studio, working remotely from Australia and then Spain.",
    source: "Experience · MW Developer",
    queries: ["Where does Matheus work now? What is his current job?"],
  },
  {
    id: "mwdev-ops",
    text: "At MW Developer, Matheus runs production solo, 24/7, with no dedicated DevOps: Docker, Caddy, VPS and AWS, staging cloned from production, and CI with GitHub Actions.",
    source: "Experience · MW Developer",
  },
  {
    id: "mwdev-customers",
    text: "MW Developer has two paying customers with full ownership from first commit to support, amplified by an AI-augmented, multi-agent development workflow.",
    source: "Experience · MW Developer",
  },

  // ── Experience: Essentia Group ────────────────────────────────────────
  {
    id: "essentia-role",
    text: "Matheus was a Senior Full-Stack Engineer at Essentia Group from June 2023 to March 2026, working for a Brazilian company remotely from Australia.",
    source: "Experience · Essentia Group",
  },
  {
    id: "essentia-migration",
    text: "At Essentia Group, Matheus drove the stack migration from Magento and PHP to Node.js, React and TypeScript, which became the base for all new internal products.",
    source: "Experience · Essentia Group",
  },
  {
    id: "essentia-async",
    text: "At Essentia Group, Matheus worked about 18 months as the sole remote developer across a 12-hour timezone gap, fully asynchronous.",
    source: "Experience · Essentia Group",
  },

  // ── Experience: Zaztech ───────────────────────────────────────────────
  {
    id: "zaztech-fintech",
    text: "At Zaztech, from June 2022 to June 2023, Matheus integrated multiple payment processors into a white-label fintech and cashback platform.",
    source: "Experience · Zaztech",
  },
  {
    id: "zaztech-figueirense",
    text: "At Zaztech, Matheus shipped the official Figueirense Futebol Clube app, live on the App Store and Google Play with about 10,000 active members.",
    source: "Experience · Zaztech",
  },
  {
    id: "zaztech-promotions",
    text: "At Zaztech, Matheus earned two promotions in one year, going from intern to mid-level engineer.",
    source: "Experience · Zaztech",
  },

  // ── Experience: independent years ─────────────────────────────────────
  {
    id: "indie-period",
    text: "From 2019 to June 2022, Matheus worked as an independent software developer in Brazil, before his first industry job.",
    source: "Experience · Independent",
  },
  {
    id: "biscuit-factory",
    text: "Matheus's first production system was the management system for his family's biscuit factory in Brazil: inventory and finances, built with PHP and MySQL in 2019, in daily use for years.",
    source: "About · Origin story",
    queries: ["How did Matheus start programming? How did he get into software?"],
  },
  {
    id: "rocketseat",
    text: "Matheus did intensive full-stack training with Rocketseat (Node.js, React, REST APIs). His first real system ran in production before his first industry job.",
    source: "Experience · Independent",
  },

  // ── Skills ────────────────────────────────────────────────────────────
  {
    id: "skills-evidence",
    text: "Every skill Matheus lists — across core, backend and data, frontend and mobile, and infra and ops — is backed by something he actually shipped.",
    source: "Skills · The toolbox",
  },
  {
    id: "skills-human",
    text: "Matheus's human skills: end-to-end ownership, async remote collaboration (he survived an 18-month, 12-hour timezone gap), and product thinking.",
    source: "Skills · Human",
  },
  {
    id: "languages",
    text: "Matheus speaks Portuguese natively, fluent English, and intermediate Spanish.",
    source: "Skills · Languages",
    queries: ["What languages does Matheus speak?"],
  },

  // ── About / journey ───────────────────────────────────────────────────
  {
    id: "journey",
    text: "Matheus's journey spans three countries: he started in Brazil, worked from Australia, and is now based in Spain.",
    source: "About · Journey",
  },
  {
    id: "work-style",
    text: "Matheus works in the open, measures what he builds, and says so when something is not his strength: design taste took him years, backend correctness came first.",
    source: "About · How he works",
  },
  {
    id: "fun-fact",
    text: "Fun fact: Matheus once fixed production from a restaurant kitchen during his night shift. The pasta was fine too.",
    source: "Terminal · Easter egg",
    queries: ["Tell me a fun fact about Matheus."],
  },

  // ── Contact ───────────────────────────────────────────────────────────
  {
    id: "contact-how",
    text: "You can contact Matheus by email, LinkedIn or GitHub, or download his CV from the site. He replies within one business day, usually much faster.",
    source: "Contact",
    queries: ["How can I contact Matheus? How do I reach him?"],
  },
  {
    id: "contact-freelance",
    text: "Not hiring but need something built? Matheus also takes on selected freelance projects and quotes on request.",
    source: "Contact · Freelance",
  },
];
