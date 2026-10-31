import React from 'react';
import { Sun, Moon, Sparkles, Terminal } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenTailorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  isDark,
  onToggleTheme,
  onOpenTailorModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onSelectTab('projects')}
            className="flex items-center gap-2.5 text-left group cursor-pointer border-0 bg-transparent p-0"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:bg-indigo-700 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0">
              WorkCraft AI
            </span>
          </button>

          {/* Zone 2: 4 single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onSelectTab('projects')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentTab === 'projects'
                  ? 'border-indigo-600 dark:border-indigo-400 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Enterprise Projects
            </button>
            <button
              onClick={() => onSelectTab('demos')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentTab === 'demos'
                  ? 'border-indigo-600 dark:border-indigo-400 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Live Workflow Demos
            </button>
            <button
              onClick={() => onSelectTab('system-designs')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentTab === 'system-designs'
                  ? 'border-indigo-600 dark:border-indigo-400 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              System Designs & QA
            </button>
            <button
              onClick={() => onSelectTab('tailor')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                currentTab === 'tailor'
                  ? 'border-indigo-600 dark:border-indigo-400 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              STAR Bullet Generator
            </button>
          </nav>

          {/* Zone 3: 1 primary action + theme toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle visual theme"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenTailorModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailor For My Resume</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
