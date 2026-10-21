'use client';

import { COLOR_SCHEMES, type ColorScheme, isColorScheme } from '@porsche-design-system/shared';
import React, { createContext, type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';

interface StorefrontColorSchemeContextProps {
  storefrontColorScheme: ColorScheme;
  setStorefrontColorScheme: (colorScheme: ColorScheme) => void;
  isDark: boolean; // if storefrontColorScheme is set to dark or auto and the user prefers dark mode
}

const storefrontColorSchemeLocalStorageKey = 'storefrontColorScheme';

export const StorefrontColorSchemeContext = createContext<StorefrontColorSchemeContextProps | undefined>(undefined);

export const StorefrontColorSchemeProvider = ({ children }: PropsWithChildren) => {
  const [storefrontColorScheme, setStorefrontColorScheme] = useState<ColorScheme>('scheme-light-dark');
  const prefersDark = usePreferredColorScheme();

  // Load initial state from localStorage once component mounts
  useEffect(() => {
    const storedColorScheme = localStorage.getItem(storefrontColorSchemeLocalStorageKey);
    if (isColorScheme(storedColorScheme)) {
      setSelectedColorScheme(storedColorScheme);
    }
  }, []);

  const setSelectedColorScheme = (storefrontColorScheme: ColorScheme) => {
    if (!isColorScheme(storefrontColorScheme)) {
      return;
    }
    setStorefrontColorScheme(storefrontColorScheme);
    document.documentElement.classList.remove(...COLOR_SCHEMES);
    document.documentElement.classList.add(storefrontColorScheme);
    localStorage.setItem(storefrontColorSchemeLocalStorageKey, storefrontColorScheme);
  };

  const isDark = useMemo(() => {
    return storefrontColorScheme === 'scheme-dark' || (storefrontColorScheme === 'scheme-light-dark' && prefersDark);
  }, [storefrontColorScheme, prefersDark]);

  return (
    <StorefrontColorSchemeContext.Provider
      value={{ storefrontColorScheme, setStorefrontColorScheme: setSelectedColorScheme, isDark }}
    >
      {children}
    </StorefrontColorSchemeContext.Provider>
  );
};
