import React, { useState, useEffect } from 'react';
import {
  Settings,
  User,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { UserPreferences, UserRole, ProjectDomain } from '../types';

interface ProfileSettingsViewProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updates: Partial<UserPreferences>) => void;
  onResetProgress: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  preferences,
  onUpdatePreferences,
  onResetProgress,
}) => {
  const [name, setName] = useState(preferences.name);
  const [role, setRole] = useState<UserRole>(preferences.role);
  const [domainInterest, setDomainInterest] = useState<ProjectDomain>(preferences.domainInterest);
  const [weeklyHours, setWeeklyHours] = useState(preferences.weeklyHours);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [apiHealth, setApiHealth] = useState<{ status: string; hasApiKey: boolean; model: string } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setApiHealth(d))
      .catch(() => setApiHealth({ status: 'offline', hasApiKey: false, model: 'gemini-3.8-flash' }));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePreferences({
      name,
      role,
      domainInterest,
      weeklyHours,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const roles = [
    { id: 'recruiter_hr', label: 'HR & Recruiter' },
    { id: 'student', label: 'Student' },
    { id: 'fresh_graduate', label: 'Fresh Graduate' },
    { id: 'finance_pro', label: 'Finance Professional' },
    { id: 'sales_pro', label: 'Sales Professional' },
    { id: 'marketing_pro', label: 'Marketing Professional' },
    { id: 'business_analyst', label: 'Business Analyst' },
    { id: 'entrepreneur', label: 'Entrepreneur / Founder' },
    { id: 'software_dev', label: 'Software Developer' },
    { id: 'other', label: 'General Non-Technical Learner' },
  ];

  const domains = [
    { id: 'recruitment', label: 'Recruitment & HR' },
    { id: 'finance', label: 'Finance & Budgeting' },
    { id: 'sales', label: 'Sales & CRM' },
    { id: 'marketing', label: 'Marketing & Content' },
    { id: 'education', label: 'Education & Study' },
    { id: 'operations', label: 'Operations & SOPs' },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Profile & Learning Preferences
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          Manage your personal learner details, study goals, domain roadmap, and local data persistence.
        </p>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Learner Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Target Weekly Study Goal
            </label>
            <select
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(parseInt(e.target.value, 10))}
              aria-label="Target Weekly Study Goal"
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white cursor-pointer"
            >
              <option value={2}>2 Hours / week (Casual pace)</option>
              <option value={4}>4 Hours / week (Recommended beginner)</option>
              <option value={6}>6 Hours / week (Active builder)</option>
              <option value={10}>10+ Hours / week (Bootcamp sprint)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Primary Role Focus
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              aria-label="Primary Role Focus"
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Primary Business Domain
            </label>
            <select
              value={domainInterest}
              onChange={(e) => setDomainInterest(e.target.value as ProjectDomain)}
              aria-label="Primary Business Domain"
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white cursor-pointer"
            >
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-white" /> : null}
            <span>{savedSuccess ? 'Preferences Saved!' : 'Save Preferences'}</span>
          </button>
        </div>
      </form>

      {/* Backend & AI Connection Status */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <h4 className="text-sm font-bold text-slate-900">
          Server-Side Gemini API Connection
        </h4>
        <div className="flex items-center space-x-3 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-800">
            Model: {apiHealth?.model || 'gemini-3.8-flash'}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">
            {apiHealth?.hasApiKey
              ? 'API Key Connected via Secrets (Full Gemini Generation)'
              : 'Built-in Instructional AI Active (Zero-setup learning mode)'}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          AI Studio handles the server-side environment automatically. API keys are never exposed to browser bundles.
        </p>
      </div>

      {/* Reset Progress Danger Zone */}
      <div className="bg-rose-50/50 rounded-2xl border border-rose-200 p-6 shadow-2xs space-y-3">
        <h4 className="text-sm font-bold text-rose-900">
          Data Management & Progress Reset
        </h4>
        <p className="text-xs text-rose-700 leading-relaxed">
          Reset all lesson completion checkmarks, user project step progress, and custom portfolio entries. This action cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to reset all academy progress?')) {
              onResetProgress();
            }
          }}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Academy Progress</span>
        </button>
      </div>
    </div>
  );
};
