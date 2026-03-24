import { AlertTriangle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { cn } from '@/lib/utils';

type StateCardAction = {
  label: string;
  onClick: () => void;
};

type StateCardTone = 'empty' | 'error';

interface StateCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  primaryAction: StateCardAction;
  secondaryAction?: StateCardAction;
  tone?: StateCardTone;
  className?: string;
}

export function StateCard({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  tone = 'empty',
  className,
}: StateCardProps) {
  const ResolvedIcon = Icon ?? AlertTriangle;

  return (
    <Empty
      className={cn(
        'rounded-[18px] border border-border/70 bg-card px-4 py-8 shadow-[0_6px_20px_rgba(15,23,42,0.04)]',
        className,
      )}
    >
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className={cn(
            'size-12 rounded-[14px]',
            tone === 'error'
              ? 'bg-rose-50 text-rose-600'
              : 'bg-[#f5f5f2] text-slate-400',
          )}
        >
          <ResolvedIcon className="h-5 w-5" />
        </EmptyMedia>

        <EmptyTitle className="text-[14px] font-semibold text-slate-900">{title}</EmptyTitle>

        <EmptyDescription className="max-w-xs text-[13px] leading-[1.4] text-slate-500">
          {description}
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="mt-1.5 w-auto max-w-none gap-2 sm:flex-row">
        <Button
          onClick={primaryAction.onClick}
          className="h-9 rounded-[12px] bg-emerald-500 px-3 text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:bg-emerald-600"
        >
          {primaryAction.label}
        </Button>

        {secondaryAction && (
          <Button
            variant="outline"
            onClick={secondaryAction.onClick}
            className="h-9 rounded-[12px] border-border/70 px-3 text-[13px] font-semibold"
          >
            {secondaryAction.label}
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}
