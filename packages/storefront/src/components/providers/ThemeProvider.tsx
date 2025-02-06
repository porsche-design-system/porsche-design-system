'use client';

import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';
import type { StorefrontTheme } from '@/models/theme';
import React, { type PropsWithChildren, useEffect } from 'react';
import { createContext, useState } from 'react';

interface ThemeContextProps {
  theme: StorefrontTheme;
  setStorefrontTheme: (theme: StorefrontTheme) => void;
  cycleStorefrontTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const isDark = usePreferredColorScheme();

  const getInitialTheme = (): StorefrontTheme => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as StorefrontTheme) || 'auto';
    }
    return 'auto';
  };

  const [theme, setTheme] = useState<StorefrontTheme>(getInitialTheme);

  useEffect(() => {
    document.body.classList.remove('light', 'dark', 'auto');
    if (theme !== 'auto') {
      document.body.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setStorefrontTheme = (theme: StorefrontTheme) => {
    setTheme(theme);
  };

  // TODO: Unused remove?
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
