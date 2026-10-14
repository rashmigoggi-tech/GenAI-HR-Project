import React, { useState } from 'react';
import {
  X,
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Briefcase,
  Layers,
  Clock,
  Target,
} from 'lucide-react';
import { UserPreferences, UserRole, ProjectDomain } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: UserPreferences) => void;
  initialPreferences: UserPreferences;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPreferences,
}) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>(initialPreferences.role || 'recruiter_hr');
  const [aiExperience, setAiExperience] = useState<'none' | 'used_chatgpt_a_bit' | 'intermediate'>(
    initialPreferences.aiExperience || 'used_chatgpt_a_bit'
  );
  const [codingComfort, setCodingComfort] = useState<'no_coding' | 'basic_html_css' | 'some_coding'>(
    initialPreferences.codingComfort || 'no_coding'
  );
  const [primaryGoal, setPrimaryGoal] = useState<string>(
    initialPreferences.primaryGoal || 'Learn to build practical AI tools and automate daily workflows.'
  );
  const [weeklyHours, setWeeklyHours] = useState<number>(initialPreferences.weeklyHours || 4);
  const [domainInterest, setDomainInterest] = useState<ProjectDomain>(
    initialPreferences.domainInterest || 'recruitment'
  );

  if (!isOpen) return null;

  const rolesList: { id: UserRole; label: string; desc: string }[] = [
    { id: 'recruiter_hr', label: 'Recruiter & HR Specialist', desc: 'Talent sourcing, candidate pipelines, job descriptions' },
    { id: 'student', label: 'Student', desc: 'Exam prep, study planning, project portfolio' },
    { id: 'fresh_graduate', label: 'Fresh Graduate', desc: 'Job hunt prep, portfolio building, practical skills' },
    { id: 'finance_pro', label: 'Finance Professional', desc: 'Expense tracking, budget sheets, invoice extraction' },
    { id: 'sales_pro', label: 'Sales Professional', desc: 'Lead tracking, client outreach, follow-up automation' },
    { id: 'marketing_pro', label: 'Marketing Professional', desc: 'Content calendars, social repurposing, briefs' },
    { id: 'business_analyst', label: 'Business Analyst', desc: 'Data categorization, process mapping, dashboards' },
    { id: 'entrepreneur', label: 'Entrepreneur / Founder', desc: 'MVP building, low-cost operations, rapid prototyping' },
    { id: 'software_dev', label: 'Software Developer', desc: 'AI-assisted dev, prompt engineering, system design' },
    { id: 'other', label: 'General Non-Technical Learner', desc: 'Curious learner wanting to explore GenAI tools' },
  ];

  const domainRoadmapMap: Record<ProjectDomain, string[]> = {
    recruitment: [
      '1. Introduction to Generative AI & Prompt Anatomy',
      '2. Google AI Studio: Job Description Generator & Anti-Bias Filters',
      '3. Notion: 7-Stage Candidate Pipeline Tracking Workspace',
      '4. Google Stitch: Recruitment Dashboard & Profile Screen Design',
      '5. Lovable: Interactive Candidate Review Web Application',
      '6. n8n: Interview Booking & Automated Reminder Pipeline',
      '7. Google AI Studio: Interview Question Generator & STAR Rubrics',
      '8. Capstone: End-to-End Recruitment Operations Suite',
    ],
    finance: [
      '1. GenAI Foundations & Data Privacy Principles',
      '2. Google AI Studio: Structured JSON Invoice Extraction',
      '3. Notion: Relational Monthly Budget & Cash Flow Planner',
      '4. Google Stitch: Finance Dashboard & Visual Budget Meters',
      '5. Lovable: Personal Expense Logging App with Local Storage',
      '6. n8n: Automated Expense Receipt Routing & Categorization',
      '7. Capstone: Automated Small Business Financial Command Center',
    ],
    sales: [
      '1. GenAI Fundamentals for Non-Technical Sales Teams',
      '2. Google AI Studio: 4-Sentence High-Converting Cold Email Drafter',
      '3. Notion: B2B Deal Pipeline & Weighted Forecast CRM',
      '4. Google Stitch: Client Relationship & Lead Scoring View',
      '5. Lovable: Lead Qualification & Demo Booking Portal',
      '6. n8n: Follow-up Reminder & Stale Lead Alert Automation',
      '7. Capstone: End-to-End Sales Prospecting & Handoff Pipeline',
    ],
    marketing: [
      '1. GenAI Foundations & Brand Voice Guidelines',
      '2. Google AI Studio: Multi-Channel Social Copy Repurposing',
      '3. Notion: Cross-Channel Editorial Content Calendar',
      '4. Google Stitch: Marketing Performance Analytics Wireframe',
      '5. Lovable: Campaign Brief & Creative Asset Hub',
      '6. n8n: Automated Social Scheduling & Slack Alerts',
      '7. Capstone: Automated Content Engine from Idea to Publishing',
    ],
    education: [
      '1. GenAI Foundations & Active Recall Concepts',
      '2. Google AI Studio: Conceptual Multiple-Choice Quiz Generator',
      '3. Notion: Course Syllabus & Spaced Repetition Tracker',
      '4. Lovable: Pomodoro Focus Timer & Study Checklist App',
      '5. n8n: Daily Habit & Study Reminder Notifications',
      '6. Capstone: Interactive Personal Learning & Certification Academy',
    ],
    operations: [
      '1. GenAI Foundations & Knowledge Architecture',
      '2. Google AI Studio: Process to Standard SOP Converter',
      '3. Notion: Company Operating Procedures & Knowledge Base',
      '4. Google Stitch: Internal Request Management Layout',
      '5. Lovable: Team Service Desk & Asset Allocation Portal',
      '6. n8n: Meeting Action-Item Extractor & Task Board Sync',
      '7. Capstone: Automated Business Operations Command Hub',
    ],
    general: [
      '1. Introduction to Generative AI & 5 Core Tools',
      '2. Lovable: First Web Application in 15 Minutes',
      '3. Google AI Studio: Prompt Engineering Mastery',
      '4. Google Stitch: Modern Light UI Design Principles',
      '5. Notion: Building Your First Relational System',
      '6. n8n: Visual Node Automations & Webhooks',
      '7. Capstone: Multi-Tool Portfolio Project',
    ],
  };

  const handleFinish = () => {
    onSave({
      ...initialPreferences,
      role,
      aiExperience,
      codingComfort,
      primaryGoal,
      weeklyHours,
      domainInterest,
      onboardingCompleted: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Personalized Beginner Onboarding
              </h2>
              <p className="text-xs text-slate-500">
                Step {step} of 4 — Tailoring your zero-code GenAI roadmap
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: Current Role */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  What is your current role or background?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We customize project examples, case studies, and tutorials to your day-to-day domain.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {rolesList.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`text-left p-3.5 rounded-xl border transition flex flex-col justify-between ${
                      role === r.id
                        ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-slate-900 text-sm block">
                        {r.label}
                      </span>
                      <span className="text-xs text-slate-500 mt-0.5 block leading-relaxed">
                        {r.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: AI & Coding Experience */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Your Experience & Technical Comfort
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Remember: <strong>GenAI Launchpad is designed with zero coding assumptions</strong>.
                </p>
              </div>

              {/* AI experience */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Have you used Generative AI tools before?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: 'Completely New', desc: 'Never used AI before' },
                    { id: 'used_chatgpt_a_bit', label: 'Casual User', desc: 'Tried basic prompts in ChatGPT' },
                    { id: 'intermediate', label: 'Familiar', desc: 'Use AI tools occasionally for work' },
                  ].map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => setAiExperience(exp.id as any)}
                      className={`p-3 rounded-xl border text-left transition ${
                        aiExperience === exp.id
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold">{exp.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{exp.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coding comfort */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Are you comfortable with coding?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'no_coding', label: 'No Coding at All', desc: 'Prefer pure visual & prompt tools' },
                    { id: 'basic_html_css', label: 'A Little Bit', desc: 'Know basic web terms or spreadsheets' },
                    { id: 'some_coding', label: 'Comfortable', desc: 'Can inspect code or write small scripts' },
                  ].map((code) => (
                    <button
                      key={code.id}
                      onClick={() => setCodingComfort(code.id as any)}
                      className={`p-3 rounded-xl border text-left transition ${
                        codingComfort === code.id
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold">{code.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{code.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Domain & Goal & Time */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Target Domain & Weekly Study Time
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Which business domain do you want to build projects for first?
                </p>
              </div>

              {/* Domain Interest */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Business Focus
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'recruitment', label: 'Recruitment & HR', badge: 'Special Focus' },
                    { id: 'finance', label: 'Finance & Budgeting', badge: 'No-Code' },
                    { id: 'sales', label: 'Sales & CRM', badge: 'Pipeline' },
                    { id: 'marketing', label: 'Marketing & Content', badge: 'Creative' },
                    { id: 'education', label: 'Education & Study', badge: 'Learning' },
                    { id: 'operations', label: 'Operations & SOPs', badge: 'Systems' },
                  ].map((dom) => (
                    <button
                      key={dom.id}
                      onClick={() => setDomainInterest(dom.id as any)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                        domainInterest === dom.id
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-1 ring-indigo-600'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="text-sm font-semibold">{dom.label}</span>
                      <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider mt-1">
                        {dom.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Study Time */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  How much time can you study each week?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 4, 6, 10].map((hours) => (
                    <button
                      key={hours}
                      onClick={() => setWeeklyHours(hours)}
                      className={`py-2.5 px-3 rounded-xl border text-center transition ${
                        weeklyHours === hours
                          ? 'border-indigo-600 bg-indigo-50 font-bold text-indigo-900'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 text-sm'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{hours} hrs</span>
                      <span className="text-[10px] text-slate-500">per week</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Generated Personalized Roadmap */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/80 rounded-xl border border-indigo-200 flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-indigo-950">
                    Your Personalized Beginner Roadmap is Ready!
                  </h4>
                  <p className="text-xs text-indigo-800 mt-0.5">
                    Curated for a <strong>{role.replace('_', ' ')}</strong> targeting{' '}
                    <strong>{domainInterest.toUpperCase()}</strong> projects without programming.
                  </p>
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {(domainRoadmapMap[domainInterest] || domainRoadmapMap.recruitment).map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-slate-200 flex items-center space-x-3 text-xs font-medium text-slate-800 shadow-2xs"
                    >
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[11px] shrink-0">
                        {idx + 1}
                      </div>
                      <span className="flex-1">{item}</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Zero Code
                      </span>
                    </div>
                  )
                )}
              </div>

              <p className="text-[11px] text-slate-500 italic text-center">
                You can change these preferences or switch to any other project track anytime in Settings.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="text-xs text-slate-500 hover:text-slate-800 transition"
              >
                Skip Onboarding
              </button>
            )}
          </div>

          <div>
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center space-x-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Launch My Roadmap</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
