'use client';

import type { StorefrontTheme } from '@/models/theme';
import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface StorefrontThemeContextProps {
  storefrontTheme: StorefrontTheme;
  setStorefrontTheme: (theme: StorefrontTheme) => void;
}

const storefrontThemeLocalStorageKey = 'storefrontTheme';

export const StorefrontThemeContext = createContext<StorefrontThemeContextProps | undefined>(undefined);

export const StorefrontThemeProvider = ({ children }: PropsWithChildren) => {
  const [storefrontTheme, setSelectedTheme] = useState<StorefrontTheme>('auto');

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
    if (storefrontTheme !== 'auto') {
      document.body.classList.add(storefrontTheme);
    }
    localStorage.setItem(storefrontThemeLocalStorageKey, storefrontTheme);
  };

  return (
    <StorefrontThemeContext.Provider value={{ storefrontTheme, setStorefrontTheme }}>
      {children}
    </StorefrontThemeContext.Provider>
  );
};
