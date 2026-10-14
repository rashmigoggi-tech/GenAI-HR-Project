import React, { useState } from 'react';
import {
  ShieldCheck,
  PlusCircle,
  FileText,
  Download,
  Sparkles,
  CheckCircle2,
  FolderGit2,
} from 'lucide-react';
import { ALL_PROJECTS } from '../data/projectsData';
import { TOOL_TRACKS } from '../data/learningTracks';
import { ALL_PROMPTS } from '../data/promptLibraryData';
import { ProjectItem } from '../types';

interface AdminContentManagerViewProps {
  onAddCustomProject: (project: ProjectItem) => void;
}

export const AdminContentManagerView: React.FC<AdminContentManagerViewProps> = ({
  onAddCustomProject,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState('recruitment');
  const [newProblem, setNewProblem] = useState('');
  const [newExplanation, setNewExplanation] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj: ProjectItem = {
      id: `custom-p-${Date.now()}`,
      title: newTitle,
      domain: newDomain as any,
      difficulty: 'Beginner',
      estimatedHours: 2,
      tools: ['ai-studio', 'notion'],
      businessProblem: newProblem || 'Operational friction in daily workflows.',
      intendedUsers: 'Team members, operations assistants, analysts.',
      beginnerExplanation: newExplanation || 'Learn how to solve this business challenge using GenAI tools.',
      learningObjectives: [
        'Analyze the business process.',
        'Apply structured prompt engineering in AI Studio.',
        'Organize data in Notion.',
      ],
      prerequisites: ['Basic GenAI knowledge'],
      expectedResult: 'A documented functional prototype with verification checks.',
      steps: [
        {
          stepNumber: 1,
          title: 'Define the Business Specification',
          details: 'Clarify target inputs, expected outputs, and stakeholder constraints.',
          verificationTip: 'Ensure input parameters are strictly defined.',
        },
        {
          stepNumber: 2,
          title: 'Execute Prompt Engineering in AI Studio',
          details: 'Set up system instructions with role and format rules.',
          verificationTip: 'Test with synthetic data before production.',
        },
        {
          stepNumber: 3,
          title: 'Publish and Verify Deliverable',
          details: 'Review generated outputs and document case study metrics.',
          verificationTip: 'Human review required prior to sign-off.',
        },
      ],
      copyReadyPrompts: [
        {
          title: 'Custom Workflow Prompt',
          tool: 'ai-studio',
          prompt: `You are an operations assistant for ${newTitle}. Provide structured recommendations based strictly on provided context.`,
          parameters: ['Input Details'],
        },
      ],
      sampleInputData: {
        description: 'Test Scenario Data',
        sampleText: 'Sample input data for testing the custom workflow.',
      },
      expectedOutputs: {
        title: 'Structured Output Preview',
        format: 'Markdown Document',
        content: '# Output Preview\nVerified deliverable ready for human review.',
      },
      testingChecklist: ['Verify outputs match requirements', 'Check for zero hallucinations'],
      commonErrors: [{ error: 'Vague input results in generic output', fix: 'Add specific constraints.' }],
      securitySafeguards: ['Never input real personal PII', 'Human review required before publishing'],
      advancedIdeas: ['Connect workflow to n8n webhook'],
      caseStudyTemplate: {
        executiveSummary: `Deployed ${newTitle} workflow to streamline team operations.`,
        architecture: 'Google AI Studio + Notion relational workspace.',
        impactMetrics: 'Estimated 50% time savings on recurring task execution.',
      },
    };

    onAddCustomProject(newProj);
    setNewTitle('');
    setNewProblem('');
    setNewExplanation('');
    setShowAddForm(false);
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 3000);
  };

  const exportCurriculumManifest = () => {
    const manifest = {
      academyName: 'GenAI Launchpad — Learn AI Tools by Building Real Projects',
      version: '1.0.0',
      totalTracks: TOOL_TRACKS.length,
      totalProjects: ALL_PROJECTS.length,
      totalPrompts: ALL_PROMPTS.length,
      tools: TOOL_TRACKS.map((t) => ({ id: t.id, name: t.name })),
      projects: ALL_PROJECTS.map((p) => ({ id: p.id, title: p.title, domain: p.domain })),
    };
    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'genai-launchpad-manifest.json';
    a.click();
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Admin Content Management System
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          Manage curriculum tracks, publish new hands-on starter projects, and export system manifests.
        </p>
      </div>

      {successNotice && (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>New custom project successfully added to the Project Lab!</span>
        </div>
      )}

      {/* Content Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Active Tracks
          </span>
          <span className="text-2xl font-black text-indigo-700">{TOOL_TRACKS.length}</span>
          <span className="text-xs text-slate-500 block mt-0.5">Lovable, Studio, Stitch, Notion, n8n</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Starter Projects
          </span>
          <span className="text-2xl font-black text-indigo-700">{ALL_PROJECTS.length}</span>
          <span className="text-xs text-slate-500 block mt-0.5">8 Dedicated Recruitment</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Prompt Templates
          </span>
          <span className="text-2xl font-black text-indigo-700">{ALL_PROMPTS.length}</span>
          <span className="text-xs text-slate-500 block mt-0.5">Copy-Ready Templates</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            AI Engine
          </span>
          <span className="text-2xl font-black text-indigo-700">3.8 Flash</span>
          <span className="text-xs text-slate-500 block mt-0.5">Server-Side Verified</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel Project Creation' : 'Publish New Starter Project'}</span>
        </button>

        <button
          onClick={exportCurriculumManifest}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Curriculum Manifest (JSON)</span>
        </button>
      </div>

      {/* Project Add Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreateProject}
          className="p-6 bg-white rounded-2xl border border-indigo-200 shadow-sm space-y-4 animate-fadeIn"
        >
          <h4 className="text-sm font-bold text-slate-900">
            Publish Custom Project to Academy
          </h4>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Project Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Automated Customer Feedback Categorizer"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Business Domain
            </label>
            <select
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              aria-label="Business Domain"
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white"
            >
              <option value="recruitment">Recruitment & HR</option>
              <option value="finance">Finance</option>
              <option value="sales">Sales & CRM</option>
              <option value="marketing">Marketing</option>
              <option value="education">Education</option>
              <option value="operations">Operations & SOPs</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Business Problem
            </label>
            <textarea
              rows={2}
              placeholder="Describe the operational bottleneck..."
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Beginner-Friendly Explanation
            </label>
            <textarea
              rows={2}
              placeholder="Explain how the learner will build this solution..."
              value={newExplanation}
              onChange={(e) => setNewExplanation(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            Deploy Project to Academy
          </button>
        </form>
      )}
    </div>
  );
};
