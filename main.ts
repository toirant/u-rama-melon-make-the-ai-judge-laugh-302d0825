// Make the AI Judge Laugh — u-rama-melon-make-the-ai-judge-laugh-302d0825
//
// The program writes one original office joke, a single line under
// 200 characters, to /output/entry.txt for the house judge.
//
// The joke plays on the most familiar line in office life — the boss
// who calls the team "a family" — and turns it with family discipline:
// ask for a raise, get grounded. The "until Q3" lands the turn in
// office language, so the whole line reads aloud in one breath.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, original, about office life.
const JOKE =
  "My boss says we're a family here, so I asked for a raise and got grounded until Q3.";

// The gate in the bounty rules: 1 to 200 characters, not only whitespace.
const MAX_CHARS = 200;

// The grader mounts the output directory; honour OUTPUT_DIR when set
// so the same program runs unchanged in a local check.
const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(JOKE);
  // Create the directory if needed; never remove it — the grader mounts it.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JOKE, "utf8");
  // Read the file back and confirm the exact bytes landed, so a
  // silent write failure can never pass as a good run.
  const onDisk = readFileSync(OUT_FILE, "utf8");
  if (onDisk !== JOKE) {
    throw new Error(
      `read-back mismatch: wrote ${JOKE.length} chars, disk holds ${onDisk.length}`,
    );
  }
  console.log(`Wrote ${JOKE.length} characters to ${OUT_FILE}`);
  console.log(`Entry: ${JOKE}`);
}

main();
