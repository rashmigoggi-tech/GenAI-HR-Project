import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Layout,
  Workflow,
  BookOpen,
  Figma,
  Zap,
  Lock,
  Eye,
  GraduationCap,
} from 'lucide-react';
import { TOOL_TRACKS } from '../data/learningTracks';

interface LandingPageProps {
  onStartLearning: () => void;
  onExploreProjects: () => void;
  onOpenRecruitment: () => void;
  onOpenMentor: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearning,
  onExploreProjects,
  onOpenRecruitment,
  onOpenMentor,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 text-center max-w-4xl mx-auto px-4">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700 mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Zero Coding Required • 100% Beginner-Friendly GenAI Academy</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Learn AI Tools by Building{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-600">
            Real-World Projects
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Transform from an AI beginner into a confident builder. Master{' '}
          <strong>Lovable, Google AI Studio, Google Stitch, Notion, and n8n</strong> to automate
          workplace workflows, create applications, and build a standout portfolio.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm sm:text-base font-bold transition shadow-sm flex items-center justify-center space-x-2"
          >
            <span>Start Learning Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenRecruitment}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-sm sm:text-base font-semibold transition flex items-center justify-center space-x-2"
          >
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Recruitment Center (8 Projects)</span>
          </button>

          <button
            onClick={onExploreProjects}
            className="w-full sm:w-auto px-5 py-3.5 text-slate-600 hover:text-slate-900 text-sm font-semibold transition"
          >
            Browse All 20+ Projects
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>No paid API keys required to start</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Responsible AI & Human-in-the-Loop</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Lock className="w-4 h-4 text-sky-600" />
            <span>100% Synthetic Data & Privacy Safeguards</span>
          </span>
        </div>
      </section>

      {/* 5 Core Tools Breakdown */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            The 5 Core Tools You Will Master
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Each tool teaches a critical pillar of modern AI-assisted product and process creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOL_TRACKS.map((tool) => {
            return (
              <div
                key={tool.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      style={{ color: tool.accentColor }}
                      className="text-xs font-bold uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100"
                    >
                      {tool.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Free Starter Tier
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{tool.name}</h3>
                  <p className="text-xs font-medium text-indigo-600 mt-0.5">{tool.tagline}</p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{tool.description}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      What you build:
                    </span>
                    <ul className="space-y-1">
                      {tool.whatYouWillBuild.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start space-x-1.5">
                          <span className="text-indigo-500 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {tool.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Guided Lessons
                  </span>
                  <button
                    onClick={onStartLearning}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 transition"
                  >
                    <span>View Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* 6th Card: AI Learning Mentor */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl border border-indigo-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider bg-indigo-800/80 text-indigo-200 px-2.5 py-1 rounded-md border border-indigo-700">
                  Instructional AI
                </span>
                <span className="text-[11px] font-semibold text-sky-300 bg-sky-900/60 px-2 py-0.5 rounded border border-sky-700">
                  Gemini 3.8 Flash
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">AI Learning Mentor</h3>
              <p className="text-xs text-indigo-300 mt-0.5">Your 24/7 Personal Study Companion</p>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                Stuck on a prompt, debugging an n8n webhook, or need feedback on your Notion layout?
                Switch between 4 modes: Teach Me, Guide Step-by-Step, Give Me a Hint, or Review My Work.
              </p>

              <div className="mt-4 pt-3 border-t border-indigo-800/80">
                <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block mb-1.5">
                  Mentor Modes:
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-200">
                  <span className="bg-indigo-800/50 px-2 py-1 rounded border border-indigo-700/60">
                    🎓 Teach Me
                  </span>
                  <span className="bg-indigo-800/50 px-2 py-1 rounded border border-indigo-700/60">
                    🧭 Guide Step-by-Step
                  </span>
                  <span className="bg-indigo-800/50 px-2 py-1 rounded border border-indigo-700/60">
                    💡 Give Me a Hint
                  </span>
                  <span className="bg-indigo-800/50 px-2 py-1 rounded border border-indigo-700/60">
                    🔍 Review My Work
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-indigo-800/80 flex items-center justify-between">
              <span className="text-[11px] text-indigo-300">Context-Aware AI</span>
              <button
                onClick={onOpenMentor}
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg flex items-center space-x-1 transition"
              >
                <span>Chat with Mentor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Spotlight Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg border border-slate-800">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30">
              Specialized Industry Track
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Recruitment Project Center
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Explore 8 dedicated hands-on recruitment workflows covering the entire talent acquisition
              lifecycle: AI Job Description Drafting, Notion Candidate Tracker, STAR Interview
              Question Rubrics, Resume Extraction Assistant, Scheduling Reminders, and the
              End-to-End Recruitment Operations Capstone.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center space-x-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Strict Non-Discriminatory Guardrails</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Human-in-the-Loop Decision Gates</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Synthetic Candidate Testing</span>
              </div>
            </div>

            <div className="mt-8 flex items-center space-x-3">
              <button
                onClick={onOpenRecruitment}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition shadow-xs flex items-center space-x-2"
              >
                <span>Launch Recruitment Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Principles Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Our Guiding Product Principles
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Built from day one to be safe, ethical, and accessible for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-3">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Zero Coding Assumption</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Every lesson explains concepts in plain language. If code appears, it is copy-ready
              with step-by-step guidance.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Free-Tier First</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              We never assume you have paid enterprise subscriptions or API keys. Free alternatives
              are highlighted for every tool.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-3">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Responsible AI & Ethics</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              AI must never make autonomous hiring or financial decisions. Human review and anti-bias
              safeguards are strictly taught.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Portfolio-Ready Deliverables</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Every completed project outputs a structured case study template ready to present to
              employers or clients.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
