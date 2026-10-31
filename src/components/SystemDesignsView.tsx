import React from 'react';
import { ArrowRight, Layers, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { ENTERPRISE_PROJECTS } from '../data/projectsData';
import { EnterpriseProject } from '../types';

interface SystemDesignsViewProps {
  onSelectProject: (project: EnterpriseProject) => void;
  onLaunchDemo: (project: EnterpriseProject) => void;
}

export const SystemDesignsView: React.FC<SystemDesignsViewProps> = ({
  onSelectProject,
  onLaunchDemo,
}) => {
  return (
    <div className="space-y-8">
      {/* Overview Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>AI Systems Architecture & Evaluation Playbook</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Enterprise System Designs & Evaluation Matrices
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The architectural patterns, trade-off rubrics, and latency/cost benchmarks you need to articulate with authority in Staff-level AI system design interviews.
          </p>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm overflow-hidden">
        <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-4">
          Architectural Patterns & Trade-Off Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-mono text-[11px]">
                <th className="py-3 px-3 font-semibold">Project & Pattern</th>
                <th className="py-3 px-3 font-semibold">Primary Failure Mode Solved</th>
                <th className="py-3 px-3 font-semibold">Key Safety Guardrail</th>
                <th className="py-3 px-3 font-semibold text-right">Resume Metric</th>
                <th className="py-3 px-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ENTERPRISE_PROJECTS.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{p.title}</div>
                    <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono uppercase mt-0.5">
                      {p.category} · {p.complexity}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 max-w-xs">
                    {p.keyTradeoffs[0]?.decision}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      {p.productionStack[3]?.technologies[0] || 'Schema Validation'}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                    {p.keyMetric}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => onSelectProject(p)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      <span>Dossier</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid of ASCII Topologies for Fast Review */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ENTERPRISE_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                {project.title}
              </h4>
              <button
                onClick={() => onLaunchDemo(project)}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Launch Demo →
              </button>
            </div>

            <pre className="p-3 bg-slate-950 text-emerald-400 rounded-lg font-mono text-[10px] overflow-x-auto leading-relaxed border border-slate-800">
              {project.asciiDiagram}
            </pre>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
