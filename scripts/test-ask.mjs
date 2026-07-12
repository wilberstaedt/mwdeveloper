// Sanity check for the ask index: embeds known questions in all 5 site
// languages and asserts the top-1 fact, using the SAME cosine implementation
// as the browser runtime (src/lib/ask/similarity.ts, imported via Node
// type-stripping). Run with: node scripts/test-ask.mjs
import { readFile } from "node:fs/promises";
import { pipeline } from "@xenova/transformers";
import { cosineSimilarity } from "../src/lib/ask/similarity.ts";

const index = JSON.parse(
  await readFile(new URL("../public/ask-index.json", import.meta.url), "utf8"),
);

console.log(`model: ${index.model}`);
const extractor = await pipeline("feature-extraction", index.model);

// [question, acceptable top-1 ids]
const cases = [
  // EN
  ["where is he based?", ["location-timezone", "journey"]],
  ["how many years of experience do you have?", ["years-experience"]],
  ["can he work in Spain?", ["work-authorization", "open-eu-remote"]],
  ["what did he build with AI?", ["ai-pipeline-built", "ai-pipeline-outcome", "lumen-built", "positioning"]],
  ["what is your tech stack?", ["role-stack", "skills-evidence"]],
  // PT
  ["quantos anos de experiencia voce tem?", ["years-experience"]],
  ["onde ele mora?", ["location-timezone", "journey"]],
  ["ele pode trabalhar na Espanha?", ["work-authorization", "open-eu-remote"]],
  ["quais linguas ele fala?", ["languages"]],
  // ES
  ["cuántos años de experiencia tiene?", ["years-experience"]],
  ["dónde vive Matheus?", ["location-timezone", "journey"]],
  // FR
  ["combien d'années d'expérience a-t-il ?", ["years-experience"]],
  // DE
  ["wie viele Jahre Erfahrung hat er?", ["years-experience"]],
];

let failures = 0;
for (const [question, accepted] of cases) {
  const output = await extractor(question, { pooling: "mean", normalize: true });
  const queryVector = Array.from(output.data);

  const [top] = index.items
    .map((item) => ({ item, score: cosineSimilarity(queryVector, item.vector) }))
    .sort((a, b) => b.score - a.score);

  const ok = accepted.includes(top.item.id);
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"} score=${top.score.toFixed(3)} [${top.item.id}] <- "${question}"`,
  );
  if (!ok) console.log(`     expected one of: ${accepted.join(", ")}`);
}

console.log(failures === 0 ? "\nall passed" : `\n${failures} failure(s)`);
process.exit(failures === 0 ? 0 : 1);
