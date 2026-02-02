'use client';

import React, { createContext, type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';
import type { StorefrontColorScheme } from '@/models/theme';

interface StorefrontThemeContextProps {
  storefrontTheme: StorefrontColorScheme;
  setStorefrontTheme: (theme: StorefrontColorScheme) => void;
  isDark: boolean; // if storefrontTheme is set to dark or auto and the user prefers dark mode
}

const storefrontThemeLocalStorageKey = 'storefrontTheme';

export const StorefrontThemeContext = createContext<StorefrontThemeContextProps | undefined>(undefined);

export const StorefrontThemeProvider = ({ children }: PropsWithChildren) => {
  const [storefrontTheme, setSelectedTheme] = useState<StorefrontColorScheme>('scheme-light-dark');
  const prefersDark = usePreferredColorScheme();

  // Load initial state from localStorage once component mounts
  // biome-ignore lint/correctness/useExhaustiveDependencies: only used for mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(storefrontThemeLocalStorageKey) as StorefrontColorScheme | null;
    if (storedTheme) {
      setStorefrontTheme(storedTheme);
    }
  }, []);

  const setStorefrontTheme = (storefrontTheme: StorefrontColorScheme) => {
    setSelectedTheme(storefrontTheme);
    document.documentElement.classList.remove('scheme-light', 'scheme-dark', 'scheme-light-dark');
    document.documentElement.classList.add(storefrontTheme);
    localStorage.setItem(storefrontThemeLocalStorageKey, storefrontTheme);
  };

  const isDark = useMemo(() => {
    return storefrontTheme === 'scheme-dark' || (storefrontTheme === 'scheme-light-dark' && prefersDark);
  }, [storefrontTheme, prefersDark]);

  return (
    <StorefrontThemeContext.Provider value={{ storefrontTheme, setStorefrontTheme, isDark }}>
      {children}
    </StorefrontThemeContext.Provider>
  );
};
