# Enterprise AI Showcase & Live Project Workbench

An interactive portfolio and execution workbench presenting four production-grade, enterprise-ready AI projects built to stand out on senior engineering resumes—complete with live Gemini-powered workflow execution, architecture breakdowns, quantified resume bullets, and an interactive STAR bullet generator.

> [!IMPORTANT]
> **Confirmed Decisions from Phase 1:**
> - **Product Type**: Interactive showcase featuring live, resume-worthy AI project demos rather than static reading material.
> - **Technical Depth**: Practical enterprise workflows solving high-impact problems (incident triage, legal SLA/risk extraction, diagnostic troubleshooting, and self-correcting RAG).
> - **Live AI Engine**: Powered by Google GenAI (`gemini-3.8-flash`) through server-side proxy routes with zero client-side key exposure.
> - **Theme & Style**: Clean enterprise workspace design adhering to SaaS standards (Plus Jakarta Sans, Manrope, tabular numeric telemetry, zero-pill metadata discipline, and light/dark theme support).

---

## 1. Overview & Core Concept

### What It Does
This application serves a dual purpose for software engineers, ML engineers, and AI architects:
1. **Resume-Ready Project Portfolio**: Four meticulously engineered enterprise AI projects with system architecture diagrams, technical trade-offs, tech stacks, and copy-pasteable STAR (Situation, Task, Action, Result) bullet points tailored for hiring managers and recruiters.
2. **Live Functional Demos**: Users can execute realistic enterprise workflows directly in the application with real LLM processing (incident triage from raw logs, contractual risk redlining, multimodal error diagnostics, and resume bullet tailoring).
3. **Interactive Project Tailor & Interview Prep**: A dynamic module that customizes projects to the candidate's background, generates interview talking points, and explains key system design trade-offs.

### Target Audience & Persona
- Software engineers, backend engineers, and data scientists looking to pivot to AI Engineering.
- Candidates preparing for AI/ML technical screens, system design rounds, and resume screening at top tech and enterprise companies.

### Key Value
Moves candidates from generic, easily dismissed tutorial projects (e.g. simple chat with PDF) to sophisticated, high-impact enterprise architectures that demonstrate production awareness, latency/cost trade-offs, and tangible business value.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Curated Showcase & Comparison**: The engineer enters the workspace and explores four standout enterprise project dossiers with filterable badges (e.g., Multi-Agent, Vision/Multimodal, High-Precision Structured Output, RAG & Guardrails).
2. **Deep-Dive Architecture & Dossier**: Selecting a project reveals:
   - System Design & Sequence diagram.
   - Production Tech Stack & trade-offs.
   - Ready-to-use resume bullet points with quantified metrics.
   - Top interview questions & model answers.
3. **Live Interactive Sandbox**:
   - User switches into the "Live Demo" tab for that project.
   - One-click loads realistic enterprise inputs (e.g. 50-line Kubernetes crash loop log, enterprise vendor SLA contract snippet, or complex API trace).
   - Click "Run Enterprise Workflow": calls the backend Gemini proxy, returning structured triage, risk scoring, or diagnostic patches with live execution latency.
4. **Resume Bullet & STAR Generator**:
   - The user inputs their current role, target company or industry, and selects an AI project architecture.
   - The system synthesizes tailored resume bullets following Google's X-Y-Z formula ("Accomplished [X] as measured by [Y], by doing [Z]").

### Visual Identity & Theme
- **Aesthetic Direction**: High-end enterprise developer console (reminiscent of Linear, Vercel, and Datadog). Crisp, authoritative, and functional.
- **Color Palette & Mood**:
  - Dominant Neutral: Crisp slate-50 (`#F8FAFC`) / Dark slate-950 (`#020617`).
  - Structural Surfaces: Pure white (`#FFFFFF`) / Dark slate-900 (`#0F172A`) with hairline borders (`#E2E8F0` / `#1E293B`).
  - Accent Budget (10%): Enterprise indigo (`#4F46E5` / `#6366F1`) and crisp cyan (`#0EA5E9`) for active states and primary workflow triggers.
- **Typography & Hierarchy**:
  - Display & Headings: `Plus Jakarta Sans` (font-semibold to font-bold) with tight letter tracking (`tracking-tight`).
  - Body Prose: `Manrope` / `Public Sans` for dense, legible reading.
  - Telemetry & Code: `JetBrains Mono` with `tabular-nums` for timestamps, latency, token metrics, and log displays.
- **Zero-Pill Discipline**: Metadata displayed as quiet, unboxed text separated by middle dots (`·`) and forward slashes (`/`), reserving pill backgrounds strictly for active interactive tabs.

---

## 3. Key Product Decisions & Trade-Offs

### Project Selection for Maximum Resume Impact
- **Project 1: Autonomous Incident Triage & Root Cause Engine (Multi-Agent)**
  - *Why*: Solves a multi-million-dollar SRE problem; hiring managers love observability and automated mitigation.
- **Project 2: Enterprise Contract & SLA Compliance Auditor (Structured JSON & Guardrails)**
  - *Why*: Demonstrates deterministic extraction, zero-hallucination tolerance, and compliance risk scoring.
- **Project 3: Multimodal Diagnostic & Patch Recommender (Vision + Logs)**
  - *Why*: Demonstrates multimodal synthesis (correlating error UI screenshot with server-side stack traces).
- **Project 4: Self-Correcting Enterprise Knowledge Engine (Corrective RAG & Citations)**
  - *Why*: Bridges vector search with active query rewriting and citation verification.

### Architecture & Security Decisions
- **Server-Side AI Gateway**: All Gemini API calls are routed through Express endpoints (`/api/ai/*`) using `@google/genai` and `process.env.GEMINI_API_KEY`. No client-side key exposure.
- **Model Selection**: Using `gemini-3.8-flash` for high throughput, sub-second responses, and robust structured JSON schemas.
- **Resilient Fallbacks**: Pre-cached real-world sample outputs in case of network unavailability or offline preview.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Client (React + Vite)                         │
│                                                                        │
│  ┌───────────────────────┐  ┌───────────────────────────────────────┐  │
│  │   Project Navigator   │  │   Detail View & Live Execution Bench  │  │
│  │  - 4 Enterprise Specs │  │   - System Design & Sequence Tabs     │  │
│  │  - Complexity Filters │  │   - Resume STAR Bullet Generator      │  │
│  │  - Tech Stack Badges  │  │   - Live Interactive Workflow Runner  │  │
│  └───────────┬───────────┘  └───────────────────┬───────────────────┘  │
└──────────────┼──────────────────────────────────┼──────────────────────┘
               │                                  │
               │ HTTP POST /api/ai/execute-task   │
               ▼                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Server Gateway (Express + tsx)                       │
│                                                                        │
│   ┌─────────────────────┐   ┌──────────────────────────────────────┐   │
│   │ Prompt Orchestrator │──▶│ @google/genai SDK (gemini-3.8-flash) │   │
│   │ - Incident Triage   │   │ - Structured JSON Schema             │   │
│   │ - Contract Risk     │   │ - Telemetry & Latency Calculation    │   │
│   │ - Diagnostic Patch  │   │ - User-Agent: aistudio-build         │   │
│   └─────────────────────┘   └──────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

### Server Endpoints:
- `POST /api/ai/incident-triage`: Analyzes cluster logs, identifies root cause, severity, impact, and generates automated runbook mitigation steps.
- `POST /api/ai/contract-audit`: Ingests clause text, flags liability/SLA risks, computes penalty exposure, and generates redline revisions.
- `POST /api/ai/code-diagnostic`: Ingests stack trace and context, diagnoses fault, and outputs executable patch diffs.
- `POST /api/ai/tailor-resume`: Takes candidate experience and generates tailored, high-converting resume bullets with quantifiable impact metrics.

### Component Structure:
- `Navbar.tsx`: Top bar contract with brand wordmark, tab switches, and live server health indicator.
- `ProjectCard.tsx`: Scannable project summary cards with architecture highlights and impact metrics.
- `ProjectDetail.tsx`: Comprehensive deep dive with tabs for Overview, System Architecture, Resume Bullets, Interview Prep, and Live Sandbox.
- `LiveSandbox.tsx`: Interactive workflow playground with sample selectors, real-time trigger, latency meter, and rich structured result renderer.
- `ResumeTailorModal.tsx`: Dedicated generator helping users tailor these projects to their personal CV.
