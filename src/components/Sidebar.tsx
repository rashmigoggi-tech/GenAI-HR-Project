import React from 'react';
import {
  Home,
  GraduationCap,
  Wrench,
  FolderGit2,
  Users,
  BotMessageSquare,
  BookOpenCheck,
  CheckSquare,
  Briefcase,
  TrendingUp,
  FileText,
  Settings,
  ShieldCheck,
  X,
  Sparkles,
} from 'lucide-react';
import { UserPreferences } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpen,
  onClose,
  preferences,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Home Dashboard', icon: Home, category: 'Main' },
    { id: 'landing', label: 'Start Learning (Overview)', icon: GraduationCap, category: 'Main' },
    { id: 'academy', label: 'AI Tools Academy', icon: Wrench, category: 'Curriculum' },
    { id: 'projects', label: 'Project Lab (20+)', icon: FolderGit2, category: 'Curriculum' },
    {
      id: 'recruitment',
      label: 'Recruitment Project Center',
      icon: Users,
      badge: 'Dedicated',
      category: 'Curriculum',
    },
    { id: 'mentor', label: 'AI Learning Mentor', icon: BotMessageSquare, category: 'AI Tools' },
    { id: 'prompts', label: 'Prompt Library', icon: BookOpenCheck, category: 'AI Tools' },
    { id: 'my-projects', label: 'My Projects', icon: CheckSquare, category: 'Workspace' },
    { id: 'portfolio', label: 'My Portfolio', icon: Briefcase, category: 'Workspace' },
    { id: 'progress', label: 'Progress Tracker', icon: TrendingUp, category: 'Workspace' },
    { id: 'resources', label: 'Resource Center', icon: FileText, category: 'Reference' },
    { id: 'settings', label: 'Profile & Settings', icon: Settings, category: 'Account' },
    { id: 'admin', label: 'Content Management', icon: ShieldCheck, category: 'Account' },
  ];

  const roleLabelMap: Record<string, string> = {
    recruiter_hr: 'HR & Recruiter',
    student: 'Student',
    fresh_graduate: 'Fresh Graduate',
    finance_pro: 'Finance Pro',
    sales_pro: 'Sales Pro',
    marketing_pro: 'Marketing Pro',
    business_analyst: 'Business Analyst',
    entrepreneur: 'Entrepreneur',
    software_dev: 'Software Developer',
    career_switcher: 'Career Switcher',
    other: 'Learner',
  };

  const handleNav = (id: string) => {
    onNavigate(id);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div
            onClick={() => handleNav('dashboard')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs group-hover:bg-indigo-700 transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base tracking-tight block leading-tight">
                GenAI Launchpad
              </span>
              <span className="text-xs text-indigo-600 font-medium tracking-wide">
                Learn AI by Building
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Persona Pill */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Track Persona:</span>
            <span className="font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
              {roleLabelMap[preferences.role] || 'Learner'}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">Weekly Goal:</span>
            <span className="text-slate-700 font-medium">
              {preferences.weeklyHours} hrs/week
            </span>
          </div>
        </div>

        {/* Nav Items List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            const showCategory =
              idx === 0 || navItems[idx - 1].category !== item.category;

            return (
              <React.Fragment key={item.id}>
                {showCategory && (
                  <div className="px-3 pt-3 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.category}
                  </div>
                )}
                <button
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-indigo-600' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* 5 Core Tools Bar at Bottom */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            5 Core AI Tools
          </div>
          <div className="grid grid-cols-5 gap-1 text-center">
            <span
              title="Lovable: AI Web Apps"
              className="text-[10px] py-1 bg-blue-50 text-blue-700 font-medium rounded border border-blue-200"
            >
              Lovable
            </span>
            <span
              title="Google AI Studio: Gemini Models"
              className="text-[10px] py-1 bg-indigo-50 text-indigo-700 font-medium rounded border border-indigo-200"
            >
              Studio
            </span>
            <span
              title="Google Stitch: AI UI Design"
              className="text-[10px] py-1 bg-sky-50 text-sky-700 font-medium rounded border border-sky-200"
            >
              Stitch
            </span>
            <span
              title="Notion: Systems & Relational DB"
              className="text-[10px] py-1 bg-emerald-50 text-emerald-700 font-medium rounded border border-emerald-200"
            >
              Notion
            </span>
            <span
              title="n8n: Visual Automations"
              className="text-[10px] py-1 bg-amber-50 text-amber-700 font-medium rounded border border-amber-200"
            >
              n8n
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
