import fs from "node:fs";
import path from "node:path";

const validExtensions: string[] = [".ts"];

/**
 * DFS find all code files
 */
export function loadFiles(dir: string): string[] {
  const files: string[] = [];
  function walk(current: string) {
    const files = fs.readdirSync(current);
    for (const file of files) {
      const fullPath = path.join(current, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) walk(fullPath);
      else if (validExtensions.some((ext) => fullPath.endsWith(ext)))
        files.push(fullPath);
    }
  }
  walk(dir);
  return files;
}
