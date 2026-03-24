'use client';

import { type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScreenHeroProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  onBack?: () => void;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function ScreenHero({
  title,
  subtitle,
  icon,
  badge,
  onBack,
  actions,
  children,
  className,
}: ScreenHeroProps) {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="mx-auto max-w-2xl">
        <div
          className={cn(
            'rounded-[22px] border border-border/60 bg-card p-2.5 shadow-elevation-nav',
            className
          )}
        >
          <div className="flex items-start gap-2.5 px-0.5 pb-1.5 pt-0.5">
            {onBack && (
              <button
                onClick={onBack}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-border/60 bg-surface-2 text-foreground transition hover:state-hover"
                aria-label="Back"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
            )}

            {icon && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-emerald-100 bg-emerald-50 text-emerald-600">
                {icon}
              </div>
            )}

            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex items-center gap-1.5">
                <h1 className="truncate text-[13px] font-bold tracking-tight text-foreground">
                  {title}
                </h1>
                {badge}
              </div>

              {subtitle && (
                <p className="mt-0.5 text-[9px] leading-[1.4] text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>

            {actions && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
          </div>

          {children}
        </div>
      </div>
    </header>
  );
}

interface HeroStatProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
}

export function HeroStat({ value, label, icon }: HeroStatProps) {
  return (
    <div className="rounded-[12px] border border-border/60 bg-surface-1 p-2 text-center">
      <div className="flex items-center justify-center gap-1">
        {icon}
        <p className="text-[13px] font-bold tracking-tight text-foreground">{value}</p>
      </div>
      <p className="mt-0.5 text-[8px] text-muted-foreground">{label}</p>
    </div>
  );
}

interface HeroSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: ReactNode;
}

export function HeroSearch({ value, onChange, placeholder, icon }: HeroSearchProps) {
  return (
    <div className="relative mt-1.5">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'h-9 w-full rounded-[14px] border border-border/60 bg-surface-2 pr-3 text-[10px] text-foreground outline-none transition placeholder:text-muted-foreground focus:border-emerald-200 focus:bg-surface-1',
          icon ? 'pl-9' : 'pl-3'
        )}
      />
    </div>
  );
}

interface HeroInfoBarProps {
  children: ReactNode;
  className?: string;
}

export function HeroInfoBar({ children, className }: HeroInfoBarProps) {
  return (
    <div
      className={cn(
        'mt-1.5 flex items-center justify-between rounded-[12px] border border-border/60 bg-surface-1 px-2.5 py-1.5',
        className
      )}
    >
      {children}
    </div>
  );
}

interface HeroTabsProps {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function HeroTabs({ tabs, activeTab, onTabChange }: HeroTabsProps) {
  return (
    <div className="mt-1.5 grid gap-1.5 rounded-[14px] border border-border/60 bg-surface-1 p-1" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex items-center justify-center gap-1 rounded-[10px] px-2.5 py-2 text-[9px] font-medium transition-all',
            activeTab === tab.id
              ? 'bg-card text-foreground shadow-premium-sm'
              : 'text-muted-foreground'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
