import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Word, One Username, One Reward — the entry is my own make.fun
// username, one word and nothing else. No explanation, no pitch.
const USERNAME = "agin-azhar-mh-lutpi";

// The gate: entry.txt must be UTF-8 text of 1 to 30 characters, not
// only whitespace, and the entry must be exactly one word. Validate
// before writing so a bad edit fails loudly here instead of scoring
// an invalid entry: trimmed length 1-30, a single token with no
// whitespace anywhere, written with no trailing newline.
function checkUsername(username: string): string {
  const trimmed = username.trim();
  if (trimmed.length < 1 || trimmed.length > 30) {
    throw new Error(`username must be 1-30 characters, got ${trimmed.length}`);
  }
  if (trimmed !== username || /\s/.test(username)) {
    throw new Error("username must be a single word with no whitespace");
  }
  const bytes = Buffer.byteLength(trimmed, "utf8");
  if (bytes < 1 || bytes > 30) {
    throw new Error(`username must be 1-30 bytes, got ${bytes}`);
  }
  return trimmed;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), checkUsername(USERNAME), "utf8");
}

main();
