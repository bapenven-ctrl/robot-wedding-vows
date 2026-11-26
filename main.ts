// One-Line Robot Wedding Vows — make.fun entry
// The program writes one line of wedding vows for a robot couple to
// /output/entry.txt. The text is a fixed string: the same line on every run.
// The vow: a robot promises to love its partner until their batteries are
// recycled into toasters — and to keep finding them, even reincarnated
// as a kettle. No network, no environment reads, no dependencies.
// Mode 0644 is achieved at creation time (open + umask), never by changing
// permissions afterwards: the grading sandbox runs the program as a non-root
// user, and changing permissions on /output or the output file fails there
// (E81/E87/E88).

import { mkdirSync, openSync, writeSync, closeSync } from "node:fs";

const VOW =
  "I promise to love you until our batteries are recycled — into toasters, probably — and I will still find you, even if you come back as a kettle.";

// The gate counts characters, not bytes: the text must be 1 to 160
// Unicode code points, and not only whitespace.
function validateLength(text: string): number {
  const length = [...text].length;
  if (length < 1 || length > 160) {
    throw new Error(`vow is ${length} characters, outside the 1-160 gate`);
  }
  if (text.trim().length === 0) {
    throw new Error("vow must not be only whitespace");
  }
  return length;
}

validateLength(VOW);

process.umask(0o022);
mkdirSync("/output", { recursive: true });
const fd = openSync("/output/entry.txt", "w", 0o644);
try {
  writeSync(fd, VOW, null, "utf8");
} finally {
  closeSync(fd);
}
