import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[calc(var(--radius-md-token)+1px)] text-[13px] font-semibold tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-45 active:scale-[0.985] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[18px] shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-primary-glow hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_8px_22px_oklch(0.62_0.17_155_/0.24)]',
        destructive:
          'bg-destructive text-white shadow-premium-sm hover:-translate-y-px hover:bg-destructive/90',
        outline:
          'border border-border/80 bg-card shadow-premium-sm hover:-translate-y-px hover:bg-accent-soft hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-accent-soft',
        secondary:
          'bg-secondary text-secondary-foreground shadow-premium-sm hover:-translate-y-px hover:bg-secondary/85',
        ghost:
          'hover:bg-accent-soft hover:text-foreground dark:hover:bg-accent-soft',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-4.5 py-2.5 has-[>svg]:px-4',
        sm: 'h-[38px] rounded-[var(--radius-sm-token)] gap-1.5 px-3.5 has-[>svg]:px-3',
        lg: 'h-12 rounded-[var(--radius-lg-token)] px-6.5 has-[>svg]:px-5',
        icon: 'size-10',
        'icon-sm': 'size-9',
        'icon-lg': 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
