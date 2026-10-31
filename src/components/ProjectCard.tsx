import React from 'react';
import { ArrowRight, Play, Layers } from 'lucide-react';
import { EnterpriseProject } from '../types';

interface ProjectCardProps {
  project: EnterpriseProject;
  onSelectProject: (project: EnterpriseProject) => void;
  onLaunchDemo: (project: EnterpriseProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  onLaunchDemo,
}) => {
  return (
    <div className="group flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200">
      <div>
        {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[11px]">
              {project.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.complexity}</span>
          </div>

          <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-semibold">
            {project.keyMetric} {project.metricLabel.split(' ')[0]}
          </span>
        </div>

        {/* Primary Title */}
        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {project.tagline}
        </p>

        {/* Key Highlight Metric Box */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-lg p-3 mb-5">
          <div className="text-[11px] uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400 mb-0.5">
            Key Resume Impact Metric
          </div>
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
            {project.keyMetric} <span className="font-sans font-normal text-xs text-slate-600 dark:text-slate-400">({project.metricLabel})</span>
          </div>
        </div>

        {/* Target Roles - Unboxed metadata */}
        <div className="mb-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">Target Roles:</div>
          <div className="text-xs text-slate-700 dark:text-slate-300 flex flex-wrap items-center gap-1.5">
            {project.targetRoles.map((role, idx) => (
              <React.Fragment key={role}>
                <span>{role}</span>
                {idx < project.targetRoles.length - 1 && <span className="text-slate-400">/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Core Tech Stack Preview */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.productionStack
            .flatMap((s) => s.technologies)
            .slice(0, 4)
            .map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          {project.productionStack.flatMap((s) => s.technologies).length > 4 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 text-slate-400">
              +{project.productionStack.flatMap((s) => s.technologies).length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => onSelectProject(project)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Full Architecture</span>
        </button>

        <button
          onClick={() => onLaunchDemo(project)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Live Demo</span>
          <ArrowRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
