import fs from "node:fs";
import crypto from "node:crypto";
import { loadFiles } from "./loadFiles.js";
import { chunkFile } from "./chunk.js";
import { embed } from "./embed.js";
import { addChunk } from "./store.js";

/**
 * Ingestion pipeline: load → chunk → embed → store
 * Returns the number of chunks stored.
 */
export async function ingest(dir: string): Promise<number> {
  const filePaths = loadFiles(dir);
  let total = 0;

  for (const filePath of filePaths) {
    const content = fs.readFileSync(filePath, "utf-8");
    const chunks = chunkFile(content);
    const lines = content.split("\n");

    const lineOffsets: number[] = [];
    let offset = 0;
    for (const line of lines) {
      lineOffsets.push(offset);
      offset += line.length + 1; // +1 for the newline
    }

    let charOffset = 0;
    for (const chunk of chunks) {
      const startLine = offsetToLine(lineOffsets, charOffset);
      const endLine = offsetToLine(lineOffsets, charOffset + chunk.length - 1);

      const embeddings = await embed(chunk);

      addChunk({
        id: crypto.randomUUID(),
        content: chunk,
        filePath,
        startLine,
        endLine,
        embeddings,
      });

      charOffset += chunk.length;
      total++;
    }
  }

  return total;
}

// Given a character offset, this function finds the last entry in lineOffsets that is <= charOffset
// using binary search. That is the line the caracter falls on
function offsetToLine(lineOffsets: number[], charOffset: number): number {
  let lo = 0;
  let hi = lineOffsets.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (lineOffsets[mid] <= charOffset) lo = mid;
    else hi = mid - 1;
  }
  return lo + 1;
}
