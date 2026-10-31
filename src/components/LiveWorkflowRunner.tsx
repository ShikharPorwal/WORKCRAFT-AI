import React, { useState } from 'react';
import { Play, RotateCcw, Check, Copy, Clock, ShieldCheck, AlertTriangle, Code2, Sparkles, Terminal } from 'lucide-react';
import { EnterpriseProject, SampleInput } from '../types';

interface LiveWorkflowRunnerProps {
  project: EnterpriseProject;
}

export const LiveWorkflowRunner: React.FC<LiveWorkflowRunnerProps> = ({ project }) => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [formData, setFormData] = useState<any>(project.sampleInputs[0]?.payload || {});
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showRawJson, setShowRawJson] = useState(false);

  const handleSelectSample = (index: number) => {
    setSelectedSampleIndex(index);
    setFormData(project.sampleInputs[index]?.payload || {});
    setExecutionResult(null);
    setExecutionError(null);
  };

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const runWorkflow = async () => {
    setIsRunning(true);
    setExecutionError(null);
    try {
      const response = await fetch(project.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Workflow execution failed (status ${response.status})`);
      }

      const data = await response.json();
      setExecutionResult(data);
    } catch (err: any) {
      setExecutionError(err.message || 'Error executing enterprise workflow');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sample Scenario Selector Strip */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select Enterprise Test Case
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Preloaded with real-world production incident logs, contracts, and stack traces.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {project.sampleInputs.map((sample, idx) => (
              <button
                key={sample.name}
                onClick={() => handleSelectSample(idx)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedSampleIndex === idx
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {sample.name}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-400 italic">
          "{project.sampleInputs[selectedSampleIndex]?.description}"
        </div>
      </div>

      {/* Two-Column Workbench Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Input Form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Workflow Inputs
              </span>
            </div>
            <button
              onClick={() => handleSelectSample(selectedSampleIndex)}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Sample</span>
            </button>
          </div>

          {/* Dynamic Input Fields depending on project */}
          {project.id === 'incident-triage' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Service Context
                </label>
                <input
                  type="text"
                  value={formData.serviceContext || ''}
                  onChange={(e) => handleFieldChange('serviceContext', e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Production Incident Logs & Stack Traces
                </label>
                <textarea
                  rows={9}
                  value={formData.logs || ''}
                  onChange={(e) => handleFieldChange('logs', e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-y"
                  placeholder="Paste cluster logs here..."
                />
              </div>
            </>
          )}

          {project.id === 'contract-risk' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contract Agreement Type
                </label>
                <input
                  type="text"
                  value={formData.contractType || ''}
                  onChange={(e) => handleFieldChange('contractType', e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contractual Clauses & Terms
                </label>
                <textarea
                  rows={9}
                  value={formData.clauseText || ''}
                  onChange={(e) => handleFieldChange('clauseText', e.target.value)}
                  className="w-full text-xs font-sans px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-y"
                  placeholder="Paste legal contract clause text here..."
                />
              </div>
            </>
          )}

          {project.id === 'code-diagnostic' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Architecture & Microservice Context
                </label>
                <input
                  type="text"
                  value={formData.systemContext || ''}
                  onChange={(e) => handleFieldChange('systemContext', e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Terminal Exception / Stack Trace
                </label>
                <textarea
                  rows={5}
                  value={formData.stackTrace || ''}
                  onChange={(e) => handleFieldChange('stackTrace', e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Suspect Source Code Snippet
                </label>
                <textarea
                  rows={4}
                  value={formData.codeSnippet || ''}
                  onChange={(e) => handleFieldChange('codeSnippet', e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                />
              </div>
            </>
          )}

          {project.id === 'corrective-rag' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  User Technical Knowledge Query
                </label>
                <input
                  type="text"
                  value={formData.userQuery || ''}
                  onChange={(e) => handleFieldChange('userQuery', e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Knowledge Corpus / Standard SLA References
                </label>
                <textarea
                  rows={8}
                  value={formData.corpus || ''}
                  onChange={(e) => handleFieldChange('corpus', e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-y"
                />
              </div>
            </>
          )}

          {/* Trigger Button */}
          <div className="pt-2">
            <button
              onClick={runWorkflow}
              disabled={isRunning}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {isRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Executing Gemini 3.8 Flash Workflow...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Enterprise Workflow</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Structured Live Results */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4 min-h-[480px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Structured Execution Output
              </span>
            </div>

            {executionResult && (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{executionResult.latencyMs || 380}ms</span>
                </span>

                <button
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  {showRawJson ? 'Formatted View' : 'Raw JSON'}
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {executionError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>{executionError}</div>
            </div>
          )}

          {/* Empty Zero-State */}
          {!executionResult && !isRunning && !executionError && (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                <Code2 className="w-6 h-6" />
              </div>
              <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Ready to Execute Pipeline
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                Click "Run Enterprise Workflow" to trigger the live server-side Gemini 3.8 Flash pipeline and inspect deterministic structured outputs.
              </p>
            </div>
          )}

          {/* Loading Skeleton */}
          {isRunning && (
            <div className="space-y-3 py-8">
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-3/4" />
              <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-28 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          )}

          {/* Raw JSON View */}
          {executionResult && showRawJson && (
            <pre className="text-xs font-mono p-3 bg-slate-950 text-emerald-400 rounded-lg overflow-x-auto max-h-[460px]">
              {JSON.stringify(executionResult, null, 2)}
            </pre>
          )}

          {/* Formatted View: 1. Incident Triage */}
          {executionResult && !showRawJson && project.id === 'incident-triage' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg">
                <div>
                  <div className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-semibold">
                    {executionResult.incidentId} · {executionResult.severity}
                  </div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                    {executionResult.title}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500">Confidence</div>
                  <div className="font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {executionResult.confidenceScore}%
                  </div>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Root Cause:</span>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  {executionResult.rootCause}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Impact Radius:</span>
                <p className="mt-1 text-slate-600 dark:text-slate-400 font-mono">
                  {executionResult.impactRadius}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Automated Mitigation Runbook (Deterministic OPA Approved)
                  </span>
                </div>
                <div className="space-y-2">
                  {executionResult.mitigationPlan?.map((step: any) => (
                    <div
                      key={step.step}
                      className="p-2.5 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] border border-slate-800"
                    >
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span>Step {step.step}: {step.action}</span>
                        <span className="tabular-nums text-indigo-400">~{step.estimatedRecoverySec}s</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 text-emerald-300">
                        <code>{step.command}</code>
                        <button
                          onClick={() => copyToClipboard(step.command, `step-${step.step}`)}
                          className="p-1 hover:text-white cursor-pointer"
                        >
                          {copiedKey === `step-${step.step}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-lg">
                <span className="font-semibold text-indigo-900 dark:text-indigo-200 block mb-1">
                  Architectural Prevention:
                </span>
                <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {executionResult.preventativeAction}
                </span>
              </div>
            </div>
          )}

          {/* Formatted View: 2. Contract Risk */}
          {executionResult && !showRawJson && project.id === 'contract-risk' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg">
                <div>
                  <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase">
                    Risk Assessment: {executionResult.riskLevel}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 text-xs mt-1">
                    {executionResult.summary}
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-[10px] text-slate-500">Safety Score</div>
                  <div className="font-mono tabular-nums font-bold text-amber-600 dark:text-amber-400 text-base">
                    {executionResult.auditScore}/100
                  </div>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Identified High-Liability Traps:
                </span>
                <div className="space-y-2.5">
                  {executionResult.identifiedRisks?.map((risk: any, i: number) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{risk.category}</span>
                        <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400 font-semibold">
                          {risk.severity} Severity
                        </span>
                      </div>
                      <div className="text-slate-500 italic mb-1.5 text-[11px]">
                        "{risk.quote}"
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {risk.critique}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Recommended Hardened Redline:
                  </span>
                  <button
                    onClick={() => copyToClipboard(executionResult.recommendedRedline, 'redline')}
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {copiedKey === 'redline' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'redline' ? 'Copied' : 'Copy Redline'}</span>
                  </button>
                </div>
                <p className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 rounded-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                  {executionResult.recommendedRedline}
                </p>
              </div>

              <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                Estimated Exposure: {executionResult.financialExposureEstimate}
              </div>
            </div>
          )}

          {/* Formatted View: 3. Code Diagnostic */}
          {executionResult && !showRawJson && project.id === 'code-diagnostic' && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  {executionResult.vulnerabilityCWE}
                </div>
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                  {executionResult.issueType}
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {executionResult.diagnosticSummary}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Synthesized Git Diff Patch:
                  </span>
                  <button
                    onClick={() => copyToClipboard(executionResult.diffPatch, 'diff')}
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {copiedKey === 'diff' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'diff' ? 'Copied Diff' : 'Copy Patch'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 text-slate-200 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  {executionResult.diffPatch}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Generated Regression Unit Test:
                  </span>
                  <button
                    onClick={() => copyToClipboard(executionResult.unitTestCode, 'unittest')}
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {copiedKey === 'unittest' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'unittest' ? 'Copied' : 'Copy Test'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 text-emerald-300 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  {executionResult.unitTestCode}
                </pre>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  Architectural Advisory:
                </span>
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {executionResult.architecturalAdvice}
                </span>
              </div>
            </div>
          )}

          {/* Formatted View: 4. Corrective RAG */}
          {executionResult && !showRawJson && project.id === 'corrective-rag' && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg">
                <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                  Query Reformulation Pipeline (Multi-Query Expansion)
                </div>
                <div className="space-y-1">
                  {executionResult.reformulatedQueries?.map((q: string, i: number) => (
                    <div key={i} className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">
                      • {q}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500">Filtered Relevance Chunks</div>
                  <div className="font-mono tabular-nums font-bold text-slate-900 dark:text-white text-sm">
                    {executionResult.retrievalEvaluation?.relevantChunksFiltered} / {executionResult.retrievalEvaluation?.totalChunksExamined}
                  </div>
                </div>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Grounding Score</div>
                  <div className="font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {(executionResult.retrievalEvaluation?.groundingScore * 100).toFixed(0)}% Fact-Checked
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Self-Grounded Synthesized Answer:
                  </span>
                  <button
                    onClick={() => copyToClipboard(executionResult.synthesizedAnswer, 'raganswer')}
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {copiedKey === 'raganswer' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'raganswer' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                  {executionResult.synthesizedAnswer}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Verified Citation Provenance:
                </span>
                <div className="space-y-1.5">
                  {executionResult.citations?.map((c: any, i: number) => (
                    <div
                      key={i}
                      className="p-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between text-[11px]"
                    >
                      <div className="text-slate-800 dark:text-slate-200 font-medium">
                        [{i + 1}] {c.source} <span className="text-slate-500 font-normal">· {c.section}</span>
                      </div>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 text-[10px]">
                        {c.confidence}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
