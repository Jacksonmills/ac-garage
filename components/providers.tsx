'use client';

import { ThemeProvider } from './theme-provider';
import NineballProvider from './nineball-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NineballProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NineballProvider>
  );
}
