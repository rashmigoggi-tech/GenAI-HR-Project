import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Info,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { TOOL_TRACKS } from '../data/learningTracks';
import { ToolTrack, ToolId, Lesson } from '../types';

interface ToolsAcademyViewProps {
  completedLessons: string[];
  onOpenLesson: (lesson: Lesson) => void;
}

export const ToolsAcademyView: React.FC<ToolsAcademyViewProps> = ({
  completedLessons,
  onOpenLesson,
}) => {
  const [selectedToolId, setSelectedToolId] = useState<ToolId>('lovable');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'lovable-m1': true,
    'lovable-m2': true,
    'aistudio-m1': true,
    'stitch-m1': true,
    'notion-m1': true,
    'n8n-m1': true,
  });

  const selectedTrack =
    TOOL_TRACKS.find((t) => t.id === selectedToolId) || TOOL_TRACKS[0];

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const getTrackStats = (track: ToolTrack) => {
    const all = track.modules.flatMap((m) => m.lessons);
    const completed = all.filter((l) => completedLessons.includes(l.id)).length;
    const totalMinutes = all.reduce((acc, l) => acc + l.durationMinutes, 0);
    return {
      total: all.length,
      completed,
      pct: all.length > 0 ? Math.round((completed / all.length) * 100) : 0,
      totalMinutes,
    };
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Academy Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          AI Tools Academy
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Master the five industry-standard tools for zero-code and low-code GenAI development.
          Every track features step-by-step beginner lessons, copy-ready prompts, and practical deliverables.
        </p>
      </div>

      {/* 5 Tool Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {TOOL_TRACKS.map((track) => {
          const isSelected = selectedToolId === track.id;
          const stats = getTrackStats(track);

          return (
            <button
              key={track.id}
              onClick={() => setSelectedToolId(track.id)}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-white ring-2 ring-indigo-600/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    style={{ color: track.accentColor }}
                    className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded"
                  >
                    {track.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {stats.pct}%
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{track.name}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {track.tagline}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{stats.completed}/{stats.total} Lessons</span>
                <span className="text-indigo-600 font-semibold">{isSelected ? 'Active' : 'Select'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Track Hero / Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span
                style={{ backgroundColor: `${selectedTrack.accentColor}15`, color: selectedTrack.accentColor }}
                className="text-xs font-bold px-2.5 py-0.5 rounded-full"
              >
                {selectedTrack.badge}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">
                {selectedTrack.modules.length} Modules
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {selectedTrack.name} Track: {selectedTrack.tagline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {selectedTrack.description}
            </p>
          </div>

          <div className="shrink-0 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center min-w-[160px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Track Completion
            </span>
            <span className="text-2xl font-black text-indigo-700 block mt-0.5">
              {getTrackStats(selectedTrack).pct}%
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              {getTrackStats(selectedTrack).completed} of {getTrackStats(selectedTrack).total} Finished
            </span>
          </div>
        </div>

        {/* Free Tier Notice Banner */}
        <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-start space-x-3 text-xs text-emerald-950">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Free Starter Tier & Accessibility Notice:</span>
            <span>{selectedTrack.freeTierDetails}</span>
          </div>
        </div>

        {/* What You Will Build Pills */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Key Projects in this Track
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedTrack.whatYouWillBuild.map((item, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200"
              >
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Modules Accordion List */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-bold text-slate-900">
            Curriculum Modules & Lessons
          </h4>

          {selectedTrack.modules.map((mod) => {
            const isExpanded = expandedModules[mod.id] ?? true;
            return (
              <div
                key={mod.id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full px-5 py-3.5 bg-slate-50 hover:bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-left transition"
                >
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{mod.title}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{mod.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-slate-500">
                      {mod.lessons.length} {mod.lessons.length === 1 ? 'lesson' : 'lessons'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Lessons List */}
                {isExpanded && (
                  <div className="divide-y divide-slate-100">
                    {mod.lessons.map((lesson) => {
                      const isDone = completedLessons.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition"
                        >
                          <div className="flex items-start space-x-3">
                            <button
                              onClick={() => onOpenLesson(lesson)}
                              className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition ${
                                isDone
                                  ? 'bg-emerald-500 text-white'
                                  : 'border-2 border-slate-300 text-transparent hover:border-slate-400'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h6
                                  onClick={() => onOpenLesson(lesson)}
                                  className="text-sm font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition"
                                >
                                  {lesson.title}
                                </h6>
                                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                  {lesson.level}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 max-w-2xl line-clamp-2">
                                {lesson.description}
                              </p>
                              <div className="mt-2 flex items-center space-x-4 text-[11px] text-slate-400">
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{lesson.durationMinutes} mins</span>
                                </span>
                                <span>•</span>
                                <span>{lesson.tutorialSteps.length} Steps</span>
                                <span>•</span>
                                <span>{lesson.samplePrompts.length} Ready Prompts</span>
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center justify-end sm:justify-center">
                            <button
                              onClick={() => onOpenLesson(lesson)}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
                                isDone
                                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                              }`}
                            >
                              <span>{isDone ? 'Review' : 'Start Lesson'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
