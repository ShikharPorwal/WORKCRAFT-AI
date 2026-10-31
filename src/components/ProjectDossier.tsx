import React, { useState } from 'react';
import { ArrowLeft, Check, Copy, Play, Layers, Code, FileText, HelpCircle, Shield, Cpu } from 'lucide-react';
import { EnterpriseProject } from '../types';
import { LiveWorkflowRunner } from './LiveWorkflowRunner';

interface ProjectDossierProps {
  project: EnterpriseProject;
  onBack: () => void;
  initialTab?: 'architecture' | 'stack' | 'bullets' | 'interview' | 'demo';
}

export const ProjectDossier: React.FC<ProjectDossierProps> = ({
  project,
  onBack,
  initialTab = 'architecture',
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'stack' | 'bullets' | 'interview' | 'demo'>(initialTab);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Back Button */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[11px]">
            {project.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{project.complexity}</span>
        </div>
      </div>

      {/* Hero Dossier Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.tagline}
            </p>

            {/* Target Roles */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="font-medium text-slate-700 dark:text-slate-300">Resume Target Roles:</span>
              <div className="flex items-center gap-1.5">
                {project.targetRoles.map((role, idx) => (
                  <React.Fragment key={role}>
                    <span>{role}</span>
                    {idx < project.targetRoles.length - 1 && <span className="text-slate-400">/</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Quantified Impact Banner */}
          <div className="shrink-0 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 text-center min-w-[220px]">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Quantified Outcome
            </div>
            <div className="font-mono tabular-nums text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {project.keyMetric}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
              {project.metricLabel}
            </div>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-t border-slate-100 dark:border-slate-800 mt-6 pt-4">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'architecture'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>System Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'demo'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Live Interactive Demo</span>
          </button>

          <button
            onClick={() => setActiveTab('bullets')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'bullets'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume STAR Bullets</span>
          </button>

          <button
            onClick={() => setActiveTab('stack')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'stack'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Production Stack</span>
          </button>

          <button
            onClick={() => setActiveTab('interview')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'interview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interview Defense & QA</span>
          </button>
        </div>
      </div>

      {/* Tab 1: System Architecture */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          {/* Architecture Summary */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2">
              System Topology & End-to-End Flow
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {project.architectureSummary}
            </p>

            {/* ASCII System Diagram */}
            <div className="relative">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                <span>COMPONENT TOPOLOGY DIAGRAM</span>
                <button
                  onClick={() => copyToClipboard(project.asciiDiagram, 'ascii')}
                  className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  {copiedKey === 'ascii' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'ascii' ? 'Copied' : 'Copy Diagram'}</span>
                </button>
              </div>
              <pre className="p-4 sm:p-5 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                {project.asciiDiagram}
              </pre>
            </div>
          </div>

          {/* Key Architectural Trade-offs & Decisions */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-4">
              Critical Engineering Trade-offs & Rationale
            </h3>
            <div className="space-y-4">
              {project.keyTradeoffs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl"
                >
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">
                    {idx + 1}. {item.decision}
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                    <span className="font-semibold text-slate-900 dark:text-slate-200">Rationale: </span>
                    {item.rationale}
                  </div>
                  <div className="text-xs text-rose-600 dark:text-rose-400 font-mono">
                    <span className="font-sans font-semibold">Discarded Alternative: </span>
                    {item.alternativeDiscarded}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Live Demo */}
      {activeTab === 'demo' && (
        <LiveWorkflowRunner project={project} />
      )}

      {/* Tab 3: Resume STAR Bullets */}
      {activeTab === 'bullets' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                Google X-Y-Z Formula Resume Bullets
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Formulated as: "Accomplished [X] as measured by [Y], by doing [Z]" for immediate ATS and hiring manager appeal.
              </p>
            </div>
            <button
              onClick={() => {
                const allBullets = project.resumeBullets.map((b) => `• ${b.bullet}`).join('\n\n');
                copyToClipboard(allBullets, 'all-bullets');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copiedKey === 'all-bullets' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'all-bullets' ? 'All Bullets Copied!' : 'Copy All Bullets'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {project.resumeBullets.map((b, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    <span className="uppercase tracking-wider text-[11px]">{b.category} Focus</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {b.metrics}
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(b.bullet, `bullet-${idx}`)}
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {copiedKey === `bullet-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === `bullet-${idx}` ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-sm text-slate-800 dark:text-slate-100 font-sans leading-relaxed">
                  {b.bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Production Stack */}
      {activeTab === 'stack' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-1">
              Production Stack & Infrastructure Topology
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The exact enterprise tooling choices and libraries you should highlight in your technical interview.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.productionStack.map((tier) => (
              <div
                key={tier.category}
                className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
                  {tier.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tier.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Interview Defense & QA */}
      {activeTab === 'interview' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-1">
              Hiring Manager & Staff Engineer Technical Defense
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The toughest probing questions interviewers ask during the technical deep-dive and how to answer them with authority.
            </p>
          </div>

          <div className="space-y-5">
            {project.interviewQA.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl space-y-3"
              >
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">Q{idx + 1}:</span>
                  <span>{item.question}</span>
                </div>

                <div className="p-2.5 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-lg text-xs text-indigo-900 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-900/60">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-indigo-600 dark:text-indigo-400 block mb-0.5">
                    What Interviewers Are Really Looking For:
                  </span>
                  {item.interviewerIntent}
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">
                    Bulletproof Model Answer:
                  </span>
                  {item.recommendedAnswer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
