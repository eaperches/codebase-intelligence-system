export function chunkFile(content: string, chunkSize: number = 500): string[] {
  const chunks: string[] = []; // TODO: change to tokens
  for (let i = 0; i < content.length; i += chunkSize) {
    chunks.push(content.slice(i, i + chunkSize));
  }
  return chunks;
}
