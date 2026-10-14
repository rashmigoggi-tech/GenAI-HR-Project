import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  ArrowRight,
  FolderGit2,
  CheckCircle2,
  Calendar,
  FileEdit,
} from 'lucide-react';
import { ALL_PROJECTS } from '../data/projectsData';
import { ProjectItem, ProjectStatus, UserProjectProgress } from '../types';

interface MyProjectsViewProps {
  userProjects: Record<string, UserProjectProgress>;
  onOpenProject: (project: ProjectItem) => void;
  onNavigate: (view: string) => void;
}

export const MyProjectsView: React.FC<MyProjectsViewProps> = ({
  userProjects,
  onOpenProject,
  onNavigate,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const activeProjectIds = Object.keys(userProjects);
  const trackedProjects = ALL_PROJECTS.filter((p) => activeProjectIds.includes(p.id));

  const filtered = trackedProjects.filter((p) => {
    const status = userProjects[p.id]?.status || 'not_started';
    if (filterStatus === 'all') return true;
    return status === filterStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Project Workspaces
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Track your ongoing implementations, completed step milestones, and notes across all your AI builds.
          </p>
        </div>

        <button
          onClick={() => onNavigate('projects')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5 self-start"
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Pick New Project from Lab</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        {[
          { id: 'all', label: `All Tracked (${trackedProjects.length})` },
          {
            id: 'in_progress',
            label: `In Progress (${
              trackedProjects.filter((p) => userProjects[p.id]?.status === 'in_progress').length
            })`,
          },
          {
            id: 'completed',
            label: `Completed (${
              trackedProjects.filter((p) => userProjects[p.id]?.status === 'completed').length
            })`,
          },
          {
            id: 'not_started',
            label: `Not Started (${
              trackedProjects.filter((p) => userProjects[p.id]?.status === 'not_started').length
            })`,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterStatus === tab.id
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((proj) => {
            const prog = userProjects[proj.id];
            const isCompleted = prog?.status === 'completed';
            const doneSteps = prog?.completedStepNumbers?.length || 0;
            const pct = Math.round((doneSteps / proj.steps.length) * 100);

            return (
              <div
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {proj.domain}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : prog?.status === 'in_progress'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {isCompleted ? '✓ Completed' : prog?.status === 'in_progress' ? `In Progress (${pct}%)` : 'Not Started'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {proj.beginnerExplanation}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{doneSteps} of {proj.steps.length} steps verified</span>
                    <span>Started: {prog?.startedAt || 'Recently'}</span>
                  </div>

                  {prog?.notes && (
                    <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 italic line-clamp-2">
                      "{prog.notes}"
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-slate-400 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{proj.estimatedHours}h estimated</span>
                  </div>

                  <button
                    onClick={() => onOpenProject(proj)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center space-x-1"
                  >
                    <span>Launch Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-10 text-center space-y-3">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No projects under this filter</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Choose a project from the Project Lab or Recruitment Center to begin tracking your steps.
          </p>
          <button
            onClick={() => onNavigate('projects')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
          >
            Browse Project Lab
          </button>
        </div>
      )}
    </div>
  );
};
