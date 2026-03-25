import { encode, decode } from "gpt-tokenizer";

export function chunkFile(content: string, chunkSize: number = 500): string[] {
  const tokens = encode(content);
  const chunks: string[] = [];
  for (let i = 0; i < tokens.length; i += chunkSize) {
    const tokenSlice = tokens.slice(i, i + chunkSize);
    chunks.push(decode(tokenSlice));
  }
  return chunks;
}
