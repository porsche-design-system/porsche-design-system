'use client';

import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';
import type { StorefrontTheme } from '@/models/theme';
import React, { createContext, type PropsWithChildren, useEffect, useMemo, useState } from 'react';

interface StorefrontThemeContextProps {
  storefrontTheme: StorefrontTheme;
  setStorefrontTheme: (theme: StorefrontTheme) => void;
  isDark: boolean; // if storefrontTheme is set to dark or auto and the user prefers dark mode
}

const storefrontThemeLocalStorageKey = 'storefrontTheme';

export const StorefrontThemeContext = createContext<StorefrontThemeContextProps | undefined>(undefined);

export const StorefrontThemeProvider = ({ children }: PropsWithChildren) => {
  const [storefrontTheme, setSelectedTheme] = useState<StorefrontTheme>('auto');
  const prefersDark = usePreferredColorScheme();

  // Load initial state from localStorage once component mounts
  useEffect(() => {
    const storedTheme = localStorage.getItem(storefrontThemeLocalStorageKey) as StorefrontTheme | null;
    if (storedTheme) {
      setStorefrontTheme(storedTheme);
    }
  }, []);

  const setStorefrontTheme = (storefrontTheme: StorefrontTheme) => {
    setSelectedTheme(storefrontTheme);
    document.body.classList.remove('light', 'dark', 'auto');
    document.body.classList.add(storefrontTheme);
    localStorage.setItem(storefrontThemeLocalStorageKey, storefrontTheme);
  };

  const isDark = useMemo(() => {
    return storefrontTheme === 'dark' || (storefrontTheme === 'auto' && prefersDark);
  }, [storefrontTheme, prefersDark]);

  return (
    <StorefrontThemeContext.Provider value={{ storefrontTheme, setStorefrontTheme, isDark }}>
      {children}
    </StorefrontThemeContext.Provider>
  );
};
