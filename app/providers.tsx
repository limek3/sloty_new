'use client';

import { AppProvider } from '@/lib/app-context';
import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
}
