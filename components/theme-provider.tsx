'use client'

import * as React from 'react'

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
}

// Light-only premium theme - dark mode removed for design consistency
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>
}
