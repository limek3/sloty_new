'use client';

import { useEffect } from 'react';
import { useApp } from '@/lib/app-context';

export function SplashScreen() {
  const { navigate, theme } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('role-selection');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
          style={{ 
            background: theme === 'dark' 
              ? 'radial-gradient(circle, oklch(0.70 0.15 175) 0%, transparent 70%)'
              : 'radial-gradient(circle, oklch(0.65 0.15 175 / 0.4) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-15 blur-3xl"
          style={{ 
            background: theme === 'dark'
              ? 'radial-gradient(circle, oklch(0.60 0.12 200) 0%, transparent 70%)'
              : 'radial-gradient(circle, oklch(0.60 0.12 200 / 0.3) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Logo and Brand */}
      <div className="relative z-10 flex flex-col items-center animate-scale-in">
        {/* Logo Icon */}
        <div className="relative mb-5">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <svg 
              viewBox="0 0 48 48" 
              className="w-12 h-12 text-primary-foreground"
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
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-2xl bg-primary/30 animate-ping" style={{ animationDuration: '1.5s' }} />
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-1.5">
          Sloty
        </h1>
        
        {/* Tagline */}
        <p className="text-sm text-muted-foreground font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Premium Service Marketplace
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-16 flex items-center gap-1.5 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
