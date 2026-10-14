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
  Sparkles,
  Play,
  Download,
  Share2,
  Lock,
  Layers,
  FileCode,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import { ProjectItem, ProjectStatus, UserProjectProgress } from '../types';

interface ProjectWorkspaceModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProjectProgress | undefined;
  onUpdateProgress: (updates: Partial<UserProjectProgress>) => void;
  onSaveToPortfolio: (caseStudy: any) => void;
}

export const ProjectWorkspaceModal: React.FC<ProjectWorkspaceModalProps> = ({
  project,
  isOpen,
  onClose,
  userProgress,
  onUpdateProgress,
  onSaveToPortfolio,
}) => {
  const [activeTab, setActiveTab] = useState<
    'blueprint' | 'steps' | 'runner' | 'prompts' | 'safeguards' | 'casestudy'
  >('blueprint');

  const [copiedPromptIdx, setCopiedPromptIdx] = useState<number | null>(null);
  const [copiedData, setCopiedData] = useState(false);
  const [portfolioAdded, setPortfolioAdded] = useState(false);

  // Interactive Runner state
  const [runnerLoading, setRunnerLoading] = useState(false);
  const [runnerOutput, setRunnerOutput] = useState<string>('');
  const [jdForm, setJdForm] = useState({
    title: 'Senior Talent Acquisition Partner',
    department: 'People Operations',
    experience: '4-6 years',
    workSetup: 'Hybrid',
    location: 'Chicago, IL',
    skills: 'Full-cycle recruiting, technical sourcing, ATS management, inclusive interviewing, stakeholder communication',
    responsibilities: 'Lead recruitment for 6 critical engineering positions, partner with engineering VPs, streamline candidate feedback loops.',
  });

  const [iqForm, setIqForm] = useState({
    title: 'Frontend Engineer',
    seniority: 'Mid-Level (3+ years)',
    stage: 'Technical Round 1',
    duration: 45,
    competencies: 'React performance optimization, state management, responsive CSS, team communication',
  });

  const [resumeText, setResumeText] = useState(
    'CANDIDATE ID: SYNTH-9021\nRole: QA Automation Engineer\nExperience: 3 years at TechCorp (Manual testing, Cypress, Postman, JIRA).\nSkills: SQL, JavaScript, API testing, Regression testing, Agile Scrum.\nEducation: B.S. in Computer Science (Completed).'
  );

  const completedSteps = userProgress?.completedStepNumbers || [];
  const projectNotes = userProgress?.notes || '';
  const projectStatus: ProjectStatus = userProgress?.status || 'not_started';

  if (!isOpen || !project) return null;

  const toggleStep = (stepNumber: number) => {
    let newSteps = [...completedSteps];
    if (newSteps.includes(stepNumber)) {
      newSteps = newSteps.filter((s) => s !== stepNumber);
    } else {
      newSteps.push(stepNumber);
    }

    const isAllComplete = newSteps.length === project.steps.length;
    onUpdateProgress({
      completedStepNumbers: newSteps,
      status: isAllComplete ? 'completed' : 'in_progress',
    });
  };

  const handleStatusChange = (newStatus: ProjectStatus) => {
    onUpdateProgress({ status: newStatus });
  };

  const handleNotesChange = (text: string) => {
    onUpdateProgress({ notes: text });
  };

  const copyText = (text: string, type: 'prompt' | 'data', idx?: number) => {
    navigator.clipboard.writeText(text);
    if (type === 'prompt' && idx !== undefined) {
      setCopiedPromptIdx(idx);
      setTimeout(() => setCopiedPromptIdx(null), 2000);
    } else {
      setCopiedData(true);
      setTimeout(() => setCopiedData(false), 2000);
    }
  };

  const executeInteractiveTool = async (type: string) => {
    setRunnerLoading(true);
    setRunnerOutput('');
    try {
      let payload: any = {};
      if (type === 'job-description') {
        payload = jdForm;
      } else if (type === 'interview-questions') {
        payload = iqForm;
      } else {
        payload = { resumeText };
      }

      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, payload }),
      });
      const data = await res.json();
      setRunnerOutput(data.result || 'Generated successfully.');
    } catch (err) {
      console.error(err);
      setRunnerOutput('Generated output. Review details below.');
    } finally {
      setRunnerLoading(false);
    }
  };

  const handleAddToPortfolio = () => {
    onSaveToPortfolio({
      id: `port-${project.id}-${Date.now()}`,
      projectId: project.id,
      title: project.title,
      domain: project.domain,
      tools: project.tools,
      problemSummary: project.businessProblem,
      solutionSummary: project.beginnerExplanation,
      keyPrompts: project.copyReadyPrompts[0]?.prompt || '',
      deliverableSummary: project.expectedOutputs.content,
      metricsImpact: project.caseStudyTemplate.impactMetrics,
      ethicalSafeguards: project.securitySafeguards.join('; '),
      createdAt: new Date().toISOString().split('T')[0],
      isPublished: true,
    });
    setPortfolioAdded(true);
    setTimeout(() => setPortfolioAdded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Workspace Top Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              <span>{project.domain.toUpperCase()}</span>
              <span>•</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {project.difficulty}
              </span>
              <span>•</span>
              <span className="flex items-center text-slate-500 font-normal">
                <Clock className="w-3.5 h-3.5 mr-1" />
                ~{project.estimatedHours} hrs
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            {/* Status Dropdown */}
            <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
              <span className="text-slate-400 font-medium">Status:</span>
              <select
                value={projectStatus}
                onChange={(e) => handleStatusChange(e.target.value as ProjectStatus)}
                aria-label="Project Status"
                className="font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="needs_review">Needs Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto text-xs font-semibold">
          {[
            { id: 'blueprint', label: '1. Blueprint & Specs', icon: BookOpen },
            { id: 'steps', label: `2. Implementation Steps (${completedSteps.length}/${project.steps.length})`, icon: CheckCircle2 },
            { id: 'runner', label: '3. Interactive Tool Runner', icon: Sparkles },
            { id: 'prompts', label: '4. Prompts & Data', icon: Terminal },
            { id: 'safeguards', label: '5. QA & Ethical Safeguards', icon: Lock },
            { id: 'casestudy', label: '6. Portfolio Case Study', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-3 px-3.5 whitespace-nowrap border-b-2 transition ${
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
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60">
          {/* TAB 1: Blueprint & Specs */}
          {activeTab === 'blueprint' && (
            <div className="space-y-6 max-w-4xl">
              {/* Business Problem & Intended Users */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
                    The Business Problem
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.businessProblem}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                    Intended Users
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.intendedUsers}
                  </p>
                </div>
              </div>

              {/* Beginner Explanation */}
              <div className="p-5 bg-indigo-50/70 rounded-xl border border-indigo-100">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1.5">
                  Beginner-Friendly Explanation
                </h4>
                <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed">
                  {project.beginnerExplanation}
                </p>
              </div>

              {/* Learning Objectives */}
              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Learning Objectives
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.learningObjectives.map((obj, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Prerequisites */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Required Tools
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200"
                      >
                        {t.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Prerequisites
                  </span>
                  <ul className="space-y-1">
                    {project.prerequisites.map((p, idx) => (
                      <li key={idx} className="text-xs text-slate-600">
                        • {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Expected Result */}
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                <span className="font-bold block mb-1">Expected Final Deliverable:</span>
                <p className="leading-relaxed">{project.expectedResult}</p>
              </div>
            </div>
          )}

          {/* TAB 2: Step-by-Step Implementation */}
          {activeTab === 'steps' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Guided Implementation Steps
                </h4>
                <p className="text-xs text-slate-500">
                  Mark off each step as you complete it in your tools. Your progress is saved automatically.
                </p>
              </div>

              <div className="space-y-3.5">
                {project.steps.map((st) => {
                  const isChecked = completedSteps.includes(st.stepNumber);
                  return (
                    <div
                      key={st.stepNumber}
                      onClick={() => toggleStep(st.stepNumber)}
                      className={`p-4 rounded-xl border cursor-pointer transition shadow-2xs ${
                        isChecked
                          ? 'bg-emerald-50/50 border-emerald-300'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-400">
                              Step {st.stepNumber}:
                            </span>
                            <h5
                              className={`text-sm font-bold ${
                                isChecked ? 'text-emerald-900 line-through' : 'text-slate-900'
                              }`}
                            >
                              {st.title}
                            </h5>
                          </div>
                          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                            {st.details}
                          </p>

                          {st.deliverableSnippet && (
                            <div className="mt-2 p-2 bg-slate-900 text-slate-200 font-mono text-[11px] rounded">
                              {st.deliverableSnippet}
                            </div>
                          )}

                          <div className="mt-2 text-[11px] text-slate-500 flex items-center space-x-1">
                            <span className="font-semibold text-slate-700">Verification Tip:</span>
                            <span>{st.verificationTip}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Learner Personal Notes Box */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  My Implementation Notes & Discovered URLs
                </label>
                <textarea
                  value={projectNotes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="Record your Notion page link, test observations, prompts you adjusted, or edge cases here..."
                  rows={3}
                  className="w-full p-3 rounded-lg border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Interactive Tool Runner / Sandbox */}
          {activeTab === 'runner' && (
            <div className="space-y-6 max-w-4xl">
              <div className="p-4 bg-indigo-50/80 rounded-xl border border-indigo-200 flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-indigo-950">
                    Live Interactive Studio Simulator
                  </h4>
                  <p className="text-xs text-indigo-800 mt-0.5 leading-relaxed">
                    Test this project’s AI capability directly inside this sandbox. Powered by{' '}
                    <strong>gemini-3.8-flash</strong> on our secure server, with structured instructional fallback.
                  </p>
                </div>
              </div>

              {/* Sub-Runner based on project domain/type */}
              {project.id === 'rec-p1' || project.domain === 'recruitment' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Left: Input Form */}
                  <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Input Job Parameters
                    </h5>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={jdForm.title}
                        onChange={(e) => setJdForm({ ...jdForm, title: e.target.value })}
                        className="w-full p-2 border border-slate-200 rounded text-xs text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                          Department
                        </label>
                        <input
                          type="text"
                          value={jdForm.department}
                          onChange={(e) => setJdForm({ ...jdForm, department: e.target.value })}
                          className="w-full p-2 border border-slate-200 rounded text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                          Experience
                        </label>
                        <input
                          type="text"
                          value={jdForm.experience}
                          onChange={(e) => setJdForm({ ...jdForm, experience: e.target.value })}
                          className="w-full p-2 border border-slate-200 rounded text-xs text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Must-Have Skills
                      </label>
                      <textarea
                        rows={2}
                        value={jdForm.skills}
                        onChange={(e) => setJdForm({ ...jdForm, skills: e.target.value })}
                        className="w-full p-2 border border-slate-200 rounded text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Core Responsibilities
                      </label>
                      <textarea
                        rows={2}
                        value={jdForm.responsibilities}
                        onChange={(e) => setJdForm({ ...jdForm, responsibilities: e.target.value })}
                        className="w-full p-2 border border-slate-200 rounded text-xs text-slate-800"
                      />
                    </div>

                    <button
                      onClick={() => executeInteractiveTool('job-description')}
                      disabled={runnerLoading}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center justify-center space-x-1.5"
                    >
                      {runnerLoading ? (
                        <span>Generating Draft...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Generate Job Description</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right: Output Preview */}
                  <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Live Generated Deliverable
                        </span>
                        {runnerOutput && (
                          <button
                            onClick={() => copyText(runnerOutput, 'data')}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                          >
                            {copiedData ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedData ? 'Copied' : 'Copy Output'}</span>
                          </button>
                        )}
                      </div>

                      <div className="max-h-[340px] overflow-y-auto text-xs text-slate-700 whitespace-pre-wrap leading-relaxed font-sans pr-2">
                        {runnerOutput || (
                          <div className="text-slate-400 italic py-8 text-center">
                            Click "Generate Job Description" on the left to see the structured output preview here.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-amber-900 bg-amber-50 p-2 rounded">
                      ⚠️ <strong>Human Oversight:</strong> Recruiters must verify all requirements before public posting.
                    </div>
                  </div>
                </div>
              ) : (
                /* Default Interactive Prompt Tester */
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Prompt Execution Sandbox
                    </h5>
                    <button
                      onClick={() => executeInteractiveTool('interview-questions')}
                      disabled={runnerLoading}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Run Test with Gemini 3.8 Flash</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-900 text-slate-200 rounded-lg font-mono text-xs max-h-72 overflow-y-auto whitespace-pre-wrap">
                    {runnerOutput || project.expectedOutputs.content}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Prompts & Sample Data */}
          {activeTab === 'prompts' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Copy-Ready Prompt Templates
                </h4>
                <p className="text-xs text-slate-500">
                  Tested prompts formatted with system constraints, clear outputs, and variable placeholders.
                </p>
              </div>

              {project.copyReadyPrompts.map((cp, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-800">{cp.title}</span>
                      <span className="text-[10px] font-semibold text-slate-400 ml-2">
                        (Tool: {cp.tool.toUpperCase()})
                      </span>
                    </div>
                    <button
                      onClick={() => copyText(cp.prompt, 'prompt', idx)}
                      className="flex items-center space-x-1.5 px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs font-semibold text-slate-700 transition"
                    >
                      {copiedPromptIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                    {cp.prompt}
                  </div>

                  <div className="px-4 py-2 bg-slate-50 text-[11px] text-slate-500 border-t border-slate-200 flex items-center space-x-2">
                    <span className="font-semibold text-slate-700">Inputs to replace:</span>
                    <span>{cp.parameters.join(', ')}</span>
                  </div>
                </div>
              ))}

              {/* Sample Test Data */}
              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Sample Test Input Data ({project.sampleInputData.description})
                  </h5>
                  <button
                    onClick={() => copyText(project.sampleInputData.sampleText, 'data')}
                    className="text-xs text-indigo-600 font-semibold hover:text-indigo-800"
                  >
                    Copy Sample Data
                  </button>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-800 border border-slate-200 whitespace-pre-wrap">
                  {project.sampleInputData.sampleText}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: QA, Safeguards & Common Errors */}
          {activeTab === 'safeguards' && (
            <div className="space-y-6 max-w-4xl">
              {/* Security & Safeguards Banner */}
              <div className="p-5 bg-amber-50/80 rounded-xl border border-amber-200 space-y-2">
                <div className="flex items-center space-x-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-4 h-4 text-amber-700" />
                  <span>Responsible AI & Data Privacy Safeguards</span>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {project.securitySafeguards.map((item, idx) => (
                    <li key={idx} className="text-xs text-amber-950 flex items-start space-x-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testing Checklist */}
              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Verification Testing Checklist
                </h5>
                <div className="space-y-2">
                  {project.testingChecklist.map((chk, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Errors & Solutions */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Common Gotchas & Solutions
                </h5>
                {project.commonErrors.map((err, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <div className="text-xs font-bold text-rose-700 mb-1">
                      ⚠️ Error: {err.error}
                    </div>
                    <div className="text-xs text-slate-700 pl-3 border-l-2 border-emerald-500">
                      <strong>Fix:</strong> {err.fix}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Portfolio Case Study Builder */}
          {activeTab === 'casestudy' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Portfolio Case Study Template
                  </h4>
                  <p className="text-xs text-slate-500">
                    Document this project in your professional portfolio to showcase your GenAI capability to employers.
                  </p>
                </div>
                <button
                  onClick={handleAddToPortfolio}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                >
                  {portfolioAdded ? <Check className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                  <span>{portfolioAdded ? 'Added to Portfolio!' : 'Save to My Portfolio'}</span>
                </button>
              </div>

              <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Executive Summary
                  </span>
                  <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                    {project.caseStudyTemplate.executiveSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    System Architecture
                  </span>
                  <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                    {project.caseStudyTemplate.architecture}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Measurable Impact Metrics
                  </span>
                  <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded font-medium mt-1">
                    {project.caseStudyTemplate.impactMetrics}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Ethical Safeguards & Human Review
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    All AI-assisted outputs are subject to human evaluation. No protected traits or autonomous decisions permitted.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Progress: <strong>{completedSteps.length} of {project.steps.length} steps</strong> verified
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAddToPortfolio}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              Export Case Study
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              Done & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
