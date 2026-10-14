import React, { useState } from 'react';
import {
  Briefcase,
  Share2,
  Download,
  Copy,
  Check,
  Eye,
  CheckCircle2,
  Trash2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PortfolioEntry } from '../types';

interface PortfolioBuilderViewProps {
  portfolioEntries: PortfolioEntry[];
  onDeleteEntry: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const PortfolioBuilderView: React.FC<PortfolioBuilderViewProps> = ({
  portfolioEntries,
  onDeleteEntry,
  onNavigate,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewEntry, setPreviewEntry] = useState<PortfolioEntry | null>(
    portfolioEntries[0] || null
  );

  const copyMarkdown = (entry: PortfolioEntry) => {
    const md = `# Project Case Study: ${entry.title}
**Domain:** ${entry.domain.toUpperCase()} | **Tools:** ${entry.tools.map((t) => t.toUpperCase()).join(', ')} | **Date:** ${entry.createdAt}

## 1. Executive Summary & Problem
${entry.problemSummary}

## 2. Technical & Process Solution
${entry.solutionSummary}

## 3. Key Prompt Engineering Artifacts
\`\`\`
${entry.keyPrompts}
\`\`\`

## 4. Final Deliverable
${entry.deliverableSummary}

## 5. Measured Business Impact
${entry.metricsImpact}

## 6. Responsible AI, Privacy & Ethical Safeguards
${entry.ethicalSafeguards}
`;
    navigator.clipboard.writeText(md);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Professional GenAI Portfolio
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Showcase your completed AI projects with structured case studies, business metrics, and
            ethical AI compliance statements. Perfect for sharing with hiring managers and clients.
          </p>
        </div>

        <button
          onClick={() => onNavigate('projects')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5 self-start"
        >
          <Sparkles className="w-4 h-4" />
          <span>Build More Case Studies</span>
        </button>
      </div>

      {portfolioEntries.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: List of Case Studies */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Documented Case Studies ({portfolioEntries.length})
            </span>

            {portfolioEntries.map((entry) => {
              const isSelected = previewEntry?.id === entry.id;
              return (
                <div
                  key={entry.id}
                  onClick={() => setPreviewEntry(entry)}
                  className={`p-4 rounded-xl border cursor-pointer transition text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-600 ring-1 ring-indigo-600 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-100">
                        {entry.domain}
                      </span>
                      <span className="text-[10px] text-slate-400">{entry.createdAt}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{entry.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {entry.problemSummary}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      {entry.tools.join(', ').toUpperCase()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEntry(entry.id);
                        if (previewEntry?.id === entry.id) {
                          setPreviewEntry(null);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 transition p-1"
                      title="Remove Case Study"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Case Study Preview & Presentation */}
          <div className="lg:col-span-2">
            {previewEntry ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                      Case Study Overview
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-2">
                      {previewEntry.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                      <span>Domain: {previewEntry.domain.toUpperCase()}</span>
                      <span>•</span>
                      <span>Tools: {previewEntry.tools.map((t) => t.toUpperCase()).join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyMarkdown(previewEntry)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5"
                    >
                      {copiedId === previewEntry.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Markdown</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      1. The Business Challenge
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                      {previewEntry.problemSummary}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      2. Solution Architecture
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                      {previewEntry.solutionSummary}
                    </p>
                  </div>

                  {previewEntry.keyPrompts && (
                    <div>
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        3. Core Prompt Artifact
                      </h5>
                      <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs rounded-xl whitespace-pre-wrap max-h-48 overflow-y-auto">
                        {previewEntry.keyPrompts}
                      </div>
                    </div>
                  )}

                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      4. Measured Business Impact
                    </h5>
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium">
                      🚀 {previewEntry.metricsImpact}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      5. Ethical AI, Privacy & Human Oversight Guarantee
                    </h5>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 leading-relaxed">
                      🛡️ {previewEntry.ethicalSafeguards}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-12 text-center">
                <p className="text-xs text-slate-500">
                  Select a case study on the left to preview its full presentation.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-12 text-center space-y-3">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-base font-bold text-slate-900">Your Portfolio is Empty</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Complete any project in the Project Lab or Recruitment Center, then click "Save to My Portfolio" in Tab 6 to automatically generate a rich case study.
          </p>
          <button
            onClick={() => onNavigate('projects')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
          >
            Start Your First Project
          </button>
        </div>
      )}
    </div>
  );
};
