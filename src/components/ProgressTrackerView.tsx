import React from 'react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Flame,
  FolderGit2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { UserPreferences, UserProjectProgress, BadgeAward } from '../types';
import { TOOL_TRACKS } from '../data/learningTracks';
import { ALL_PROJECTS } from '../data/projectsData';
import { StorageService } from '../services/storage';

interface ProgressTrackerViewProps {
  preferences: UserPreferences;
  completedLessons: string[];
  userProjects: Record<string, UserProjectProgress>;
  studyMinutes: number;
}

export const ProgressTrackerView: React.FC<ProgressTrackerViewProps> = ({
  preferences,
  completedLessons,
  userProjects,
  studyMinutes,
}) => {
  const badges: BadgeAward[] = StorageService.getEarnedBadges();

  const allLessons = TOOL_TRACKS.flatMap((t) => t.modules.flatMap((m) => m.lessons));
  const completedProjects = Object.values(userProjects).filter((p) => p.status === 'completed');
  const inProgressProjects = Object.values(userProjects).filter((p) => p.status === 'in_progress');

  const totalHours = (studyMinutes / 60).toFixed(1);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Learning & Skill Progress Analytics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Monitor your cumulative study hours, tool proficiencies, project milestones, and earned credentials.
        </p>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2 text-indigo-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Study Logged
            </span>
          </div>
          <span className="text-2xl font-black text-slate-900">{totalHours} hrs</span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Goal: {preferences.weeklyHours} hrs/week
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2 text-emerald-600 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Lessons Done
            </span>
          </div>
          <span className="text-2xl font-black text-slate-900">
            {completedLessons.length} / {allLessons.length}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Across 5 Tool Tracks
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2 text-sky-600 mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Projects Finished
            </span>
          </div>
          <span className="text-2xl font-black text-slate-900">
            {completedProjects.length}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            {inProgressProjects.length} in progress
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2 text-amber-500 mb-1">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Daily Streak
            </span>
          </div>
          <span className="text-2xl font-black text-slate-900">
            {preferences.streakDays} Days
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Active Momentum 🔥</span>
        </div>
      </div>

      {/* Tool Skill Proficiency Breakdown */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          5 Core Tools Mastery Breakdown
        </h3>

        <div className="space-y-4">
          {TOOL_TRACKS.map((tool) => {
            const lessons = tool.modules.flatMap((m) => m.lessons);
            const finished = lessons.filter((l) => completedLessons.includes(l.id)).length;
            const pct = lessons.length > 0 ? Math.round((finished / lessons.length) * 100) : 0;

            return (
              <div key={tool.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    {tool.name} — {tool.tagline}
                  </span>
                  <span className="font-semibold text-slate-500">
                    {finished} of {lessons.length} lessons ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: tool.accentColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Earned Badges & Achievements */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Achievement Badges & Milestones
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Earn badges as you master prompts, publish applications, and build portfolio case studies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => {
            const isEarned = !!b.earnedAt;
            return (
              <div
                key={b.id}
                className={`p-4 rounded-xl border transition flex items-start space-x-3 ${
                  isEarned
                    ? 'bg-indigo-50/50 border-indigo-200 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isEarned
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-900">{b.title}</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {b.description}
                  </p>
                  <span className="text-[10px] font-semibold text-indigo-700 mt-1 block">
                    {isEarned ? `Unlocked on ${b.earnedAt}` : '🔒 In Progress'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
