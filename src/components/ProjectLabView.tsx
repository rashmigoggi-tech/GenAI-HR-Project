import React, { useState } from 'react';
import {
  FolderGit2,
  Search,
  Filter,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ALL_PROJECTS } from '../data/projectsData';
import { ProjectItem, ProjectDomain, ToolId, UserProjectProgress } from '../types';

interface ProjectLabViewProps {
  userProjects: Record<string, UserProjectProgress>;
  onOpenProject: (project: ProjectItem) => void;
}

export const ProjectLabView: React.FC<ProjectLabViewProps> = ({
  userProjects,
  onOpenProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.businessProblem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.beginnerExplanation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = selectedDomain === 'all' || p.domain === selectedDomain;
    const matchesTool =
      selectedTool === 'all' || p.tools.includes(selectedTool as ToolId);
    const matchesDiff =
      selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;

    return matchesSearch && matchesDomain && matchesTool && matchesDiff;
  });

  const domains = [
    { id: 'all', label: 'All Domains' },
    { id: 'recruitment', label: 'Recruitment & HR' },
    { id: 'finance', label: 'Finance' },
    { id: 'sales', label: 'Sales & CRM' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'education', label: 'Education' },
    { id: 'operations', label: 'Operations' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Project Lab (20+ Starter Projects)
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Learn Generative AI by building real, practical solutions. Filter by business domain,
          tool, or difficulty to find your next hands-on project.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by keyword, problem, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              aria-label="Filter by Domain"
              className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 bg-white cursor-pointer"
            >
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>

            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              aria-label="Filter by Tool"
              className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 bg-white cursor-pointer"
            >
              <option value="all">All Tools</option>
              <option value="lovable">Lovable</option>
              <option value="ai-studio">Google AI Studio</option>
              <option value="stitch">Google Stitch</option>
              <option value="notion">Notion</option>
              <option value="n8n">n8n</option>
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              aria-label="Filter by Difficulty"
              className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 bg-white cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Beginner to Intermediate">Beginner to Intermediate</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
          <span>Showing {filteredProjects.length} of {ALL_PROJECTS.length} projects</span>
          {(searchQuery || selectedDomain !== 'all' || selectedTool !== 'all' || selectedDifficulty !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('all');
                setSelectedTool('all');
                setSelectedDifficulty('all');
              }}
              className="text-indigo-600 font-semibold hover:text-indigo-800"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => {
          const progress = userProjects[project.id];
          const isDone = progress?.status === 'completed';
          const isInProgress = progress?.status === 'in_progress';
          const doneSteps = progress?.completedStepNumbers?.length || 0;

          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-indigo-200 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {project.domain}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{project.estimatedHours} hrs</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {project.title}
                </h4>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {project.beginnerExplanation}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                  {project.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                    >
                      {t.toUpperCase()}
                    </span>
                  ))}
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {project.difficulty}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {isDone ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      ✓ Finished
                    </span>
                  ) : isInProgress ? (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {doneSteps}/{project.steps.length} Steps
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Not Started</span>
                  )}
                </div>

                <button
                  onClick={() => onOpenProject(project)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center space-x-1"
                >
                  <span>Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
