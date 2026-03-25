# CLAUDE.md

## Commands

```bash
npm run dev      # Start dev server with hot reload (tsx watch src/server.ts)
npm run lint     # Run ESLint
```

The server runs on port 3000. There is no test suite yet.

## Architecture

This is a basic in-memory **RAG (Retrieval-Augmented Generation) system** for answering questions about codebases. The goal is to create a simplified imitation of a real agentic RAG system that mimics what an AI agent would do for the purpose of learning more about AI Systems Engineering.

The pipeline has three phases (see README.txt for diagram):

1. **Ingestion** (offline): parse files → chunk → embed → store in vector DB
2. **Retrieval** (runtime): embed query → cosine similarity search → return top chunks
3. **Generation** (runtime): chunks + question → LLM prompt → answer

### Current Implementation Status

**Implemented:**

- `src/server.ts` — Fastify HTTP server (port 3000), main entry point
- `src/ingest/loadFiles.ts` — Recursive DFS file walker
- `src/ingest/chunk.ts` — Character-based chunking (500 chars, TODO: token-based)
- `src/ingest/embed.ts` — Embedding stub (returns `[]`, needs OpenAI integration)
- `src/ingest/store.ts` — In-memory `VectorRecord[]` array with `addChunk()`
- `src/utils/cosine.ts` — Cosine similarity: `(a·b) / (|a| * |b|)`

**Not yet implemented:**

- `src/db/` — Vector persistence layer
- `src/retrieve/` — Similarity search against stored embeddings
- `src/generate/` — Agent loop with Search/Read/Summarize tools and LLM generation

### Core Type

```typescript
type VectorRecord = {
  id: string;
  content: string;
  filePath: string;
  startLine: number;
  endLine: number;
  embeddings: number[];
};
```

### Tech Stack

- **Runtime**: Node.js with TypeScript (ES modules, `tsx` for execution)
- **HTTP**: Fastify v5
- **AI**:
  - Claude (generation, reasoning, agent loop)
  - OpenAI Embeddings (vector embeddings for RAG)
- **Config**: dotenv (`.env` file at project root)
