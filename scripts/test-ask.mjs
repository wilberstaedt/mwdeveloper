// Sanity check for the ask index: embeds 5 known questions and prints the
// top-1 fact + score for each, using the SAME cosine implementation as the
// browser runtime (src/lib/ask/similarity.ts, imported via Node type-stripping).
// Run with: node scripts/test-ask.mjs
import { readFile } from "node:fs/promises";
import { pipeline } from "@xenova/transformers";
import { cosineSimilarity } from "../src/lib/ask/similarity.ts";

const index = JSON.parse(
  await readFile(new URL("../public/ask-index.json", import.meta.url), "utf8"),
);

const extractor = await pipeline("feature-extraction", index.model);

const questions = [
  "where is he based?",
  "does he have production experience?",
  "what did he build with AI?",
  "how many years of experience?",
  "can he work in Spain?",
];

let failures = 0;
for (const question of questions) {
  const output = await extractor(question, { pooling: "mean", normalize: true });
  const queryVector = Array.from(output.data);

  const [top] = index.items
    .map((item) => ({ item, score: cosineSimilarity(queryVector, item.vector) }))
    .sort((a, b) => b.score - a.score);

  const ok = top.score > 0.4;
  if (!ok) failures++;
  console.log(`Q: ${question}`);
  console.log(
    `   top-1 ${ok ? "OK " : "LOW"} score=${top.score.toFixed(3)} [${top.item.id}] (${top.item.source})`,
  );
  console.log(`   "${top.item.text}"\n`);
}

if (failures > 0) {
  console.error(`${failures} question(s) scored <= 0.4`);
  process.exit(1);
}
console.log("All 5 questions scored > 0.4.");
