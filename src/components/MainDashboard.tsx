import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  FolderGit2,
  Users,
  TrendingUp,
  Bookmark,
  Compass,
  Play,
  Award,
} from 'lucide-react';
import {
  UserPreferences,
  UserProjectProgress,
  ProjectItem,
  ToolId,
  Lesson,
} from '../types';
import { TOOL_TRACKS } from '../data/learningTracks';
import { ALL_PROJECTS } from '../data/projectsData';

interface MainDashboardProps {
  preferences: UserPreferences;
  completedLessons: string[];
  userProjects: Record<string, UserProjectProgress>;
  savedPromptsCount: number;
  studyMinutes: number;
  onOpenLesson: (lesson: Lesson) => void;
  onOpenProject: (project: ProjectItem) => void;
  onNavigate: (view: string) => void;
  onOpenOnboarding: () => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  preferences,
  completedLessons,
  userProjects,
  savedPromptsCount,
  studyMinutes,
  onOpenLesson,
  onOpenProject,
  onNavigate,
  onOpenOnboarding,
}) => {
  // Find current lesson or first incomplete lesson
  const allLessons: Lesson[] = [];
  TOOL_TRACKS.forEach((track) => {
    track.modules.forEach((mod) => {
      allLessons.push(...mod.lessons);
    });
  });

  const nextLesson =
    allLessons.find((l) => !completedLessons.includes(l.id)) || allLessons[0];

  // Active projects
  const inProgressProjects = ALL_PROJECTS.filter(
    (p) => userProjects[p.id]?.status === 'in_progress'
  );

  const completedProjectsCount = Object.values(userProjects).filter(
    (p) => p.status === 'completed'
  ).length;

  // Recommended next project based on domain
  const domainProjects = ALL_PROJECTS.filter((p) => p.domain === preferences.domainInterest);
  const recommendedProject =
    domainProjects.find((p) => userProjects[p.id]?.status !== 'completed') ||
    ALL_PROJECTS[0];

  // Tool progress percentages
  const getToolProgress = (toolId: ToolId) => {
    const track = TOOL_TRACKS.find((t) => t.id === toolId);
    if (!track) return 0;
    const lessons = track.modules.flatMap((m) => m.lessons);
    if (lessons.length === 0) return 0;
    const done = lessons.filter((l) => completedLessons.includes(l.id)).length;
    return Math.round((done / lessons.length) * 100);
  };

  const hoursGoal = preferences.weeklyHours || 4;
  const hoursCompleted = (studyMinutes / 60).toFixed(1);
  const goalPercent = Math.min(
    100,
    Math.round(((studyMinutes / 60) / hoursGoal) * 100)
  );

  const roleDisplayNames: Record<string, string> = {
    recruiter_hr: 'Talent Acquisition & HR',
    student: 'Student',
    fresh_graduate: 'Fresh Graduate',
    finance_pro: 'Finance & Accounting',
    sales_pro: 'Sales & Growth',
    marketing_pro: 'Marketing & Brand',
    business_analyst: 'Business Analysis',
    entrepreneur: 'Entrepreneurship',
    software_dev: 'Software Engineering',
    other: 'General Learning',
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome & Personalized Roadmap Banner */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm border border-indigo-700/50">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Welcome back, {preferences.name}</span>
            <span>•</span>
            <span>Focus Track: {roleDisplayNames[preferences.role] || 'General'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            Your GenAI Learning Launchpad
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-indigo-100 max-w-2xl leading-relaxed">
            Building <strong>{preferences.domainInterest.toUpperCase()}</strong> solutions with
            Lovable, Google AI Studio, Google Stitch, Notion, and n8n without writing manual code.
          </p>

          {/* Quick Action Bar inside Banner */}
          <div className="mt-6 flex flex-wrap gap-3">
            {nextLesson && (
              <button
                onClick={() => onOpenLesson(nextLesson)}
                className="px-4 py-2.5 bg-white text-indigo-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition shadow-xs flex items-center space-x-2"
              >
                <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span>Resume: {nextLesson.title}</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('recruitment')}
              className="px-4 py-2.5 bg-indigo-700/70 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-indigo-500/50 transition flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Recruitment Center (8 Projects)</span>
            </button>

            <button
              onClick={onOpenOnboarding}
              className="px-3.5 py-2.5 text-xs text-indigo-200 hover:text-white flex items-center space-x-1 transition"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Re-tune Roadmap</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5 Tool Mastery Gaps / Progress Gauges */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">
            5 Core Tools Mastery
          </h3>
          <button
            onClick={() => onNavigate('academy')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
          >
            View All Academy Modules →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {TOOL_TRACKS.map((tool) => {
            const pct = getToolProgress(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => onNavigate('academy')}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-300 cursor-pointer transition group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {tool.name}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{pct}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: tool.accentColor,
                    }}
                  />
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{tool.badge}</span>
                  <span className="text-slate-400 group-hover:translate-x-0.5 transition">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grid: Recommended Project & Weekly Study Goal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Project Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                Recommended Next Project
              </span>
              <span className="text-xs text-slate-500 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>~{recommendedProject.estimatedHours} hours</span>
              </span>
            </div>

            <h4 className="text-lg font-bold text-slate-900">
              {recommendedProject.title}
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {recommendedProject.beginnerExplanation}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {recommendedProject.tools.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {t.toUpperCase()}
                </span>
              ))}
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {recommendedProject.difficulty}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {recommendedProject.steps.length} Step Implementation Blueprint
            </span>
            <button
              onClick={() => onOpenProject(recommendedProject)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
            >
              <span>Open Project Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Weekly Study Goal & Metric Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-slate-900">Weekly Study Target</h4>
              <span className="text-xs font-bold text-indigo-600">{goalPercent}%</span>
            </div>
            <p className="text-xs text-slate-500">
              {hoursCompleted} of {hoursGoal} hours logged this week
            </p>

            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${goalPercent}%` }}
              />
            </div>

            <div className="mt-6 space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Lessons Completed</span>
                </span>
                <span className="font-bold text-slate-800">
                  {completedLessons.length} / {allLessons.length}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <FolderGit2 className="w-4 h-4 text-sky-500" />
                  <span>Finished Projects</span>
                </span>
                <span className="font-bold text-slate-800">
                  {completedProjectsCount} Finished
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <Bookmark className="w-4 h-4 text-amber-500" />
                  <span>Saved Prompt Templates</span>
                </span>
                <span className="font-bold text-slate-800">{savedPromptsCount}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate('progress')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition"
            >
              View Full Progress Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Active Projects in Progress */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FolderGit2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Your Projects In Progress
            </h3>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
          >
            Browse All Projects ({ALL_PROJECTS.length}) →
          </button>
        </div>

        {inProgressProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressProjects.map((proj) => {
              const progress = userProjects[proj.id];
              const stepCount = proj.steps.length;
              const doneSteps = progress?.completedStepNumbers?.length || 0;
              const pct = Math.round((doneSteps / stepCount) * 100);

              return (
                <div
                  key={proj.id}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {proj.domain}
                      </span>
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        In Progress ({pct}%)
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {proj.businessProblem}
                    </p>

                    {/* Step progress */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {doneSteps} of {stepCount} steps verified
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Started: {progress?.startedAt}
                    </span>
                    <button
                      onClick={() => onOpenProject(proj)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                    >
                      <span>Resume Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-xl border border-dashed border-slate-200 p-8 text-center">
            <p className="text-sm text-slate-600 font-medium">
              No active projects in progress right now.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Pick a starter project from the Project Lab or Recruitment Center to begin building!
            </p>
            <button
              onClick={() => onNavigate('projects')}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition"
            >
              Explore Project Lab
            </button>
          </div>
        )}
      </section>

      {/* Quick Access Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <button
          onClick={() => onNavigate('recruitment')}
          className="p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-left transition shadow-2xs group"
        >
          <Users className="w-5 h-5 text-indigo-600 mb-2 group-hover:scale-105 transition" />
          <h5 className="text-xs font-bold text-slate-900">Recruitment Hub</h5>
          <p className="text-[11px] text-slate-500 mt-0.5">8 Full HR Workflows</p>
        </button>

        <button
          onClick={() => onNavigate('prompts')}
          className="p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-left transition shadow-2xs group"
        >
          <Bookmark className="w-5 h-5 text-sky-600 mb-2 group-hover:scale-105 transition" />
          <h5 className="text-xs font-bold text-slate-900">Prompt Library</h5>
          <p className="text-[11px] text-slate-500 mt-0.5">Copy-Ready Templates</p>
        </button>

        <button
          onClick={() => onNavigate('portfolio')}
          className="p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-left transition shadow-2xs group"
        >
          <Award className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-105 transition" />
          <h5 className="text-xs font-bold text-slate-900">My Portfolio</h5>
          <p className="text-[11px] text-slate-500 mt-0.5">Case Study Builder</p>
        </button>

        <button
          onClick={() => onNavigate('mentor')}
          className="p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-left transition shadow-2xs group"
        >
          <Sparkles className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-105 transition" />
          <h5 className="text-xs font-bold text-slate-900">AI Mentor</h5>
          <p className="text-[11px] text-slate-500 mt-0.5">4 Response Modes</p>
        </button>
      </section>
    </div>
  );
};
