import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { OnboardingModal } from './components/OnboardingModal';
import { MainDashboard } from './components/MainDashboard';
import { ToolsAcademyView } from './components/ToolsAcademyView';
import { LessonDetailModal } from './components/LessonDetailModal';
import { ProjectLabView } from './components/ProjectLabView';
import { RecruitmentCenterView } from './components/RecruitmentCenterView';
import { ProjectWorkspaceModal } from './components/ProjectWorkspaceModal';
import { AiMentorView } from './components/AiMentorView';
import { PromptLibraryView } from './components/PromptLibraryView';
import { MyProjectsView } from './components/MyProjectsView';
import { PortfolioBuilderView } from './components/PortfolioBuilderView';
import { ProgressTrackerView } from './components/ProgressTrackerView';
import { ResourceCenterView } from './components/ResourceCenterView';
import { ProfileSettingsView } from './components/ProfileSettingsView';
import { AdminContentManagerView } from './components/AdminContentManagerView';
import { StorageService } from './services/storage';
import {
  UserPreferences,
  UserProjectProgress,
  PortfolioEntry,
  ProjectItem,
  Lesson,
} from './types';
import { ALL_PROJECTS } from './data/projectsData';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Persistent States
  const [preferences, setPreferences] = useState<UserPreferences>(() =>
    StorageService.getPreferences()
  );
  const [completedLessons, setCompletedLessons] = useState<string[]>(() =>
    StorageService.getCompletedLessons()
  );
  const [userProjects, setUserProjects] = useState<Record<string, UserProjectProgress>>(() =>
    StorageService.getUserProjects()
  );
  const [savedPromptIds, setSavedPromptIds] = useState<string[]>(() =>
    StorageService.getSavedPrompts()
  );
  const [portfolioEntries, setPortfolioEntries] = useState<PortfolioEntry[]>(() =>
    StorageService.getPortfolioEntries()
  );
  const [studyMinutes, setStudyMinutes] = useState<number>(() =>
    StorageService.getStudyMinutes()
  );

  // Active Modals
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Dynamic projects list (including custom ones created via Admin)
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(ALL_PROJECTS);

  // Open onboarding on first load if not completed
  useEffect(() => {
    if (!preferences.onboardingCompleted) {
      setIsOnboardingOpen(true);
    }
  }, []);

  const handleUpdatePreferences = (updates: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...updates };
    setPreferences(updated);
    StorageService.savePreferences(updated);
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    StorageService.toggleLessonComplete(lessonId);
    setCompletedLessons(StorageService.getCompletedLessons());
    setStudyMinutes(StorageService.getStudyMinutes());
  };

  const handleUpdateProjectProgress = (updates: Partial<UserProjectProgress>) => {
    if (!selectedProject) return;
    const updated = StorageService.updateProjectProgress(selectedProject.id, updates);
    setUserProjects(StorageService.getUserProjects());
    setStudyMinutes(StorageService.getStudyMinutes());
  };

  const handleToggleSavePrompt = (promptId: string) => {
    StorageService.toggleSavePrompt(promptId);
    setSavedPromptIds(StorageService.getSavedPrompts());
  };

  const handleSaveToPortfolio = (entry: PortfolioEntry) => {
    StorageService.savePortfolioEntry(entry);
    setPortfolioEntries(StorageService.getPortfolioEntries());
  };

  const handleDeletePortfolioEntry = (id: string) => {
    StorageService.deletePortfolioEntry(id);
    setPortfolioEntries(StorageService.getPortfolioEntries());
  };

  const handleResetProgress = () => {
    StorageService.resetProgress();
    setCompletedLessons([]);
    setUserProjects({});
    setPortfolioEntries([]);
    setStudyMinutes(0);
    setPreferences(StorageService.getPreferences());
    alert('Academy progress has been reset successfully.');
  };

  const handleAddCustomProject = (newProj: ProjectItem) => {
    setProjectsList((prev) => [newProj, ...prev]);
    ALL_PROJECTS.unshift(newProj);
  };

  const viewTitles: Record<string, string> = {
    dashboard: 'Home Dashboard',
    landing: 'Start Learning (Platform Overview)',
    academy: 'AI Tools Academy',
    projects: 'Project Lab (20+ Starter Projects)',
    recruitment: 'Recruitment Project Center',
    mentor: 'AI Learning Mentor',
    prompts: 'Prompt Engineering Library',
    'my-projects': 'My Project Workspaces',
    portfolio: 'My Portfolio & Case Studies',
    progress: 'Skill & Progress Tracker',
    resources: 'Resource Center & Ethics Charter',
    settings: 'Profile & Settings',
    admin: 'Admin Content Management',
  };

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans text-slate-800 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={(v) => setCurrentView(v)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        preferences={preferences}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen w-full">
        {/* Sticky Header */}
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenMentor={() => setCurrentView('mentor')}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          preferences={preferences}
          currentViewTitle={viewTitles[currentView] || 'Academy'}
        />

        {/* View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentView === 'dashboard' && (
            <MainDashboard
              preferences={preferences}
              completedLessons={completedLessons}
              userProjects={userProjects}
              savedPromptsCount={savedPromptIds.length}
              studyMinutes={studyMinutes}
              onOpenLesson={(lesson) => setSelectedLesson(lesson)}
              onOpenProject={(project) => setSelectedProject(project)}
              onNavigate={(v) => setCurrentView(v)}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
            />
          )}

          {currentView === 'landing' && (
            <LandingPage
              onStartLearning={() => {
                if (!preferences.onboardingCompleted) {
                  setIsOnboardingOpen(true);
                } else {
                  setCurrentView('academy');
                }
              }}
              onExploreProjects={() => setCurrentView('projects')}
              onOpenRecruitment={() => setCurrentView('recruitment')}
              onOpenMentor={() => setCurrentView('mentor')}
            />
          )}

          {currentView === 'academy' && (
            <ToolsAcademyView
              completedLessons={completedLessons}
              onOpenLesson={(lesson) => setSelectedLesson(lesson)}
            />
          )}

          {currentView === 'projects' && (
            <ProjectLabView
              userProjects={userProjects}
              onOpenProject={(project) => setSelectedProject(project)}
            />
          )}

          {currentView === 'recruitment' && (
            <RecruitmentCenterView
              userProjects={userProjects}
              onOpenProject={(project) => setSelectedProject(project)}
            />
          )}

          {currentView === 'mentor' && <AiMentorView />}

          {currentView === 'prompts' && (
            <PromptLibraryView
              savedPromptIds={savedPromptIds}
              onToggleSave={handleToggleSavePrompt}
            />
          )}

          {currentView === 'my-projects' && (
            <MyProjectsView
              userProjects={userProjects}
              onOpenProject={(project) => setSelectedProject(project)}
              onNavigate={(v) => setCurrentView(v)}
            />
          )}

          {currentView === 'portfolio' && (
            <PortfolioBuilderView
              portfolioEntries={portfolioEntries}
              onDeleteEntry={handleDeletePortfolioEntry}
              onNavigate={(v) => setCurrentView(v)}
            />
          )}

          {currentView === 'progress' && (
            <ProgressTrackerView
              preferences={preferences}
              completedLessons={completedLessons}
              userProjects={userProjects}
              studyMinutes={studyMinutes}
            />
          )}

          {currentView === 'resources' && <ResourceCenterView />}

          {currentView === 'settings' && (
            <ProfileSettingsView
              preferences={preferences}
              onUpdatePreferences={handleUpdatePreferences}
              onResetProgress={handleResetProgress}
            />
          )}

          {currentView === 'admin' && (
            <AdminContentManagerView onAddCustomProject={handleAddCustomProject} />
          )}
        </main>
      </div>

      {/* Onboarding Wizard Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSave={(newPrefs) => {
          setPreferences(newPrefs);
          StorageService.savePreferences(newPrefs);
        }}
        initialPreferences={preferences}
      />

      {/* Lesson Detail Reader Modal */}
      <LessonDetailModal
        lesson={selectedLesson}
        isOpen={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        isCompleted={selectedLesson ? completedLessons.includes(selectedLesson.id) : false}
        onToggleComplete={handleToggleLessonComplete}
      />

      {/* Project Workspace Studio Modal */}
      <ProjectWorkspaceModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        userProgress={selectedProject ? userProjects[selectedProject.id] : undefined}
        onUpdateProgress={handleUpdateProjectProgress}
        onSaveToPortfolio={handleSaveToPortfolio}
      />
    </div>
  );
}
