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
            'rounded-[22px] border border-black/5 bg-white p-2.5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]',
            className
          )}
        >
          <div className="flex items-start gap-2.5 px-0.5 pb-1.5 pt-0.5">
            {onBack && (
              <button
                onClick={onBack}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-black/6 bg-[#f7f7f5] text-slate-700 transition hover:bg-white"
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
                <h1 className="truncate ty-subtitle font-bold tracking-tight text-slate-900">
                  {title}
                </h1>
                {badge}
              </div>

              {subtitle && (
                <p className="mt-0.5 ty-overline leading-[1.4] text-slate-500">
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
    <div className="rounded-[12px] border border-black/6 bg-[#fafaf8] p-2 text-center">
      <div className="flex items-center justify-center gap-1">
        {icon}
        <p className="ty-subtitle font-bold tracking-tight text-slate-900">{value}</p>
      </div>
      <p className="mt-0.5 ty-overline text-slate-500">{label}</p>
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
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'h-9 w-full rounded-[14px] border border-black/6 bg-[#f7f7f5] pr-3 ty-caption text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-200 focus:bg-white',
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
        'mt-1.5 flex items-center justify-between rounded-[12px] border border-black/6 bg-[#fafaf8] px-2.5 py-1.5',
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
    <div className="mt-1.5 grid gap-1.5 rounded-[14px] border border-black/6 bg-[#fafaf8] p-1" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex items-center justify-center gap-1 rounded-[10px] px-2.5 py-2 ty-overline font-medium transition-all',
            activeTab === tab.id
              ? 'bg-white text-slate-900 shadow-[0_4px_12px_rgba(15,23,42,0.05)]'
              : 'text-slate-500'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
