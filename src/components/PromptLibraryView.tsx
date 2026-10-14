import React, { useState } from 'react';
import {
  BookOpenCheck,
  Search,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Terminal,
  Sparkles,
  Info,
  ExternalLink,
} from 'lucide-react';
import { ALL_PROMPTS } from '../data/promptLibraryData';
import { PromptItem } from '../types';

interface PromptLibraryViewProps {
  savedPromptIds: string[];
  onToggleSave: (promptId: string) => void;
}

export const PromptLibraryView: React.FC<PromptLibraryViewProps> = ({
  savedPromptIds,
  onToggleSave,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalPrompt, setActiveModalPrompt] = useState<PromptItem | null>(null);

  const categories = [
    'all',
    'App Building',
    'UI/UX Design',
    'Gemini Prompting',
    'Notion Systems',
    'n8n Automations',
    'Recruitment',
    'Finance',
    'Sales',
    'Marketing',
    'Productivity',
  ];

  const filteredPrompts = ALL_PROMPTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.promptTemplate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const copyPromptText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Prompt Engineering Library
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Copy-ready, production-tested prompt templates across Lovable, Google AI Studio, Stitch,
          Notion, and n8n. Each prompt includes purpose, required parameters, expected outputs, and known limitations.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search prompts by keyword, goal, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by Category"
            className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 bg-white cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Prompts' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPrompts.map((prompt) => {
          const isSaved = savedPromptIds.includes(prompt.id);
          return (
            <div
              key={prompt.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-indigo-200 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {prompt.category} • {prompt.tool.toUpperCase()}
                  </span>

                  <button
                    onClick={() => onToggleSave(prompt.id)}
                    title={isSaved ? 'Remove from Saved' : 'Save to My Prompts'}
                    className="p-1 text-slate-400 hover:text-amber-500 transition"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {prompt.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {prompt.purpose}
                </p>

                {/* Prompt Preview Snippet */}
                <div className="mt-3.5 p-3 bg-slate-900 text-slate-200 font-mono text-[11px] rounded-lg max-h-24 overflow-hidden relative">
                  <div className="whitespace-pre-wrap line-clamp-3">
                    {prompt.promptTemplate}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-900 to-transparent" />
                </div>

                {/* Inputs badge */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {prompt.requiredInputs.map((inp, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                    >
                      [{inp}]
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalPrompt(prompt)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                >
                  View Details & Parameters →
                </button>

                <button
                  onClick={() => copyPromptText(prompt.promptTemplate, prompt.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition"
                >
                  {copiedId === prompt.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prompt Detail Modal */}
      {activeModalPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  {activeModalPrompt.category} • {activeModalPrompt.tool.toUpperCase()}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {activeModalPrompt.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalPrompt(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Purpose & Best Use Case
                </span>
                <p className="text-xs text-slate-700">{activeModalPrompt.purpose}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Full Prompt Template
                  </span>
                  <button
                    onClick={() =>
                      copyPromptText(activeModalPrompt.promptTemplate, activeModalPrompt.id)
                    }
                    className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 flex items-center space-x-1"
                  >
                    {copiedId === activeModalPrompt.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === activeModalPrompt.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs rounded-xl whitespace-pre-wrap leading-relaxed">
                  {activeModalPrompt.promptTemplate}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Customization Guidance
                </span>
                <p className="text-xs text-slate-700 bg-indigo-50/60 p-3 rounded-lg border border-indigo-100">
                  💡 {activeModalPrompt.customizationTips}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                    Expected Output
                  </span>
                  <p className="text-xs text-slate-600">{activeModalPrompt.expectedOutput}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-0.5">
                    Limitations & Safeguards
                  </span>
                  <p className="text-xs text-slate-600">{activeModalPrompt.limitations}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => onToggleSave(activeModalPrompt.id)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
              >
                {savedPromptIds.includes(activeModalPrompt.id) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Saved in Favorites</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save to My Prompts</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveModalPrompt(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
