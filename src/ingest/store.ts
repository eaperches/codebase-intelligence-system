export const store: VectorRecord[] = [];

export function addChunk(chunk: VectorRecord) {
  store.push(chunk);
}
