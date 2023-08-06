'use client';

import { ThemeProvider } from './theme-provider';
import NineballProvider from './nineball-provider';
import { BuildProvider } from './build-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BuildProvider>
      <NineballProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </NineballProvider>
    </BuildProvider>
  );
}
