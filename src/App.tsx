import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, Layers, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { ENTERPRISE_PROJECTS } from './data/projectsData';
import { EnterpriseProject, ProjectCategory } from './types';
import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDossier } from './components/ProjectDossier';
import { LiveWorkflowRunner } from './components/LiveWorkflowRunner';
import { ResumeTailorView } from './components/ResumeTailorView';
import { SystemDesignsView } from './components/SystemDesignsView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('projects');
  const [selectedProject, setSelectedProject] = useState<EnterpriseProject | null>(null);
  const [activeDossierInitialTab, setActiveDossierInitialTab] = useState<
    'architecture' | 'stack' | 'bullets' | 'interview' | 'demo'
  >('architecture');
  const [selectedDemoProjectId, setSelectedDemoProjectId] = useState<string>(ENTERPRISE_PROJECTS[0].id);

  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('workcraft_theme') === 'dark' ||
        (!('workcraft_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('workcraft_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('workcraft_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleSelectProject = (project: EnterpriseProject) => {
    setSelectedProject(project);
    setActiveDossierInitialTab('architecture');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchDemo = (project: EnterpriseProject) => {
    setSelectedProject(project);
    setActiveDossierInitialTab('demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchTab = (tab: string) => {
    setCurrentTab(tab);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter projects by category and search
  const filteredProjects = ENTERPRISE_PROJECTS.filter((p) => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.productionStack.some((s) =>
        s.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesCategory && matchesSearch;
  });

  const activeDemoProject =
    ENTERPRISE_PROJECTS.find((p) => p.id === selectedDemoProjectId) || ENTERPRISE_PROJECTS[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Strict 3-Zone Top Bar Contract */}
      <Navbar
        currentTab={selectedProject ? '' : currentTab}
        onSelectTab={handleSwitchTab}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenTailorModal={() => handleSwitchTab('tailor')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* If a project dossier is open, show dossier */}
        {selectedProject ? (
          <ProjectDossier
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
            initialTab={activeDossierInitialTab}
          />
        ) : (
          <>
            {/* TAB 1: PROJECTS SHOWCASE */}
            {currentTab === 'projects' && (
              <div className="space-y-10">
                {/* Hero Banner Section */}
                <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm">
                  <div className="max-w-3xl space-y-4">
                    {/* Unboxed Kicker */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      <span>SENIOR AI ENGINEERING PORTFOLIO</span>
                      <span aria-hidden="true">·</span>
                      <span>PRODUCTION-GRADE BENCHMARKS</span>
                      <span aria-hidden="true">·</span>
                      <span>POWERED BY GEMINI 3.8 FLASH</span>
                    </div>

                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
                      Resume-Ready Enterprise AI Projects with Live Execution
                    </h1>

                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                      Move beyond toy chatbots and PDF wrappers. Explore 4 production-grade AI systems with full system design diagrams, Google X-Y-Z formula resume bullets, interview defense playbooks, and interactive live workflow runners.
                    </p>

                    {/* Quick Hero Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => handleSwitchTab('demos')}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Launch Live Workbenches</span>
                      </button>

                      <button
                        onClick={() => handleSwitchTab('tailor')}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Tailor Bullets For My Resume</span>
                      </button>
                    </div>
                  </div>

                  {/* Quantitative Trust Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="font-mono tabular-nums text-xl font-bold text-slate-900 dark:text-white">
                        4 Systems
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Multi-Agent, RAG, Vision & Extraction
                      </div>
                    </div>
                    <div>
                      <div className="font-mono tabular-nums text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        100% Live
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Interactive Gemini 3.8 Flash Sandbox
                      </div>
                    </div>
                    <div>
                      <div className="font-mono tabular-nums text-xl font-bold text-slate-900 dark:text-white">
                        12+ Bullets
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Google X-Y-Z Quantified Formula
                      </div>
                    </div>
                    <div>
                      <div className="font-mono tabular-nums text-xl font-bold text-slate-900 dark:text-white">
                        Zero Slop
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Staff-Level Defensive Architecture
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Segmented Filter Buttons */}
                  <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg overflow-x-auto">
                    {(
                      [
                        { id: 'all', label: 'All Projects' },
                        { id: 'agents', label: 'Autonomous Agents' },
                        { id: 'structured', label: 'Structured Extraction' },
                        { id: 'multimodal', label: 'Code & Multimodal' },
                        { id: 'rag', label: 'Self-Correcting RAG' },
                      ] as const
                    ).map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setCategoryFilter(filter.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                          categoryFilter === filter.id
                            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Bar */}
                  <div className="relative min-w-[240px]">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search architecture, stack (e.g. Kafka)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelectProject={handleSelectProject}
                      onLaunchDemo={handleLaunchDemo}
                    />
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      No projects matched your search criteria.
                    </p>
                    <button
                      onClick={() => {
                        setCategoryFilter('all');
                        setSearchQuery('');
                      }}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Clear search & filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: LIVE WORKFLOW DEMOS */}
            {currentTab === 'demos' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm">
                  <div className="max-w-3xl space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      <Play className="w-3.5 h-3.5" />
                      <span>Interactive Live AI Workflow Runner</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Test Real Enterprise AI Pipelines End-to-End
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Select any project below to execute its workflow with real Gemini 3.8 Flash inference. Inspect latency, deterministic JSON parsing, automated runbooks, and git diff patches.
                    </p>
                  </div>

                  {/* Project Selector Bar */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800">
                    {ENTERPRISE_PROJECTS.map((proj) => (
                      <button
                        key={proj.id}
                        onClick={() => setSelectedDemoProjectId(proj.id)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          selectedDemoProjectId === proj.id
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {proj.title}
                      </button>
                    ))}
                  </div>
                </div>

                <LiveWorkflowRunner project={activeDemoProject} />
              </div>
            )}

            {/* TAB 3: SYSTEM DESIGNS & QA */}
            {currentTab === 'system-designs' && (
              <SystemDesignsView
                onSelectProject={handleSelectProject}
                onLaunchDemo={handleLaunchDemo}
              />
            )}

            {/* TAB 4: STAR BULLET GENERATOR */}
            {currentTab === 'tailor' && <ResumeTailorView />}
          </>
        )}
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">WorkCraft AI</span>
            <span className="mx-2">·</span>
            <span>Enterprise AI Projects Showcase & Workbench</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleSwitchTab('projects')}
              className="hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => handleSwitchTab('demos')}
              className="hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Live Demos
            </button>
            <button
              onClick={() => handleSwitchTab('system-designs')}
              className="hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              System Designs
            </button>
            <button
              onClick={() => handleSwitchTab('tailor')}
              className="hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              STAR Generator
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
