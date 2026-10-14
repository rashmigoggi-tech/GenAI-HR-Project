import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Zap,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Lock,
  Layers,
  HelpCircle,
} from 'lucide-react';

export const ResourceCenterView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'free_tiers' | 'cheatsheets' | 'ethics'>('free_tiers');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Academy Resource Center
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Comprehensive reference guides on free tool tiers, cheat sheets for prompt engineering and visual workflows, and our Responsible AI Charter.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold">
        {[
          { id: 'free_tiers', label: '1. Free Tiers & Zero-Cost Setup' },
          { id: 'cheatsheets', label: '2. 5-Tool Cheat Sheets' },
          { id: 'ethics', label: '3. Responsible AI & Ethics Charter' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2.5 px-4 border-b-2 transition ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Free Tiers Guide */}
      {activeTab === 'free_tiers' && (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Zero Credit Card Commitment Principle</span>
              Every project in this academy is deliberately designed so complete beginners can build,
              test, and learn using entirely free tiers or open community editions.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                Lovable
              </span>
              <h4 className="text-sm font-bold text-slate-900">Free Tier & Starter Credits</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lovable provides complimentary project generation credits when signing up. You can
                prototype, preview, and test interactive React applications without entering payment credentials.
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <strong>Best beginner practice:</strong> Plan your data schema and layout in writing before prompting to conserve credits.
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                Google AI Studio
              </span>
              <h4 className="text-sm font-bold text-slate-900">Generous Free Rate Limits</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Google AI Studio allows learners to experiment with Gemini models (including gemini-3.8-flash)
                with generous free queries per minute. You can obtain API keys for prototyping without billing.
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <strong>Best beginner practice:</strong> Keep temperature at 0.0 for structured JSON extraction.
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                Notion
              </span>
              <h4 className="text-sm font-bold text-slate-900">Free Personal Plan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Notion's free tier includes unlimited pages and blocks for individuals, full relational database
                capabilities, formula calculations, and public web sharing.
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <strong>Best beginner practice:</strong> Use database templates for standardized candidate and task intake.
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                n8n
              </span>
              <h4 className="text-sm font-bold text-slate-900">Community Edition & Cloud Trial</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                n8n is fair-code and 100% free to host locally on your machine via Docker or desktop runner with
                unlimited workflow executions. n8n Cloud also offers a free trial sandbox.
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <strong>Best beginner practice:</strong> Always use the "Test Webhook" URL when building workflows.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Cheat Sheets */}
      {activeTab === 'cheatsheets' && (
        <div className="space-y-6">
          {/* Gemini Cheat Sheet */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              Google AI Studio Prompt Parameters Cheat Sheet
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-1">Temperature (0.0 - 2.0)</span>
                Controls randomness. Use <strong>0.0</strong> for deterministic JSON extraction; use <strong>0.7</strong> for creative writing.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-1">System Instructions</span>
                Sets the persistent persona, boundaries, tone, and prohibited actions before the conversation begins.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-1">Response Schema</span>
                Forces the model to return valid JSON adhering to your exact key names and data types.
              </div>
            </div>
          </div>

          {/* n8n Cheat Sheet */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              n8n Visual Automation Node Reference
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-amber-700 block mb-1">Webhook Node</span>
                Listens for incoming HTTP POST/GET requests. Acts as the automation entry door.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-amber-700 block mb-1">IF Condition Node</span>
                Splits workflow into True and False branches based on string, number, or boolean checks.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-amber-700 block mb-1">JSON Expression Syntax</span>
                Reference prior node data using <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">{'{{$json.fieldName}}'}</code>.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Responsible AI Charter */}
      {activeTab === 'ethics' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex items-center space-x-2 text-indigo-900 text-sm font-bold">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>The GenAI Launchpad Responsible AI Charter</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            As non-technical and technical builders deploying AI into workplaces, we hold a duty to ensure
            these tools benefit people fairly, transparently, and securely.
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h5 className="text-xs font-bold text-slate-900 mb-1">
                1. Human-in-the-Loop Supremacy
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                AI systems must remain advisory and assistive. In recruitment, healthcare, legal, and financial decisions, an authorized human professional must verify facts and make all final determinations.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h5 className="text-xs font-bold text-slate-900 mb-1">
                2. Anti-Bias & Non-Discrimination Guardrails
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prompts and models must never assess candidates or clients based on protected demographic attributes (age, race, gender, nationality, sexual orientation, disability status).
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h5 className="text-xs font-bold text-slate-900 mb-1">
                3. Privacy & Synthetic Data Discipline
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Never enter personally identifiable information (PII), unredacted resumes, bank accounts, or corporate secrets into public LLM interfaces. Test exclusively with synthetic datasets.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
