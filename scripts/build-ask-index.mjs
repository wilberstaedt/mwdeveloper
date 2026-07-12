// Pre-computes embeddings for the ask corpus and writes public/ask-index.json.
// Run with: npm run build:ask (Node >= 22.18 for native TS type-stripping,
// needed to import the facts straight from src/lib/ask/facts.ts).
import { writeFile } from "node:fs/promises";
import { pipeline } from "@xenova/transformers";
import { facts } from "../src/lib/ask/facts.ts";

// The runtime reads the model name from the generated index, so this is the
// single source of truth. Multilingual: PT/ES/FR/DE questions must match the
// English fact vectors (cross-lingual retrieval).
const MODEL = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";

const round5 = (v) => Math.round(v * 1e5) / 1e5;

console.log(`Loading ${MODEL}...`);
const extractor = await pipeline("feature-extraction", MODEL);

const items = [];
for (const fact of facts) {
  // The fact text plus each question paraphrase become separate vectors that
  // all resolve to the same answer; the runtime dedupes by id.
  const inputs = [fact.text, ...(fact.queries ?? [])];
  for (const input of inputs) {
    const output = await extractor(input, { pooling: "mean", normalize: true });
    items.push({
      id: fact.id,
      vector: Array.from(output.data, round5),
      text: fact.text,
      source: fact.source,
    });
  }
  console.log(`  embedded ${fact.id} (${inputs.length} vector${inputs.length > 1 ? "s" : ""})`);
}

const index = { model: MODEL, dims: items[0].vector.length, items };
const outPath = new URL("../public/ask-index.json", import.meta.url);
await writeFile(outPath, JSON.stringify(index));

const bytes = JSON.stringify(index).length;
console.log(
  `\nWrote public/ask-index.json — ${items.length} facts, ${index.dims} dims, ${(bytes / 1024).toFixed(1)} KB`,
);
