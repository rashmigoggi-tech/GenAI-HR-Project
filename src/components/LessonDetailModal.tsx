import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Terminal,
  Eye,
  Wrench,
  Clock,
} from 'lucide-react';
import { Lesson } from '../types';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'tutorial' | 'prompts' | 'preview' | 'exercise' | 'troubleshooting'>(
    'tutorial'
  );
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  if (!isOpen || !lesson) return null;

  const copyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              <span>{lesson.toolId.toUpperCase()}</span>
              <span>•</span>
              <span>{lesson.moduleTitle}</span>
              <span>•</span>
              <span className="flex items-center text-slate-500 font-normal">
                <Clock className="w-3 h-3 mr-1" />
                {lesson.durationMinutes} mins
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {lesson.title}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleComplete(lesson.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${
                  isCompleted ? 'text-emerald-600 fill-emerald-600' : 'text-slate-400'
                }`}
              />
              <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto">
          {[
            { id: 'tutorial', label: '1. Tutorial & Steps', icon: BookOpen },
            { id: 'prompts', label: '2. Copy-Ready Prompts', icon: Terminal },
            { id: 'preview', label: '3. Expected Result', icon: Eye },
            { id: 'exercise', label: '4. Hands-on Exercise', icon: Wrench },
            { id: 'troubleshooting', label: '5. Troubleshooting', icon: AlertCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                  isActive
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {/* TAB 1: Tutorial & Steps */}
          {activeTab === 'tutorial' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Lesson Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">{lesson.description}</p>
              </div>

              {/* Core Concepts */}
              <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                  Key Concepts Covered
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lesson.concepts.map((concept, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-indigo-950">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <span>{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by step */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Implementation Steps
                </h4>
                <div className="space-y-3">
                  {lesson.tutorialSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs"
                    >
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center border border-indigo-200">
                          {step.stepNumber}
                        </span>
                        <h5 className="text-sm font-bold text-slate-900">{step.title}</h5>
                      </div>
                      <p className="text-xs text-slate-600 ml-8 leading-relaxed">
                        {step.instruction}
                      </p>
                      {step.tip && (
                        <div className="mt-2.5 ml-8 p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                          💡 <strong>Pro Tip:</strong> {step.tip}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Copy-Ready Prompts */}
          {activeTab === 'prompts' && (
            <div className="space-y-4 max-w-3xl">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Ready-to-Use Prompts
                </h4>
                <p className="text-xs text-slate-500">
                  Copy and paste directly into {lesson.toolId.toUpperCase()} to test this workflow immediately.
                </p>
              </div>

              {lesson.samplePrompts.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{p.label}</span>
                    <button
                      onClick={() => copyPrompt(p.prompt, idx)}
                      className="flex items-center space-x-1.5 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs font-medium text-slate-700 transition"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
                    {p.prompt}
                  </div>
                  <div className="px-4 py-2.5 bg-indigo-50/50 border-t border-slate-100 text-xs text-indigo-900">
                    ✨ <strong>Why this prompt works:</strong> {p.whyItWorks}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Expected Result */}
          {activeTab === 'preview' && (
            <div className="space-y-4 max-w-3xl">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Expected Output & UI Verification
                </h4>
                <p className="text-xs text-slate-500">
                  Verify that your generated deliverable matches these criteria.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Success Criteria</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {lesson.expectedResult}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Exercise */}
          {activeTab === 'exercise' && (
            <div className="space-y-5 max-w-3xl">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Hands-On Mini Exercise
                </h4>
                <p className="text-xs text-slate-500">
                  Solidify what you just learned with a quick practical modification.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div>
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                    Your Challenge
                  </span>
                  <p className="text-sm text-slate-800 font-medium">{lesson.exercise.task}</p>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                  💡 <strong>Hint:</strong> {lesson.exercise.hint}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    {showSolution ? 'Hide Model Solution ▲' : 'Reveal Model Solution ▼'}
                  </button>

                  {showSolution && (
                    <div className="mt-3 p-3.5 bg-slate-900 text-slate-200 rounded-lg font-mono text-xs whitespace-pre-wrap">
                      {lesson.exercise.solution}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Troubleshooting */}
          {activeTab === 'troubleshooting' && (
            <div className="space-y-4 max-w-3xl">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Common Gotchas & Fixes
                </h4>
                <p className="text-xs text-slate-500">
                  Typical beginner mistakes and exact corrective prompts.
                </p>
              </div>

              {lesson.troubleshooting.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2"
                >
                  <div className="flex items-center space-x-2 text-rose-700 text-xs font-bold">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Issue: {item.issue}</span>
                  </div>
                  <div className="text-xs text-slate-700 ml-6 pl-2 border-l-2 border-emerald-400 bg-emerald-50/50 p-2 rounded-r">
                    <span className="font-semibold text-emerald-900 block mb-0.5">Solution:</span>
                    <span>{item.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {isCompleted ? '✓ Marked as complete' : 'Not yet completed'}
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggleComplete(lesson.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                isCompleted
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
              }`}
            >
              {isCompleted ? 'Mark Incomplete' : 'Complete & Record Progress'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
