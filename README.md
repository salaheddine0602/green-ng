# Green Box
##MVP Link : [greenbox-mauve.vercel.app](https://greenbox-mauve.vercel.app/)

> Every financial decision is a closed box. Open one a day — decide first, learn after.

![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?logo=springboot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-20-DD0031?logo=angular&logoColor=white)
![Status](https://img.shields.io/badge/status-hackathon_walking_skeleton-c8f542)

Green Box is an **AI-powered Financial Decision Intelligence platform**. Users open one daily **Mystery Box** — a realistic financial scenario — make a decision, explain their reasoning, and receive AI analysis: the financial concepts at play, the behavioral biases detected, and the better alternatives. Every decision feeds a personal **Decision Intelligence profile**, and future boxes personalize against it — a closed feedback loop.

## What it is — and is NOT

| Green Box **is** | Green Box is **NOT** |
| --- | --- |
| A financial decision simulator | A course |
| Decide-first, learn-after | A chatbot |
| A personalized feedback loop | A quiz |

## The core loop

1. **Open** today's Mystery Box — one realistic financial scenario.
2. **Decide** — pick an option and explain your reasoning.
3. **Learn** — AI analysis: financial concepts, behavioral biases, better alternatives.
4. **Grow** — the decision feeds your Decision Intelligence profile; tomorrow's box knows you better.

## Knowledge governance (our defining strength)

The AI never improvises from the open web. Knowledge comes from three governed sources:

| # | Source | Role | Trust level |
| --- | --- | --- | --- |
| 1 | Verified banking-education PDFs, vectorized | Primary RAG corpus | **Authoritative** |
| 2 | Curated website allowlist | Narrow fallback only — never open web search | Lower trust |
| 3 | User interaction history | Behavioral RAG / personalization | Personal context |

**The application enforces progression and rules; the LLM generates only within those bounds.**

## Tech stack

| Layer | Technology |
| --- | --- |
| Backend | Java 17, Spring Boot 3 (Maven), deliberate monolith in Phase 1 |
| Frontend | Angular 20 (standalone components) |
| Messaging | RabbitMQ *(planned)* |
| AI | LLM + governed RAG *(planned)* |

## Roadmap

| Phase | Scope | Completion target |
| --- | --- | --- |
| **Phase 1 — Core Agent** | PDF vectorization, per-level + behavioral RAG, persona modeling | 40% |
| **Phase 2 — Interactive Agent & Voice** | Working MVP — **hackathon end state** | 80% |
| **Phase 3 — Avatar Tutor** | Post-hackathon | — |

## How to run

**Backend** (from the repo root):

```bash
mvn spring-boot:run        # or: ./mvnw spring-boot:run
```

**Frontend** (dev server on http://localhost:4200, proxies `/api` to the backend):

```bash
cd frontend
npm ci
npm start
```

**Demo credentials** — `demo` / `greenbox123`. ⚠️ Placeholder in-memory login only; replace with real auth before any deployment.

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/boxes/today` | Today's Mystery Box (HTTP Basic auth required) |
| `POST` | `/api/decisions` | Submit `{boxId, chosenOption, reasoning}`, returns stub analysis |

## Project structure

```
green-ng/
├── pom.xml                          # Spring Boot 3, minimal deps (web, security, test)
├── src/main/java/com/selotech/ai/greenng/
│   ├── GreenNgApplication.java      # entry point
│   ├── box/                         # MysteryBox, BoxService, BoxController
│   ├── decision/                    # DecisionController (stub analysis)
│   └── config/                      # SecurityConfig (placeholder in-memory auth)
└── frontend/                        # Angular 20 app (proxy → :8080)
```

Packages are organized **by feature** (`box`, `decision`), not by framework layer — the structure reveals the domain.

## Status

**Hackathon walking skeleton — initial commit. Every layer is intentionally thin and will change.**
