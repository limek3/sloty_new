'use client';

import { type ReactNode } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompactCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
}

export function CompactCard({ children, onClick, className, hover = true }: CompactCardProps) {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        'w-full rounded-[18px] border border-border/60 bg-card p-2.5 text-left shadow-elevation-card',
        hover && onClick && 'transition-all hover:-translate-y-[0.5px] hover:shadow-elevation-nav',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CompactListItemProps {
  icon?: ReactNode;
  iconTone?: 'emerald' | 'amber' | 'indigo' | 'rose' | 'blue' | 'violet' | 'slate';
  title: string;
  subtitle?: string;
  value?: string | ReactNode;
  onClick?: () => void;
  showArrow?: boolean;
  className?: string;
}

const toneClasses = {
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  rose: 'bg-rose-50 text-rose-600 border-rose-100',
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  violet: 'bg-violet-50 text-violet-600 border-violet-100',
  slate: 'bg-surface-2 text-muted-foreground border-border',
};

export function CompactListItem({
  icon,
  iconTone = 'emerald',
  title,
  subtitle,
  value,
  onClick,
  showArrow = true,
  className,
}: CompactListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex w-full items-center gap-2.5 rounded-[14px] border border-border/60 bg-card p-2.5 text-left transition hover:bg-surface-1',
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] border',
            toneClasses[iconTone]
          )}
        >
          {icon}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-medium text-foreground">{title}</p>
        {subtitle && <p className="mt-0.5 truncate text-[8px] text-muted-foreground">{subtitle}</p>}
      </div>

      {value && (
        <div className="shrink-0 text-[10px] font-medium text-muted-foreground">{value}</div>
      )}

      {showArrow && onClick && (
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:text-emerald-600" />
      )}
    </button>
  );
}

interface QuickActionCardProps {
  icon: ReactNode;
  iconTone?: 'emerald' | 'amber' | 'indigo' | 'rose' | 'blue' | 'violet' | 'slate';
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function QuickActionCard({
  icon,
  iconTone = 'emerald',
  title,
  description,
  onClick,
  className,
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group w-full overflow-hidden rounded-[16px] border border-border/60 bg-card p-2.5 text-left shadow-elevation-card transition hover:-translate-y-[0.5px] hover:shadow-elevation-nav',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] border',
            toneClasses[iconTone]
          )}
        >
          {icon}
        </div>

        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted-foreground transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>

      <div className="mt-2">
        <p className="text-[10px] font-semibold text-foreground transition group-hover:text-emerald-600">
          {title}
        </p>
        <p className="mt-0.5 text-[8px] leading-[1.4] text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}

interface SectionHeaderProps {
  title: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function SectionHeader({ title, icon, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-2 flex items-center justify-between', className)}>
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-emerald-600">{icon}</span>}
        <h2 className="text-[11px] font-semibold tracking-tight text-foreground">{title}</h2>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center gap-0.5 rounded-full border border-border/60 bg-card px-2 py-0.5 text-[8px] font-medium text-foreground transition hover:state-hover"
        >
          {action.label}
          <ChevronRight className="h-2.5 w-2.5" />
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-[18px] border border-border/60 bg-card px-4 py-10 text-center shadow-elevation-card">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-surface-2">
        {icon}
      </div>

      <h3 className="mt-3 text-[12px] font-semibold text-foreground">{title}</h3>

      <p className="mx-auto mt-1.5 max-w-xs text-[9px] leading-[1.4] text-muted-foreground">
        {description}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-3 rounded-[12px] bg-emerald-500 px-4 py-2 text-[9px] font-semibold text-white shadow-primary-glow transition hover:bg-emerald-600"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
