import React from 'react';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
  AlertTriangle,
  Play,
} from 'lucide-react';
import { ALL_PROJECTS } from '../data/projectsData';
import { ProjectItem, UserProjectProgress } from '../types';

interface RecruitmentCenterViewProps {
  userProjects: Record<string, UserProjectProgress>;
  onOpenProject: (project: ProjectItem) => void;
}

export const RecruitmentCenterView: React.FC<RecruitmentCenterViewProps> = ({
  userProjects,
  onOpenProject,
}) => {
  const recruitmentProjects = ALL_PROJECTS.filter((p) => p.isRecruitmentSpecial);

  const lifecycleStages = [
    { num: 1, title: 'Job Requirements', desc: 'Clarify essential skills & competencies' },
    { num: 2, title: 'Job Description', desc: 'Draft inclusive, structured postings' },
    { num: 3, title: 'Application Intake', desc: 'Receive synthetic test resumes' },
    { num: 4, title: 'Organize Data', desc: 'Centralize pipeline in Notion database' },
    { num: 5, title: 'Review Qualifications', desc: 'Extract stated skills without hallucination' },
    { num: 6, title: 'Interview Scheduling', desc: 'Automate invites & reminders via n8n' },
    { num: 7, title: 'Structured Interviews', desc: 'STAR rubrics & objective questions' },
    { num: 8, title: 'Feedback Debrief', desc: 'Synthesize notes for hiring committee' },
    { num: 9, title: 'Pipeline Visibility', desc: 'Track days-to-fill on Stitch/Lovable' },
    { num: 10, title: 'Human Final Decision', desc: 'Strict human evaluation & offer' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-indigo-900 shadow-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold mb-3 border border-indigo-500/30">
            <Users className="w-3.5 h-3.5" />
            <span>Dedicated Industry Specialization</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Recruitment & Talent Operations Project Center
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Apply Generative AI and visual automation across the 10 core stages of the recruitment
            lifecycle. Build practical, ethical hiring tools from scratch without programming.
          </p>
        </div>
      </div>

      {/* Critical Responsible AI Safeguards Banner */}
      <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200/90 shadow-2xs space-y-3">
        <div className="flex items-center space-x-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>Non-Negotiable Recruitment AI Safeguards</span>
        </div>
        <p className="text-xs text-amber-950 leading-relaxed">
          Every tool built in this track adheres strictly to labor ethics and non-discrimination standards:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          <div className="p-3 bg-white/80 rounded-xl border border-amber-200/70 text-xs text-slate-800">
            <span className="font-bold text-amber-900 block mb-1">1. No Autonomous Hiring</span>
            AI never makes pass/fail decisions or automatic rejections. Human professionals conduct every review.
          </div>
          <div className="p-3 bg-white/80 rounded-xl border border-amber-200/70 text-xs text-slate-800">
            <span className="font-bold text-amber-900 block mb-1">2. Job-Related Criteria Only</span>
            Strictly prohibit inferring or assessing protected characteristics (age, gender, ethnicity, disability).
          </div>
          <div className="p-3 bg-white/80 rounded-xl border border-amber-200/70 text-xs text-slate-800">
            <span className="font-bold text-amber-900 block mb-1">3. Privacy & Synthetic Data</span>
            All projects are built and tested exclusively using synthetic candidate profiles to protect personal data.
          </div>
        </div>
      </div>

      {/* 10-Stage Lifecycle Interactive Flow */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-900">
            The 10-Stage Recruitment Operations Lifecycle
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Follow how our 8 dedicated projects address each step in the talent journey.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {lifecycleStages.map((stage) => (
            <div
              key={stage.num}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left hover:border-indigo-300 transition"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center mb-1.5">
                {stage.num}
              </span>
              <h5 className="text-xs font-bold text-slate-900 leading-tight">
                {stage.title}
              </h5>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 Dedicated Projects Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            8 Dedicated Recruitment Projects ({recruitmentProjects.length})
          </h3>
          <span className="text-xs text-slate-500">
            From Beginner to Full-Stack Capstone
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recruitmentProjects.map((project, idx) => {
            const progress = userProjects[project.id];
            const isCompleted = progress?.status === 'completed';
            const isInProgress = progress?.status === 'in_progress';
            const doneSteps = progress?.completedStepNumbers?.length || 0;

            return (
              <div
                key={project.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-200 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                      Project {idx + 1} • {project.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>~{project.estimatedHours} hrs</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{project.title}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {project.beginnerExplanation}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {project.tools.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {t.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  {/* Step counter */}
                  <div className="mt-3 text-[11px] text-slate-500">
                    {doneSteps} of {project.steps.length} implementation steps verified
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    {isCompleted ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        ✓ Completed
                      </span>
                    ) : isInProgress ? (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        In Progress
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">
                        Not Started
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenProject(project)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                  >
                    <span>{isInProgress ? 'Resume Workspace' : 'Open Project'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
