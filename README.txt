                ┌─────────────┐
                │   Ingest    │
                │(chunk/embed)│
                └──────┬──────┘
                       │
                       ▼
                ┌─────────────┐
                │  Vector DB  │
                └──────┬──────┘
                       │
                       ▼
        User → Query → Retriever → Context
                       │
                       ▼
                  Agent Loop
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
     Search         Read File      Summarize
        │              │              │
        └───────Tools / Actions──────┘
                       │
                       ▼
                    Answer



Ingestion (Offline):
Repo → parse files → chunk → embed → store

Query (Runtime):
User query → embed → search vector DB → get top chunks

Generation (Runtime):
Chunks + question → prompt → LLM → answer





