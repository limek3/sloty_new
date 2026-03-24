import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function MobileAppShell({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('app-shell', className)}>{children}</div>;
}

export function MobileContent({ className, children }: { className?: string; children: ReactNode }) {
  return <main className={cn('app-content', className)}>{children}</main>;
}

export function MobileSectionStack({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('stack-section', className)}>{children}</div>;
}

export function MobileCardStack({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('stack-card', className)}>{children}</div>;
}
