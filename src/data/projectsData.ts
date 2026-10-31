import { EnterpriseProject } from '../types';

export const ENTERPRISE_PROJECTS: EnterpriseProject[] = [
  {
    id: 'incident-triage',
    title: 'Autonomous SRE Incident Triage & RCA Engine',
    tagline: 'Multi-agent alert deduplication, cluster log synthesis, and deterministic runbook mitigation',
    category: 'agents',
    complexity: 'Staff-Level',
    targetRoles: ['AI Platform Engineer', 'Staff Backend Engineer', 'Site Reliability Architect'],
    keyMetric: '-94%',
    metricLabel: 'Mean Time to Root Cause (45m -> 2.5m)',
    summary:
      'An enterprise-grade autonomous SRE agent that ingests high-velocity distributed Kubernetes logs, PagerDuty alerts, and Prometheus metrics during production outage storms. It uses a tiered multi-agent topology to filter noise, pinpoint the cascading root cause, and synthesize executable, sandboxed runbooks.',
    architectureSummary:
      'Log aggregation via OpenTelemetry and Kafka feeds an async Celery worker pool. A Log-Pruning Agent clusters semantically duplicate stack traces using vector embeddings. The Root Cause Agent (Gemini 3.8 Flash) analyzes correlated dependency graphs, and a Policy Verification Agent validates runbook commands against Open Policy Agent (OPA) guardrails before dispatching to Slack and PagerDuty.',
    asciiDiagram: `┌────────────────────────────────────────────────────────────────────────┐
│                        INCIDENT TRIAGE TOPOLOGY                        │
│                                                                        │
│   [K8s Logs / OTel] ───┐                                               │
│   [Prometheus Metrics] ┼──▶ [Kafka Event Bus] ──▶ [Embedding Filter]   │
│   [PagerDuty Alerts] ──┘                                 │             │
│                                                          ▼             │
│                                              ┌───────────────────────┐ │
│                                              │ Root Cause Agent      │ │
│                                              │ (Gemini 3.8 Flash)    │ │
│                                              └───────────┬───────────┘ │
│                                                          │             │
│                                                          ▼             │
│   [Slack / PagerDuty] ◀── [Human On-Call] ◀── [OPA Policy Guardrail]   │
│   (Mitigation Ticket)     (1-Click Approval)    (Sandboxed Runbook)    │
└────────────────────────────────────────────────────────────────────────┘`,
    productionStack: [
      { category: 'AI & Inference', technologies: ['Gemini 3.8 Flash', 'Google GenAI SDK', 'Structured JSON Output'] },
      { category: 'Streaming & Ingestion', technologies: ['Apache Kafka', 'Vector Log Embeddings', 'OpenTelemetry'] },
      { category: 'Execution & Backend', technologies: ['Python 3.12', 'FastAPI', 'Celery', 'Redis Cluster'] },
      { category: 'Safety & Infrastructure', technologies: ['Open Policy Agent (OPA)', 'Kubernetes Operator', 'Prometheus'] },
    ],
    keyTradeoffs: [
      {
        decision: 'Tiered agent pipeline vs single monolithic LLM prompt',
        rationale: 'During alert storms, log volume exceeds 500k lines/minute. Monolithic calls blow token budgets and induce timeouts. Tiered embedding deduplication eliminates 92% of noise before LLM ingestion.',
        alternativeDiscarded: 'Sending raw vector search results straight to the LLM without graph topology awareness.',
      },
      {
        decision: 'Declarative runbooks vs autonomous bash execution',
        rationale: 'Giving an autonomous agent direct write/exec shell access to production clusters is an unacceptable security blast radius. Emitting declarative, human-approved mitigation manifests provides safety guarantees.',
        alternativeDiscarded: 'Unsupervised agentic tool-calling with direct kubectl execution privileges.',
      },
    ],
    resumeBullets: [
      {
        category: 'Impact',
        bullet:
          'Architected an autonomous SRE incident response engine using Gemini 3.8 Flash, Kafka, and FastAPI, slashing mean-time-to-root-cause (MTTR) by 94% (45 min to <2.5 min) across 60+ production microservices.',
        metrics: '94% reduction in MTTR',
      },
      {
        category: 'Architecture',
        bullet:
          'Engineered a multi-stage log pruning pipeline with semantic vector deduplication, filtering 91% of redundant alert noise during cascading outage storms and saving $14,000/month in LLM token consumption.',
        metrics: '$14k/mo token compute savings',
      },
      {
        category: 'Optimization',
        bullet:
          'Constructed an Open Policy Agent (OPA) validation layer that sandboxes LLM-generated mitigation runbooks, preventing unauthorized state mutations and guaranteeing zero hallucinated cluster commands.',
        metrics: '0 unauthorized mutations across 1,200 simulated drills',
      },
    ],
    interviewQA: [
      {
        question: 'How does your system prevent hallucinated shell commands from taking down the cluster?',
        interviewerIntent: 'Assessing your security posture, blast-radius awareness, and defensive programming in AI systems.',
        recommendedAnswer:
          'The LLM never receives raw execution primitives. Instead, it is constrained via strict JSON schema to output declarative action IDs from a pre-verified catalog (e.g., SCALE_DEPLOYMENT, ROLLBACK_RELEASE, FLUSH_WARM_CACHE). These actions are validated against an Open Policy Agent (OPA) engine against current RBAC permissions, and require explicit human on-call sign-off in Slack for any destructive tier-1 operations.',
      },
      {
        question: 'How do you handle log floods of 100,000 lines/sec without exhausting token limits or crashing?',
        interviewerIntent: 'Testing distributed systems, stream processing, and cost-engineering.',
        recommendedAnswer:
          'We use a three-tiered filter: first, a streaming fingerprinter hashes normalized stack traces to drop duplicate exceptions. Second, we compute cosine similarity against a rolling 15-minute sliding window in Redis. Only unique anomaly signatures and topological service neighborhood logs are assembled into the Gemini 3.8 Flash prompt, reducing input tokens by 92%.',
      },
    ],
    sampleInputs: [
      {
        name: 'Postgres Connection Pool Exhaustion (Cache Stampede)',
        description: 'Simulates cascading 504 timeouts caused by Redis key eviction under high traffic spike.',
        payload: {
          serviceContext: 'K8s Cluster, Kong Ingress, auth-service (Node.js), Postgres PgBouncer, Redis Cluster',
          logs: `2026-10-31T01:04:12Z [ERROR] auth-service-7f89d-xk29: [PgBouncer] pool exhausted for user "app_auth", max_connections=100 reached
2026-10-31T01:04:13Z [WARN]  kong-ingress: upstream request timeout 504 Gateway Timeout /api/v1/user/session
2026-10-31T01:04:13Z [ERROR] billing-service-4ab12-p99q: failed to verify JWT: connection refused to auth-service:8080
2026-10-31T01:04:14Z [INFO]  redis-cluster-node-02: evicting key pattern session:* due to maxmemory-policy volatile-lru
2026-10-31T01:04:15Z [ERROR] auth-service-7f89d-xk29: DB query latency spiked to 4,820ms on "SELECT * FROM users WHERE token_hash = $1"
2026-10-31T01:04:16Z [FATAL] auth-service-7f89d-xk29: Liveness probe failed: HTTP probe returned status code 500
2026-10-31T01:04:17Z [CRIT]  kube-scheduler: Restarting container auth-service in pod auth-service-7f89d-xk29 (CrashLoopBackOff)`,
        },
      },
      {
        name: 'Deadlock in Payment Transaction Settlement',
        description: 'Two concurrent batch settlement workers acquiring row locks in reverse alphabetical order.',
        payload: {
          serviceContext: 'Fintech ledger service, Aurora PostgreSQL 16, Distributed BullMQ workers',
          logs: `2026-10-31T01:05:01Z [ERROR] payment-worker-01: Postgres deadlock detected: Process 14022 waits for ExclusiveLock on transaction 88192; blocked by process 14033
2026-10-31T01:05:01Z [ERROR] payment-worker-02: Process 14033 waits for ShareLock on transaction 88191; blocked by process 14022
2026-10-31T01:05:02Z [WARN]  settlement-queue: DLQ (dead letter queue) threshold exceeded: 412 unhandled rollback messages in 60s
2026-10-31T01:05:03Z [ERROR] ledger-api: HTTP 500 on POST /v2/settlements/reconcile - Transaction rollback: transaction (TransactionId 88192) was aborted`,
        },
      },
    ],
    endpoint: '/api/ai/incident-triage',
  },
  {
    id: 'contract-risk',
    title: 'Enterprise Contract & SLA Intelligence Risk Auditor',
    tagline: 'Deterministic clause extraction, liability cap exposure scoring, and automated legal redlines',
    category: 'structured',
    complexity: 'Production-Ready',
    targetRoles: ['AI Product Engineer', 'Enterprise Solutions Architect', 'Full-Stack AI Developer'],
    keyMetric: '$1.4M',
    metricLabel: 'Prevented Liability Exposure in Audited MSA',
    summary:
      'A high-precision document intelligence and legal risk extraction pipeline that reviews 40+ page enterprise Master Services Agreements (MSAs), Statements of Work (SOWs), and vendor SLAs. It detects liability traps, un-capped indemnity clauses, and IP transfer risks, generating compliance scores and attorney-grade redline revisions.',
    architectureSummary:
      'Legal texts are segmented into semantic clause blocks using hierarchical boundary detection. Each clause is evaluated against enterprise playbook rules using Gemini 3.8 Flash with structured JSON schemas. Clauses failing threshold criteria are matched against standard corporate playbook fallbacks and redlined via character-level difference algorithms.',
    asciiDiagram: `┌────────────────────────────────────────────────────────────────────────┐
│                      CONTRACT AUDIT ARCHITECTURE                       │
│                                                                        │
│   [MSA / SLA PDF or Doc] ──▶ [Hierarchical Semantic Chunking]          │
│                                           │                            │
│                                           ▼                            │
│                         ┌───────────────────────────────────┐          │
│                         │ Clause Classification Engine      │          │
│                         │ (Liability, SLA, IP, Indemnity)   │          │
│                         └─────────────────┬─────────────────┘          │
│                                           │                            │
│                                           ▼                            │
│   [Playbook Rule Graph] ──▶ [Risk Scoring & Redline Generator]         │
│   (Max Caps, Privacy)       (Gemini 3.8 Flash Structured JSON)         │
│                                           │                            │
│                                           ▼                            │
│   [Legal Dashboard] ◀────── [Interactive Diff & Exposure Bar]          │
└────────────────────────────────────────────────────────────────────────┘`,
    productionStack: [
      { category: 'AI & Inference', technologies: ['Gemini 3.8 Flash', 'Native JSON Schema Enforcement', 'Legal Few-Shot In-Context Rules'] },
      { category: 'Data & Processing', technologies: ['FastAPI', 'PyPDF / Unstructured.io', 'Diff Match Patch', 'PostgreSQL'] },
      { category: 'Frontend & UI', technologies: ['React 19', 'Tailwind CSS v4', 'Framer Motion', 'Lucide React'] },
      { category: 'Validation', technologies: ['Pydantic v2', 'Strict JSON ResponseSchema', 'Unit Test Playbook Suite'] },
    ],
    keyTradeoffs: [
      {
        decision: 'Strict JSON ResponseSchema vs free-form markdown analysis',
        rationale: 'Legal and compliance workflows require 100% deterministic, machine-readable keys for risk tiering, category sorting, and automated redlining. Free-form text outputs lead to parser breakage.',
        alternativeDiscarded: 'Regex parsing of conversational LLM responses.',
      },
      {
        decision: 'Clause-by-clause evaluation vs single prompt full document ingestion',
        rationale: 'Sending entire 80-page contracts in one shot leads to the "lost-in-the-middle" effect on subtle sub-clauses (e.g. 7-day SLA claim forfeiture). Chunked clause evaluation achieves 99.4% detection accuracy.',
        alternativeDiscarded: 'Single-prompt pass over entire raw PDF text.',
      },
    ],
    resumeBullets: [
      {
        category: 'Impact',
        bullet:
          'Designed and shipped an automated contract intelligence system using Gemini 3.8 Flash and FastAPI, accelerating enterprise legal review cycles from 8 days to 14 minutes with 98.7% clause classification precision.',
        metrics: '97% reduction in review cycle time',
      },
      {
        category: 'Architecture',
        bullet:
          'Engineered a deterministic risk-scoring pipeline enforcing Gemini native JSON schemas, successfully flagging uncapped indemnification and AI model training traps across 450+ vendor MSAs.',
        metrics: '450+ contracts audited, $1.4M saved in risk exposure',
      },
      {
        category: 'Optimization',
        bullet:
          'Implemented hierarchical semantic boundary chunking and dynamic playbook alignment, reducing false positive risk alerts by 62% compared to standard chunking heuristics.',
        metrics: '62% decrease in false positive alerts',
      },
    ],
    interviewQA: [
      {
        question: 'How do you guarantee that the model doesn’t hallucinate non-existent contractual terms or altered dates?',
        interviewerIntent: 'Checking understanding of ground-truth fidelity, citation extraction, and verification loops.',
        recommendedAnswer:
          'Every identified risk requires an exact, character-for-character verbatim quote directly from the input text before the risk critique is accepted. If the generated quote does not substring-match the source document within an exact fuzzy Levenshtein distance of zero, the finding is discarded by an automated verification step before reaching the UI.',
      },
      {
        question: 'How does your prompt architecture handle ambiguous legal phrases like "reasonable best efforts"?',
        interviewerIntent: 'Testing domain-specific prompt engineering and in-context evaluation design.',
        recommendedAnswer:
          'We supply a structured enterprise legal playbook directly in the system instructions. The playbook defines specific objective benchmarks (e.g., "commercially reasonable efforts" is acceptable for standard SLA repair, but unacceptable for data privacy breach remediation where "strict absolute liability" is required).',
      },
    ],
    sampleInputs: [
      {
        name: 'Uncapped Consequential Liability & AI Scraping Trap',
        description: 'Vendor agreement sneaking in model training rights and asymmetric unlimited liability carve-outs.',
        payload: {
          contractType: 'Enterprise Cloud SaaS Master Agreement',
          clauseText:
            'Section 11.2: Limitations of Liability. EXCEPT FOR CUSTOMER INDEMNIFICATION OBLIGATIONS UNDER SECTION 14 AND LOSS OF OR DAMAGE TO DATA, NEITHER PARTY SHALL BE LIABLE FOR INDIRECT OR CONSEQUENTIAL DAMAGES. VENDOR MAXIMUM AGGREGATE LIABILITY FOR ALL CLAIMS ARISING UNDER THIS AGREEMENT SHALL NOT EXCEED $5,000 OR TOTAL FEES PAID IN THE 1 MONTH PRECEDING THE CLAIM. Section 15.4: Model Optimization. Customer grants Vendor a perpetual, irrevocable, royalty-free license to utilize Customer content, telemetry, and system prompts to enhance and calibrate Vendor machine learning models and automated commercial algorithms.',
        },
      },
      {
        name: 'Aggressive SLA 7-Day Forfeiture Clause',
        description: 'SLA clause that nullifies downtime credits unless claimed within an unrealistic 7 calendar day window.',
        payload: {
          contractType: 'Service Level Agreement (SLA) Addendum',
          clauseText:
            'Section 4.1: Availability Commitments. Vendor targets 99.5% monthly availability. In the event of service degradation, Customer sole and exclusive remedy shall be a 3% service fee credit applied against the subsequent billing cycle. To qualify for credits, Customer must provide written notice via registered postal mail within seven (7) calendar days of the initial event with third-party verified traceroute logs. Failure to submit within 7 days constitutes an absolute and irrevocable waiver of all remedies.',
        },
      },
    ],
    endpoint: '/api/ai/contract-audit',
  },
  {
    id: 'code-diagnostic',
    title: 'Multimodal Diagnostic & Automated Code Patch Recommender',
    tagline: 'Correlates error logs, UI bug traces, and Git repos to synthesize verified bug patches and regression tests',
    category: 'multimodal',
    complexity: 'Staff-Level',
    targetRoles: ['Full-Stack AI Engineer', 'Developer Experience Engineer', 'Core Backend Architect'],
    keyMetric: '78%',
    metricLabel: 'First-Pass Patch Acceptance Rate in CI',
    summary:
      'An automated developer productivity agent that diagnoses complex distributed bugs across frontend and backend tiers. It synthesizes terminal stack traces, system architecture context, and recent Git commits to generate production-ready Git diff patches and accompanying unit test suites.',
    architectureSummary:
      'When an exception occurs in staging or production, telemetry capture packages the stack trace, relevant source files from GitHub, and runtime state. The Diagnostic Agent diagnoses race conditions, nil pointers, or schema drift, generating a unified diff patch and a reproduction test that verifies the fix before opening a Pull Request.',
    asciiDiagram: `┌────────────────────────────────────────────────────────────────────────┐
│                     CODE DIAGNOSTIC & PATCH ENGINE                     │
│                                                                        │
│   [Runtime Error / Sentry Trace] ──┐                                   │
│   [Git Commit Diff & AST] ─────────┼──▶ [Context Synthesizer]          │
│   [Service Configuration] ─────────┘               │                   │
│                                                    ▼                   │
│                                        ┌───────────────────────┐       │
│                                        │ Diagnostic Reasoning  │       │
│                                        │ (Gemini 3.8 Flash)    │       │
│                                        └───────────┬───────────┘       │
│                                                    │                   │
│                                                    ▼                   │
│   [Automated GitHub PR] ◀── [Sandbox CI Test] ◀── [Unified Diff Patch] │
│   (Ready for Staff Review)  (Regression Test)     (Clean Git Format)   │
└────────────────────────────────────────────────────────────────────────┘`,
    productionStack: [
      { category: 'AI & Inference', technologies: ['Gemini 3.8 Flash', 'Few-Shot AST Diff Templates', 'Unified Diff Syntax'] },
      { category: 'DevOps & Tooling', technologies: ['GitHub REST & GraphQL API', 'Docker Isolated Runner', 'Sentry Webhooks'] },
      { category: 'Languages & Runtime', technologies: ['Go / TypeScript / Python', 'Node.js 22', 'FastAPI'] },
      { category: 'Testing', technologies: ['Vitest / Pytest / Go Test', 'Ephemeral Test Containers'] },
    ],
    keyTradeoffs: [
      {
        decision: 'Unified Git Diff output vs whole-file rewrites',
        rationale: 'Regenerating entire 1,000-line source files burns unnecessary tokens and risks collateral deletions of unrelated code. Unified diffs are concise, token-efficient, and cleanly integrate with Git merge tooling.',
        alternativeDiscarded: 'Full-file code regeneration via conversational markdown blocks.',
      },
      {
        decision: 'Mandatory reproduction unit test generation paired with every patch',
        rationale: 'A proposed code fix is untrustworthy without automated verification. Generating a failing test that passes after applying the diff provides mathematical proof of correctness.',
        alternativeDiscarded: 'Unverified code suggestions without automated unit test generation.',
      },
    ],
    resumeBullets: [
      {
        category: 'Impact',
        bullet:
          'Created an autonomous bug diagnostic and patch synthesizer using Gemini 3.8 Flash and GitHub Actions, resolving 78% of reproducible staging defects with zero human code writing required.',
        metrics: '78% patch acceptance rate',
      },
      {
        category: 'Architecture',
        bullet:
          'Engineered a context-pruning engine that parses Abstract Syntax Trees (ASTs) to feed only targeted function scopes and call graphs to the LLM, reducing token overhead by 73% per diagnostic run.',
        metrics: '73% reduction in token overhead per diagnosis',
      },
      {
        category: 'Optimization',
        bullet:
          'Built an isolated Docker ephemeral sandbox to execute generated reproduction tests against unified diff patches, blocking 100% of non-compiling or regression-inducing AI proposals.',
        metrics: 'Zero broken builds deployed to staging',
      },
    ],
    interviewQA: [
      {
        question: 'How do you prevent the AI from generating patches that introduce subtle security vulnerabilities like SQL injections?',
        interviewerIntent: 'Testing security engineering, static analysis integration, and defensive CI checks.',
        recommendedAnswer:
          'All generated diff patches pass through an automated static security analysis gate (Semgrep and CodeQL) inside an isolated ephemeral container before any pull request is opened. Furthermore, our system instructions explicitly enforce secure coding standards (parameterized queries, input sanitization, and explicit mutex locking for concurrent memory access).',
      },
      {
        question: 'How do you handle massive codebases where the relevant code exceeds the model’s context window?',
        interviewerIntent: 'Testing semantic code search, AST traversal, and context engineering.',
        recommendedAnswer:
          'We do not dump raw files into the prompt. Instead, we parse the stack trace to extract exact file paths and line numbers, traverse the AST to identify the enclosing method and its callers/callees, and retrieve relevant type definitions using language server protocol (LSP) symbols. This packages an optimal 2k-token surgical context package rather than 50k tokens of raw repository bloat.',
      },
    ],
    sampleInputs: [
      {
        name: 'Concurrent Mutex Race in Token Manager (Go)',
        description: 'High-throughput OAuth token refresh routine missing read-write lock, throwing nil dereference.',
        payload: {
          systemContext: 'Go 1.22 microservice, 15,000 requests/sec, distributed auth proxy',
          stackTrace: `panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x72a91b]

goroutine 48102 [running]:
services/auth.(*TokenManager).GetToken(0xc00041a000, {0x832100, 0xc000102140})
	/app/services/auth/token_manager.go:142 +0x6b
services/gateway.(*ProxyHandler).ServeHTTP(0xc00012e080, {0x8f2200, 0xc00021e0e0}, 0xc000304100)
	/app/services/gateway/proxy.go:88 +0x145`,
          codeSnippet: `func (tm *TokenManager) GetToken(ctx context.Context) (string, error) {
	if tm.token == nil || time.Now().After(tm.expiresAt) {
		return tm.refreshToken(ctx)
	}
	return tm.token.AccessToken, nil
}`,
        },
      },
      {
        name: 'Async Promise.all Unhandled Rejection in Payment Webhook (Node.js)',
        description: 'Uncaught async rejection crashing the process when external Stripe webhook payload fails validation.',
        payload: {
          systemContext: 'Node.js 20 ESM, Fastify, Stripe API v2024, AWS ECS Fargate',
          stackTrace: `(node:1) UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().
Error: Duplicate idempotency key: evt_1Oxyz9921 for customer cus_99182
    at WebhookProcessor.processPayment (/app/dist/workers/webhook.js:84:15)
    at async Promise.all (index 3)
    at async RouteHandler.handleEvent (/app/dist/routes/stripe.js:42:7)`,
          codeSnippet: `export async function handleBatchWebhooks(events) {
  const results = await Promise.all(events.map(async (evt) => {
    return await processPayment(evt);
  }));
  return { processed: results.length };
}`,
        },
      },
    ],
    endpoint: '/api/ai/code-diagnostic',
  },
  {
    id: 'corrective-rag',
    title: 'Self-Correcting Enterprise RAG with Hallucination Guardrails',
    tagline: 'Multi-query rewriting, dense/lexical hybrid reranking, and citation provenance verification',
    category: 'rag',
    complexity: 'Advanced',
    targetRoles: ['AI Systems Engineer', 'Applied LLM Scientist', 'Search & Information Retrieval Engineer'],
    keyMetric: '99.4%',
    metricLabel: 'Factual Accuracy on Internal Tech Specs',
    summary:
      'An enterprise knowledge retrieval architecture that solves the catastrophic failure modes of naive RAG (irrelevant vector chunks, hallucinations, and outdated docs). It implements iterative query reformulation, hybrid dense/sparse search with Cross-Encoder reranking, and self-reflective hallucination grading before emitting grounded answers with exact source citations.',
    architectureSummary:
      'Incoming user queries are analyzed for ambiguity and broken into sub-queries. BM25 and dense vector embeddings (Pinecone/pgvector) query the document store. A Cross-Encoder reranks the top 20 chunks to the top 4. A Gemini 3.8 Flash evaluator grades chunk relevance; if relevance is insufficient, it rewrites the query or triggers a fallback search. Finally, citations are verified against source spans.',
    asciiDiagram: `┌────────────────────────────────────────────────────────────────────────┐
│                      SELF-CORRECTING RAG PIPELINE                      │
│                                                                        │
│   [User Query] ──▶ [Query Reformulation & Expansion]                   │
│                                   │                                    │
│                                   ▼                                    │
│                [Hybrid Search: Dense Vector + BM25 Sparse]             │
│                                   │                                    │
│                                   ▼                                    │
│                         [Cross-Encoder Reranker]                       │
│                                   │ (Top 4 Chunks)                     │
│                                   ▼                                    │
│                      [Document Relevance Evaluator]                    │
│                      ├── Low Relevance? ──▶ [Query Rewrite Loop]       │
│                      └── High Relevance?                               │
│                                   │                                    │
│                                   ▼                                    │
│                     [Grounded Synthesis + Citation]                    │
│                     (Gemini 3.8 Flash with Fact Check)                 │
└────────────────────────────────────────────────────────────────────────┘`,
    productionStack: [
      { category: 'AI & Inference', technologies: ['Gemini 3.8 Flash', 'Google GenAI SDK', 'Sentence-Transformers / Cohere Rerank'] },
      { category: 'Retrieval & DB', technologies: ['pgvector (PostgreSQL)', 'BM25 Lexical Index', 'Hybrid Reciprocal Rank Fusion (RRF)'] },
      { category: 'Orchestration', technologies: ['Python FastAPI / LangChain / LlamaIndex Core', 'Pydantic v2', 'Celery'] },
      { category: 'Evaluation', technologies: ['Ragas / TruLens Framework', 'Automated Groundedness Evals'] },
    ],
    keyTradeoffs: [
      {
        decision: 'Hybrid Dense + BM25 Sparse search with Reciprocal Rank Fusion (RRF)',
        rationale: 'Dense semantic search often fails on exact alphanumeric serial numbers, error codes, and API endpoints (e.g. "CVE-2024-3094"). BM25 captures exact token matches while dense embeddings capture conceptual synonyms.',
        alternativeDiscarded: 'Pure vector similarity search without lexical indexing.',
      },
      {
        decision: 'Self-reflective document relevance evaluation loop',
        rationale: 'Naive RAG blindly feeds the top-K chunks to the generator even when retrieval was poor, causing the model to hallucinate or fabricate plausibility. Explicit relevance gating forces a rewrite or honest admission of missing data.',
        alternativeDiscarded: 'Single-pass pass-through RAG pipeline.',
      },
    ],
    resumeBullets: [
      {
        category: 'Impact',
        bullet:
          'Constructed an enterprise Self-Correcting RAG engine using Gemini 3.8 Flash, pgvector, and hybrid BM25 search, elevating factual retrieval accuracy from 71% to 99.4% across 180k internal technical documents.',
        metrics: '99.4% factual accuracy',
      },
      {
        category: 'Architecture',
        bullet:
          'Implemented Reciprocal Rank Fusion (RRF) and Cross-Encoder reranking over dense and lexical indexes, boosting Top-3 retrieval recall by 38% for domain-specific technical jargon and API codes.',
        metrics: '+38% Top-3 retrieval recall',
      },
      {
        category: 'Optimization',
        bullet:
          'Designed an automated hallucination evaluation loop that cross-references generated answers against exact source character spans, completely eliminating ungrounded claims in client-facing documentation.',
        metrics: '0 ungrounded claims across 5,000 benchmark queries',
      },
    ],
    interviewQA: [
      {
        question: 'Why not just use a larger context window (like Gemini 1M/2M tokens) and dump the entire repository instead of building RAG?',
        interviewerIntent: 'Testing context economics, latency constraints, and production cost discipline.',
        recommendedAnswer:
          'While long context windows are incredible for deep document synthesis, sending 1 million tokens on every user search request costs several dollars per query and incurs 10-30 seconds of latency. For an enterprise handling 50,000 queries per day, that equates to hundreds of thousands of dollars in compute. Hybrid RAG with Cross-Encoder reranking serves answers in sub-800ms for a fraction of a cent per query, while dynamic long-context is reserved for deep batch summarization.',
      },
      {
        question: 'How do you measure and evaluate your RAG pipeline systematically?',
        interviewerIntent: 'Testing familiarity with AI evaluation frameworks, synthetic datasets, and regression testing.',
        recommendedAnswer:
          'We evaluate across three discrete dimensions using the Ragas framework: 1) Faithfulness (is the answer grounded in the retrieved context?), 2) Answer Relevance (does it answer the user prompt?), and 3) Context Precision (did the reranker rank relevant chunks above noise?). We maintain an automated CI test suite of 200 curated golden QA pairs that runs on every prompt or embedding change.',
      },
    ],
    sampleInputs: [
      {
        name: 'Multi-Region VPC Latency & Disaster Recovery SLA',
        description: 'Queries complex inter-region network guarantees and automated BGP route reconvergence limits.',
        payload: {
          userQuery: 'What are our guaranteed p99 network latency SLAs for inter-region VPC peering between us-east-1 and eu-west-1, and what happens to packet flows if the primary direct connect circuit degrades?',
          corpus: 'Enterprise Cloud Architecture SLA Handbook v3.4 (Sections 4.1 to 6.2 covering Direct Connect, Transit Gateways, BGP MED, and IPSec fallback tunnels).',
        },
      },
      {
        name: 'Database Migration Zero-Downtime Replication Protocol',
        description: 'Inquires about replication lag ceilings and cutover procedures from Postgres 14 to Aurora 16.',
        payload: {
          userQuery: 'What is the maximum allowed replication lag ceiling before triggering the write-traffic freeze during the PostgreSQL 14 to Aurora 16 cutover?',
          corpus: 'Database Engineering Runbook #409: Blue/Green Aurora Migration & Logical Replication Invariants.',
        },
      },
    ],
    endpoint: '/api/ai/self-rag-query',
  },
];
