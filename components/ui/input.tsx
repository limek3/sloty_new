import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/60 border-input h-11 w-full min-w-0 rounded-[calc(var(--radius-md-token)+1px)] border bg-card/80 px-3.5 py-2.5 text-[13px] shadow-premium-sm transition-[color,box-shadow,background-color] outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-[13px] file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'hover:bg-accent-soft/70 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
