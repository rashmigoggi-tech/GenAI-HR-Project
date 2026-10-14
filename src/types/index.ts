export type UserRole =
  | 'student'
  | 'fresh_graduate'
  | 'recruiter_hr'
  | 'finance_pro'
  | 'sales_pro'
  | 'marketing_pro'
  | 'business_analyst'
  | 'entrepreneur'
  | 'software_dev'
  | 'career_switcher'
  | 'other';

export type ToolId = 'lovable' | 'ai-studio' | 'stitch' | 'notion' | 'n8n';

export type ProjectDomain =
  | 'recruitment'
  | 'finance'
  | 'sales'
  | 'marketing'
  | 'education'
  | 'operations'
  | 'general';

export type DifficultyLevel = 'Beginner' | 'Beginner to Intermediate' | 'Intermediate';

export type ProjectStatus = 'not_started' | 'in_progress' | 'needs_review' | 'completed';

export interface UserPreferences {
  name: string;
  role: UserRole;
  aiExperience: 'none' | 'used_chatgpt_a_bit' | 'intermediate';
  codingComfort: 'no_coding' | 'basic_html_css' | 'some_coding';
  primaryGoal: string;
  weeklyHours: number;
  domainInterest: ProjectDomain;
  onboardingCompleted: boolean;
  streakDays: number;
  lastActiveDate: string;
}

export interface LessonStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip?: string;
}

export interface Lesson {
  id: string;
  toolId: ToolId;
  moduleId: string;
  moduleTitle: string;
  title: string;
  description: string;
  durationMinutes: number;
  level: DifficultyLevel;
  concepts: string[];
  tutorialSteps: LessonStep[];
  samplePrompts: {
    label: string;
    prompt: string;
    whyItWorks: string;
  }[];
  expectedResult: string;
  exercise: {
    task: string;
    hint: string;
    solution: string;
  };
  troubleshooting: {
    issue: string;
    fix: string;
  }[];
}

export interface LearningModule {
  id: string;
  toolId: ToolId;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface ToolTrack {
  id: ToolId;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: string;
  accentColor: string;
  freeTierDetails: string;
  whatYouWillBuild: string[];
  modules: LearningModule[];
}

export interface ProjectStep {
  stepNumber: number;
  title: string;
  details: string;
  deliverableSnippet?: string;
  verificationTip: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  domain: ProjectDomain;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  tools: ToolId[];
  isRecruitmentSpecial?: boolean;
  businessProblem: string;
  intendedUsers: string;
  beginnerExplanation: string;
  learningObjectives: string[];
  prerequisites: string[];
  expectedResult: string;
  steps: ProjectStep[];
  copyReadyPrompts: {
    title: string;
    tool: ToolId;
    prompt: string;
    parameters: string[];
  }[];
  sampleInputData: {
    description: string;
    sampleText: string;
  };
  expectedOutputs: {
    title: string;
    format: string;
    content: string;
  };
  testingChecklist: string[];
  commonErrors: {
    error: string;
    fix: string;
  }[];
  securitySafeguards: string[];
  advancedIdeas: string[];
  caseStudyTemplate: {
    executiveSummary: string;
    architecture: string;
    impactMetrics: string;
  };
}

export interface PromptItem {
  id: string;
  title: string;
  category:
    | 'App Building'
    | 'UI/UX Design'
    | 'Gemini Prompting'
    | 'Notion Systems'
    | 'n8n Automations'
    | 'Recruitment'
    | 'Finance'
    | 'Sales'
    | 'Marketing'
    | 'Productivity';
  tool: ToolId | 'general';
  purpose: string;
  requiredInputs: string[];
  promptTemplate: string;
  customizationTips: string;
  expectedOutput: string;
  limitations: string;
  tags: string[];
}

export interface UserProjectProgress {
  projectId: string;
  status: ProjectStatus;
  completedStepNumbers: number[];
  notes: string;
  startedAt: string;
  completedAt?: string;
  customOutputs?: string;
}

export interface PortfolioEntry {
  id: string;
  projectId: string;
  title: string;
  domain: ProjectDomain;
  tools: ToolId[];
  problemSummary: string;
  solutionSummary: string;
  keyPrompts: string;
  deliverableSummary: string;
  metricsImpact: string;
  ethicalSafeguards: string;
  createdAt: string;
  isPublished: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: 'teach' | 'guide' | 'hint' | 'review';
  timestamp: string;
  source?: string;
}

export interface BadgeAward {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
}
