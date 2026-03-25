import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-[calc(var(--radius-sm-token)+1px)] bg-[color:color-mix(in_oklab,var(--muted)_70%,var(--card))]', className)}
      {...props}
    />
  )
}

export { Skeleton }
