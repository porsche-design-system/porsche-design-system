'use client';

import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';
import type { StorefrontTheme } from '@/models/theme';
import React, { type PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

interface ThemeContextProps {
  theme: StorefrontTheme;
  setStorefrontTheme: (theme: StorefrontTheme) => void;
  cycleStorefrontTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<StorefrontTheme>('auto');
  const isDark = usePreferredColorScheme();

  const setStorefrontTheme = (theme: StorefrontTheme) => {
    setTheme(theme);
    document.body.classList.remove('light', 'dark', 'auto');
    if (theme !== 'auto') {
      document.body.classList.add(theme);
    }
  };

  const cycleStorefrontTheme = () => {
    const nextTheme: Record<StorefrontTheme, StorefrontTheme> = {
      auto: isDark ? 'light' : 'dark',
      light: isDark ? 'auto' : 'dark',
      dark: isDark ? 'light' : 'auto',
    };
    setStorefrontTheme(nextTheme[theme]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setStorefrontTheme, cycleStorefrontTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
