// In-browser semantic search over the portfolio corpus. Retrieval only, no
// generation: every answer is a human-written fact from facts.ts (or its
// human-reviewed translation in facts.i18n.ts) plus its source label, so the
// feature cannot hallucinate by construction.
//
// Cross-lingual by design: the embedding model is multilingual
// (Xenova/paraphrase-multilingual-MiniLM-L12-v2), so a question asked in
// Portuguese, Spanish, French or German matches the English fact vectors
// directly — and the answer text comes back in the language of the question.
//
// Model-loading tradeoff (deliberate): the model (~50MB quantized) is
// downloaded from the Hugging Face CDN on the FIRST question only (or on
// explicit intent via preloadAsk()), then cached by the browser; follow-up
// questions are instant and fully offline. Neither @xenova/transformers nor
// the model is part of the main bundle or the page load.

import { cosineSimilarity } from "./similarity";
import { factTranslations, type AskLang } from "./facts.i18n";

export interface AskResult {
  answer: string;
  sources: string[];
  confidence: number;
}

interface AskIndexItem {
  id: string;
  vector: number[];
  text: string;
  source: string;
}

interface AskIndex {
  model: string;
  dims: number;
  items: AskIndexItem[];
}

type EmbedFn = (text: string) => Promise<number[]>;

// Below this the match is noise: answer honestly instead of guessing.
// (Calibrated for paraphrase-multilingual-MiniLM-L12-v2, whose cross-lingual
// scores run lower than the old English-only model.)
const MIN_CONFIDENCE = 0.22;
// A second fact is appended to the answer only above this score.
const STRONG_MATCH = 0.33;

const NO_ANSWER: Record<AskLang, string> = {
  en: "I don't have that information in my notes. Try asking about Matheus's career — his work, experience, skills, or how to reach him.",
  "pt-BR":
    "Não tenho essa informação nas minhas notas. Pergunte sobre a carreira do Matheus: trabalho, experiência, skills ou como falar com ele.",
  es: "No tengo esa información en mis notas. Pregunta sobre la carrera de Matheus: su trabajo, experiencia, habilidades o cómo contactarle.",
  fr: "Je n'ai pas cette information dans mes notes. Posez une question sur le parcours de Matheus : son travail, son expérience, ses compétences ou comment le contacter.",
  de: "Dazu habe ich nichts in meinen Notizen. Frag zu Matheus' Werdegang: Projekte, Erfahrung, Skills oder wie man ihn erreicht.",
};

let embedPromise: Promise<EmbedFn> | null = null;
let indexPromise: Promise<AskIndex> | null = null;

function loadIndex(): Promise<AskIndex> {
  indexPromise ??= (async () => {
    const res = await fetch(`${import.meta.env.BASE_URL}ask-index.json`);
    if (!res.ok) {
      throw new Error(`Failed to load ask-index.json (HTTP ${res.status})`);
    }
    return (await res.json()) as AskIndex;
  })();
  return indexPromise;
}

// The runtime model always follows the index so the two can never drift.
function loadEmbedder(): Promise<EmbedFn> {
  embedPromise ??= (async () => {
    const [{ pipeline, env }, index] = await Promise.all([
      import("@xenova/transformers"),
      loadIndex(),
    ]);
    // Never probe /models/* on this origin — always resolve from the HF CDN.
    env.allowLocalModels = false;
    const extractor = await pipeline("feature-extraction", index.model);
    return async (text: string) => {
      // The pipeline's call signature is untyped upstream; the
      // feature-extraction output is a Tensor whose data is a Float32Array.
      const output = (await extractor(text, {
        pooling: "mean",
        normalize: true,
      })) as { data: Float32Array };
      return Array.from(output.data);
    };
  })();
  return embedPromise;
}

/** Warm up the model + index ahead of the first question (call on user intent). */
export async function preloadAsk(): Promise<void> {
  await Promise.all([loadEmbedder(), loadIndex()]);
}

/**
 * Best-effort language detection for the 5 site languages, tuned for short
 * recruiter-style questions. Falls back to the site language when the
 * question carries no signal (e.g. "stack?", proper nouns only).
 */
export function detectAskLang(question: string, siteLang: string): AskLang {
  const q = ` ${question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")} `;

  const MARKERS: Record<Exclude<AskLang, "en">, string[]> = {
    "pt-BR": [
      " voce ", " vc ", " quantos ", " quanto ", " onde ", " qual ", " quais ",
      " quem ", " fala ", " trabalha ", " mora ", " tem ", " ele ", " ja ",
      " nao ", " sao ", " esta ", " anos de ", " experiencia ", " como e ",
    ],
    es: [
      " cuantos ", " cuanto ", " donde ", " cual ", " cuales ", " quien ",
      " habla ", " trabaja ", " vive ", " tiene ", " el es ", " años ",
      " anos de experiencia tiene ", " que hace ", " como es ", " puede ", " esta ",
    ],
    fr: [
      " combien ", " ou est ", " quelle ", " quel ", " quelles ", " qui ",
      " parle ", " travaille ", " habite ", " a t il ", " est ce ", " annees ",
      " ans d ", " experience a ", " il est ", " peut ",
    ],
    de: [
      " wie ", " wo ", " viele ", " jahre ", " spricht ", " arbeitet ",
      " wohnt ", " hat er ", " welche ", " kann ", " ist er ", " erfahrung ",
      " macht er ", " was ist ",
    ],
  };

  let best: AskLang = "en";
  let bestScore = 0;
  for (const [lang, markers] of Object.entries(MARKERS) as [AskLang, string[]][]) {
    const score = markers.reduce((acc, m) => acc + (q.includes(m) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = lang;
    }
  }

  if (bestScore > 0) return best;
  const site = (["en", "pt-BR", "es", "fr", "de"] as AskLang[]).find(
    (l) => l === siteLang,
  );
  return site ?? "en";
}

function localizeFact(
  item: AskIndexItem,
  lang: AskLang,
): { text: string; source: string } {
  if (lang === "en") return item;
  return factTranslations[lang]?.[item.id] ?? item;
}

export async function askPortfolio(
  question: string,
  siteLang = "en",
): Promise<AskResult> {
  const [embed, index] = await Promise.all([loadEmbedder(), loadIndex()]);
  const queryVector = await embed(question);
  const lang = detectAskLang(question, siteLang);

  // Rank all vectors, then keep only the best-scoring vector per fact id —
  // question-paraphrase vectors share ids with their fact text.
  const bestById = new Map<string, { item: AskIndexItem; score: number }>();
  for (const item of index.items) {
    const score = cosineSimilarity(queryVector, item.vector);
    const prev = bestById.get(item.id);
    if (!prev || score > prev.score) bestById.set(item.id, { item, score });
  }
  const ranked = [...bestById.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const top = ranked[0];
  if (!top || top.score < MIN_CONFIDENCE) {
    return { answer: NO_ANSWER[lang], sources: [], confidence: 0 };
  }

  // Top fact always answers; a second one joins only when it is a strong
  // match on its own, capping the answer at two human-written facts.
  const picked = [top, ...ranked.slice(1, 2).filter((r) => r.score > STRONG_MATCH)];
  const localized = picked.map((r) => localizeFact(r.item, lang));

  return {
    answer: localized.map((f) => f.text).join(" "),
    sources: [...new Set(localized.map((f) => f.source))],
    confidence: top.score,
  };
}
