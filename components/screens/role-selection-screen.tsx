'use client';

import { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { User, Briefcase, Sun, Moon, Globe } from 'lucide-react';
import type { UserRole } from '@/lib/types';

export function RoleSelectionScreen() {
  const { t, navigate, setUserRole, language, setLanguage, theme, setTheme } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      setUserRole(selectedRole);
      navigate(selectedRole === 'client' ? 'home' : 'master-dashboard');
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background safe-top safe-bottom">
      {/* Header with settings */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {language === 'ru' ? 'RU' : 'EN'}
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
        >
          {theme === 'light' ? (
            <Sun className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Moon className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium text-foreground">
            {theme === 'light' ? t('lightMode') : t('darkMode')}
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-6">
        {/* Logo */}
        <div className="mb-6 animate-scale-in">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
            <svg 
              viewBox="0 0 48 48" 
              className="w-8 h-8 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="24" cy="24" r="18" />
              <path d="M24 14v10l6 6" />
              <circle cx="24" cy="24" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-2 text-center animate-slide-up">
          {t('selectRole')}
        </h1>
        <p className="text-base text-muted-foreground text-center mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {t('tagline')}
        </p>

        {/* Role Cards */}
        <div className="w-full max-w-sm space-y-2.5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {/* Client Card */}
          <button
            onClick={() => setSelectedRole('client')}
            className={`w-full p-3.5 rounded-xl border-2 transition-all duration-200 text-left group ${
              selectedRole === 'client'
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                : 'border-border bg-card hover:border-primary/50 hover:bg-secondary/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                selectedRole === 'client' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
              }`}>
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-0.5">
                  {t('iAmClient')}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('clientDescription')}
                </p>
              </div>
              {/* Selection indicator */}
              <div className={`h-5 w-5 shrink-0 self-center rounded-full border-2 transition-all grid place-items-center ${
                selectedRole === 'client'
                  ? 'border-primary bg-primary'
                  : 'border-border'
              }`}>
                {selectedRole === 'client' && (
                  <svg className="block h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </button>

          {/* Master Card */}
          <button
            onClick={() => setSelectedRole('master')}
            className={`w-full p-3.5 rounded-xl border-2 transition-all duration-200 text-left group ${
              selectedRole === 'master'
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                : 'border-border bg-card hover:border-primary/50 hover:bg-secondary/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                selectedRole === 'master' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
              }`}>
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-0.5">
                  {t('iAmMaster')}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('masterDescription')}
                </p>
              </div>
              {/* Selection indicator */}
              <div className={`h-5 w-5 shrink-0 self-center rounded-full border-2 transition-all grid place-items-center ${
                selectedRole === 'master'
                  ? 'border-primary bg-primary'
                  : 'border-border'
              }`}>
                {selectedRole === 'master' && (
                  <svg className="block h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4 pb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className="w-full h-12 text-base font-semibold rounded-xl disabled:opacity-50"
          size="lg"
        >
          {t('continue')}
        </Button>
      </div>
    </div>
  );
}
