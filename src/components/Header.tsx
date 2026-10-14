import React from 'react';
import {
  Menu,
  Sparkles,
  BotMessageSquare,
  Compass,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import { UserPreferences } from '../types';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenMentor: () => void;
  onOpenOnboarding: () => void;
  preferences: UserPreferences;
  currentViewTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenMentor,
  onOpenOnboarding,
  preferences,
  currentViewTitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {currentViewTitle}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            No-Code & Low-Code GenAI Academy for Non-Technical Learners
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Streak counter */}
        <div
          title="Daily Study Streak"
          className="flex items-center space-x-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-full text-xs font-semibold"
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>{preferences.streakDays} Day Streak</span>
        </div>

        {/* Change Roadmap button */}
        <button
          onClick={onOpenOnboarding}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium transition"
        >
          <Compass className="w-3.5 h-3.5 text-slate-500" />
          <span>Tune Roadmap</span>
        </button>

        {/* Quick Launch AI Mentor Button */}
        <button
          onClick={onOpenMentor}
          className="flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition shadow-xs"
        >
          <BotMessageSquare className="w-4 h-4" />
          <span>AI Mentor</span>
        </button>
      </div>
    </header>
  );
};
