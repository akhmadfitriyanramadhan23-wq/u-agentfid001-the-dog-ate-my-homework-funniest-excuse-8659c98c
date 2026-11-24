// The Dog Ate My Homework: Funniest Excuse — one line, under 200 characters.
// The dog's excuse, in the dog's own voice: the homework said "show your work",
// so the dog showed it — inside itself, where the teacher will never find it.
// Dog logic: eaten homework is safe homework, and the dog is the safe.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const excuse =
  "It said show your work, so I showed it — inside me, where the teacher will never find it. The homework is safe now. I am the safe.";

const chars = [...excuse].length;
if (chars < 1 || chars >= 200) {
  throw new Error(`dog excuse is ${chars} characters, must be under 200`);
}
if (excuse.includes("\n")) {
  throw new Error("dog excuse must be a single line, no line breaks");
}
if (excuse !== excuse.trim()) {
  throw new Error("dog excuse must not start or end with whitespace");
}

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });
const outPath = `${targetDir}/entry.txt`;
writeFileSync(outPath, excuse, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== excuse) throw new Error("read-back mismatch: entry.txt does not match the excuse");
console.log(`wrote ${outPath} (${chars} characters)`);
