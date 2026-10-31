import React, { useState } from 'react';
import { Sparkles, Copy, Check, Clock, Briefcase, Target, Building2, Terminal, HelpCircle } from 'lucide-react';
import { ENTERPRISE_PROJECTS } from '../data/projectsData';

export const ResumeTailorView: React.FC = () => {
  const [currentRole, setCurrentRole] = useState('Senior Backend Engineer');
  const [targetRole, setTargetRole] = useState('Staff AI / Applied LLM Engineer');
  const [yearsOfExp, setYearsOfExp] = useState('5 years');
  const [targetCompany, setTargetCompany] = useState('Tier-1 Tech & Enterprise SaaS (Datadog, Stripe, Anthropic)');
  const [selectedProjectId, setSelectedProjectId] = useState(ENTERPRISE_PROJECTS[0].id);
  const [specificTech, setSpecificTech] = useState('Python, FastAPI, Kafka, Kubernetes, Gemini 3.8 Flash, OpenTelemetry');

  const [isLoading, setIsLoading] = useState(false);
  const [tailorResult, setTailorResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedProject = ENTERPRISE_PROJECTS.find((p) => p.id === selectedProjectId) || ENTERPRISE_PROJECTS[0];

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const applyPreset = (preset: {
    cur: string;
    tgt: string;
    exp: string;
    comp: string;
    proj: string;
    tech: string;
  }) => {
    setCurrentRole(preset.cur);
    setTargetRole(preset.tgt);
    setYearsOfExp(preset.exp);
    setTargetCompany(preset.comp);
    setSelectedProjectId(preset.proj);
    setSpecificTech(preset.tech);
    setTailorResult(null);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/ai/tailor-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentRole,
          targetRole,
          yearsOfExp,
          targetCompany,
          selectedProject: selectedProject.title,
          specificTech,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume bullets');
      }

      const data = await response.json();
      setTailorResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Resume Bullet & Interview Architect</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tailor These Projects For Your Exact Career Profile
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Generate customized, quantified Google X-Y-Z formula resume bullets and strategic interview defense talking points tuned to your experience level and target company.
          </p>
        </div>

        {/* Instant Career Presets */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
            Quick Career Transition Presets:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                applyPreset({
                  cur: 'Backend / SRE Engineer',
                  tgt: 'Staff AI Platform Engineer',
                  exp: '6 years',
                  comp: 'Datadog, Cloudflare, OpenAI Platform',
                  proj: 'incident-triage',
                  tech: 'Go, Kafka, Gemini 3.8 Flash, Kubernetes Operator, Prometheus',
                })
              }
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              Backend / SRE ➔ AI Platform Engineer
            </button>

            <button
              onClick={() =>
                applyPreset({
                  cur: 'Full-Stack Developer',
                  tgt: 'Applied AI Product Engineer',
                  exp: '3 years',
                  comp: 'Stripe, Notion, Enterprise Legal Tech',
                  proj: 'contract-risk',
                  tech: 'TypeScript, React 19, FastAPI, Gemini 3.8 Flash, Pydantic, PostgreSQL',
                })
              }
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              Full-Stack ➔ Applied AI Engineer
            </button>

            <button
              onClick={() =>
                applyPreset({
                  cur: 'Data Engineer / Scientist',
                  tgt: 'RAG & Knowledge Systems Architect',
                  exp: '4 years',
                  comp: 'Snowflake, Databricks, Enterprise FinTech',
                  proj: 'corrective-rag',
                  tech: 'Python, pgvector, Gemini 3.8 Flash, BM25, Cross-Encoders, LangChain',
                })
              }
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              Data Science ➔ RAG Architect
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Form & Results Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form (5 columns) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Your Profile & Target Focus
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Selected Enterprise Project Architecture
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
            >
              {ENTERPRISE_PROJECTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Role
              </label>
              <input
                type="text"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Years of Experience
              </label>
              <input
                type="text"
                value={yearsOfExp}
                onChange={(e) => setYearsOfExp(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Role & Level
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Companies or Industry
            </label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Core Tech Stack to Emphasize
            </label>
            <textarea
              rows={2}
              value={specificTech}
              onChange={(e) => setSpecificTech(e.target.value)}
              className="w-full text-xs font-mono px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Synthesizing Tailored Resume Bullets...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Tailored STAR Bullets</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Pane (7 columns) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-5 min-h-[440px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Tailored Resume Portfolio Deliverables
            </span>
            {tailorResult && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono tabular-nums text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{tailorResult.latencyMs || 420}ms</span>
              </span>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-700 dark:text-rose-300">
              {errorMsg}
            </div>
          )}

          {!tailorResult && !isLoading && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-3">
                <Briefcase className="w-6 h-6" />
              </div>
              <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Configure Profile and Click Generate
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                You can pick one of the quick career transition presets on the top left or adjust your stack to receive bespoke, recruiter-tested bullet points.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="space-y-4 py-8">
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-2/3" />
              <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          )}

          {tailorResult && (
            <div className="space-y-6 text-xs">
              {/* Bullets */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
                    Tailored Google X-Y-Z Resume Bullets:
                  </span>
                  <button
                    onClick={() => {
                      const text = tailorResult.tailoredBullets.map((b: string) => `• ${b}`).join('\n\n');
                      copyToClipboard(text, 'all-tailored');
                    }}
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {copiedKey === 'all-tailored' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'all-tailored' ? 'All Copied' : 'Copy All'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {tailorResult.tailoredBullets?.map((bullet: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-lg group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-slate-800 dark:text-slate-100 leading-relaxed font-sans text-xs">
                          {bullet}
                        </p>
                        <button
                          onClick={() => copyToClipboard(bullet, `tailored-${idx}`)}
                          className="shrink-0 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                        >
                          {copiedKey === `tailored-${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Talking Points */}
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider block mb-3">
                  Tailored Interview Defense Points:
                </span>
                <div className="space-y-3">
                  {tailorResult.interviewTalkingPoints?.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-lg space-y-1.5"
                    >
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{item.question}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-5 text-[11px]">
                        {item.talkingPoint}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Design Defense Tip */}
              {tailorResult.systemDesignDefense && (
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                  <span className="font-bold text-indigo-900 dark:text-indigo-200 text-xs block mb-1">
                    System Design Board Tip:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                    {tailorResult.systemDesignDefense}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
