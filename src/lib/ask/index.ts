// In-browser semantic search over the portfolio corpus. Retrieval only, no
// generation: every answer is a human-written fact from facts.ts plus its
// source label, so the feature cannot hallucinate by construction.
//
// Model-loading tradeoff (deliberate): the embedding model
// (Xenova/all-MiniLM-L6-v2, ~25MB quantized) is downloaded from the Hugging
// Face CDN on the FIRST question only, then cached by the browser; follow-up
// questions are instant and fully offline. Neither @xenova/transformers nor
// the model is part of the main bundle or the page load — the library is
// pulled in via dynamic import() inside loadExtractor(), so nothing here
// runs until a visitor actually asks something (or the UI calls preloadAsk()
// on explicit intent).

import { cosineSimilarity } from "./similarity";

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
const MIN_CONFIDENCE = 0.3;
// A second fact is appended to the answer only above this score.
const STRONG_MATCH = 0.35;

const NO_ANSWER =
  "I don't have that information in my notes. Try asking about Matheus's career — his work, experience, skills, or how to reach him.";

let embedPromise: Promise<EmbedFn> | null = null;
let indexPromise: Promise<AskIndex> | null = null;

function loadEmbedder(): Promise<EmbedFn> {
  embedPromise ??= (async () => {
    const { pipeline, env } = await import("@xenova/transformers");
    // Never probe /models/* on this origin — always resolve from the HF CDN.
    env.allowLocalModels = false;
    const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
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

/** Warm up the model + index ahead of the first question (call on user intent). */
export async function preloadAsk(): Promise<void> {
  await Promise.all([loadEmbedder(), loadIndex()]);
}

export async function askPortfolio(question: string): Promise<AskResult> {
  const [embed, index] = await Promise.all([loadEmbedder(), loadIndex()]);
  const queryVector = await embed(question);

  const ranked = index.items
    .map((item) => ({ item, score: cosineSimilarity(queryVector, item.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const top = ranked[0];
  if (!top || top.score < MIN_CONFIDENCE) {
    return { answer: NO_ANSWER, sources: [], confidence: 0 };
  }

  // Top fact always answers; a second one joins only when it is a strong
  // match on its own, capping the answer at two human-written facts.
  const picked = [top, ...ranked.slice(1, 2).filter((r) => r.score > STRONG_MATCH)];

  return {
    answer: picked.map((r) => r.item.text).join(" "),
    sources: [...new Set(picked.map((r) => r.item.source))],
    confidence: top.score,
  };
}
