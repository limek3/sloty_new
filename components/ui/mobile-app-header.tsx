import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileAppHeaderProps {
  title?: ReactNode;
  description?: ReactNode;
  leading?: ReactNode;
  actions?: ReactNode;
  searchSlot?: ReactNode;
  children?: ReactNode;
  className?: string;
  shellClassName?: string;
}

export function MobileAppHeader({
  title,
  description,
  leading,
  actions,
  searchSlot,
  children,
  className,
  shellClassName,
}: MobileAppHeaderProps) {
  return (
    <header className={cn('sticky top-0 z-40 app-content pt-2.5', className)}>
      <div className={cn('app-header-shell', shellClassName)}>
        {(title || description || leading || actions) && (
          <div className="flex items-start justify-between gap-2.5 px-0.5 pb-2 pt-0.5">
            <div className="flex min-w-0 items-start gap-2.5">
              {leading}
              <div className="min-w-0">
                {title && <h1 className="truncate text-[16px] font-bold tracking-tight text-slate-900">{title}</h1>}
                {description && (
                  <p className="mt-0.5 text-[14px] leading-[1.4] text-slate-500">{description}</p>
                )}
              </div>
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        )}

        {searchSlot}
        {children}
      </div>
    </header>
  );
}
