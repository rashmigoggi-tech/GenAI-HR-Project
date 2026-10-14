import {
  UserPreferences,
  UserProjectProgress,
  PortfolioEntry,
  BadgeAward,
  ProjectDomain,
  UserRole,
} from '../types';

const STORAGE_KEYS = {
  PREFERENCES: 'genai_academy_preferences',
  COMPLETED_LESSONS: 'genai_academy_completed_lessons',
  USER_PROJECTS: 'genai_academy_user_projects',
  SAVED_PROMPTS: 'genai_academy_saved_prompts',
  PORTFOLIO: 'genai_academy_portfolio',
  BADGES: 'genai_academy_badges',
  STUDY_MINUTES: 'genai_academy_study_minutes',
};

const DEFAULT_PREFERENCES: UserPreferences = {
  name: 'Learner',
  role: 'recruiter_hr',
  aiExperience: 'used_chatgpt_a_bit',
  codingComfort: 'no_coding',
  primaryGoal: 'Learn to automate recruitment workflows and build AI tools without writing code.',
  weeklyHours: 4,
  domainInterest: 'recruitment',
  onboardingCompleted: false,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

const INITIAL_PROJECT_PROGRESS: Record<string, UserProjectProgress> = {
  'rec-p1': {
    projectId: 'rec-p1',
    status: 'in_progress',
    completedStepNumbers: [1, 2],
    notes: 'Configured system instructions in AI Studio. Need to test with Junior Analyst brief.',
    startedAt: '2026-10-12',
  },
  'rec-p2': {
    projectId: 'rec-p2',
    status: 'not_started',
    completedStepNumbers: [],
    notes: '',
    startedAt: '2026-10-14',
  },
};

export const StorageService = {
  getPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PREFERENCES;
  },

  savePreferences(prefs: UserPreferences): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    } catch (e) {
      console.error(e);
    }
  },

  getCompletedLessons(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    // Defaults to some starter completed lessons for immediate engagement
    return ['lovable-l1', 'aistudio-l1'];
  },

  toggleLessonComplete(lessonId: string): boolean {
    const list = this.getCompletedLessons();
    const index = list.indexOf(lessonId);
    let isComplete = false;
    if (index >= 0) {
      list.splice(index, 1);
      isComplete = false;
    } else {
      list.push(lessonId);
      isComplete = true;
      this.addStudyMinutes(15);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
    return isComplete;
  },

  getUserProjects(): Record<string, UserProjectProgress> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROJECTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROJECT_PROGRESS;
  },

  updateProjectProgress(
    projectId: string,
    updates: Partial<UserProjectProgress>
  ): UserProjectProgress {
    const projects = this.getUserProjects();
    const current = projects[projectId] || {
      projectId,
      status: 'not_started',
      completedStepNumbers: [],
      notes: '',
      startedAt: new Date().toISOString().split('T')[0],
    };

    const updated: UserProjectProgress = { ...current, ...updates };
    if (updated.status === 'completed' && !updated.completedAt) {
      updated.completedAt = new Date().toISOString().split('T')[0];
      this.addStudyMinutes(60);
    }
    projects[projectId] = updated;

    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
    return updated;
  },

  getSavedPrompts(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_PROMPTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return ['pr-lovable-1', 'pr-aistudio-2', 'pr-notion-1'];
  },

  toggleSavePrompt(promptId: string): boolean {
    const saved = this.getSavedPrompts();
    const idx = saved.indexOf(promptId);
    let isSaved = false;
    if (idx >= 0) {
      saved.splice(idx, 1);
      isSaved = false;
    } else {
      saved.push(promptId);
      isSaved = true;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(saved));
    } catch (e) {
      console.error(e);
    }
    return isSaved;
  },

  getPortfolioEntries(): PortfolioEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    // Initial sample case study
    return [
      {
        id: 'port-1',
        projectId: 'rec-p1',
        title: 'AI Job Description Generator & Bias Auditor',
        domain: 'recruitment',
        tools: ['ai-studio', 'lovable'],
        problemSummary:
          'Hiring teams were spending ~3 hours per role drafting inconsistent, buzzword-heavy job postings with potential unintended gender bias.',
        solutionSummary:
          'Engineered a structured prompt architecture in Google AI Studio enforcing objective competencies, linked to a Lovable React front-end with copy-to-clipboard functionality.',
        keyPrompts:
          'System Instruction enforcing non-gendered terminology and mandatory human verification banners.',
        deliverableSummary:
          'Production-tested React generator web app with real-time Markdown preview and export.',
        metricsImpact: 'Drafting time cut by 75%; 100% compliance with non-discriminatory posting standards.',
        ethicalSafeguards:
          'AI drafts undergo mandatory recruiter sign-off before external publication; zero automated publishing.',
        createdAt: '2026-10-13',
        isPublished: true,
      },
    ];
  },

  savePortfolioEntry(entry: PortfolioEntry): void {
    const list = this.getPortfolioEntries();
    const idx = list.findIndex((p) => p.id === entry.id || p.projectId === entry.projectId);
    if (idx >= 0) {
      list[idx] = entry;
    } else {
      list.unshift(entry);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  },

  deletePortfolioEntry(id: string): void {
    const list = this.getPortfolioEntries().filter((p) => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  },

  getStudyMinutes(): number {
    try {
      const mins = localStorage.getItem(STORAGE_KEYS.STUDY_MINUTES);
      if (mins) return parseInt(mins, 10);
    } catch (e) {
      console.error(e);
    }
    return 135; // default initial study time
  },

  addStudyMinutes(mins: number): void {
    const total = this.getStudyMinutes() + mins;
    try {
      localStorage.setItem(STORAGE_KEYS.STUDY_MINUTES, total.toString());
    } catch (e) {
      console.error(e);
    }
  },

  getEarnedBadges(): BadgeAward[] {
    const completedLessons = this.getCompletedLessons().length;
    const completedProjects = Object.values(this.getUserProjects()).filter(
      (p) => p.status === 'completed'
    ).length;

    const allBadges: BadgeAward[] = [
      {
        id: 'b-first-step',
        title: 'Launch Initiated',
        description: 'Completed onboarding questionnaire and configured roadmap.',
        icon: 'Rocket',
        earnedAt: '2026-10-12',
      },
      {
        id: 'b-prompt-apprentice',
        title: 'Prompt Explorer',
        description: 'Completed first Google AI Studio lesson.',
        icon: 'Sparkles',
        earnedAt: completedLessons >= 1 ? '2026-10-13' : undefined,
      },
      {
        id: 'b-recruitment-pro',
        title: 'Ethical AI Recruiter',
        description: 'Started a project in the Recruitment Project Center.',
        icon: 'Users',
        earnedAt: '2026-10-13',
      },
      {
        id: 'b-builder',
        title: 'App Artisan',
        description: 'Complete 3 lessons in the Lovable track.',
        icon: 'Layout',
        earnedAt: completedLessons >= 3 ? '2026-10-14' : undefined,
      },
      {
        id: 'b-architect',
        title: 'Workflow Architect',
        description: 'Finish a capstone automation project in n8n.',
        icon: 'Workflow',
        earnedAt: completedProjects >= 1 ? '2026-10-14' : undefined,
      },
    ];

    return allBadges;
  },

  resetProgress(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_LESSONS);
      localStorage.removeItem(STORAGE_KEYS.USER_PROJECTS);
      localStorage.removeItem(STORAGE_KEYS.PORTFOLIO);
      localStorage.removeItem(STORAGE_KEYS.STUDY_MINUTES);
    } catch (e) {
      console.error(e);
    }
  },
};
