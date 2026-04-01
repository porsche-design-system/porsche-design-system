'use client';

import React, { createContext, type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';
import { STOREFRONT_COLOR_SCHEME_TYPES, type StorefrontColorScheme } from '@/models/colorScheme';

interface StorefrontColorSchemeContextProps {
  storefrontColorScheme: StorefrontColorScheme;
  setStorefrontColorScheme: (colorScheme: StorefrontColorScheme) => void;
  isDark: boolean; // if storefrontColorScheme is set to dark or auto and the user prefers dark mode
}

const storefrontColorSchemeLocalStorageKey = 'storefrontColorScheme';

export const StorefrontColorSchemeContext = createContext<StorefrontColorSchemeContextProps | undefined>(undefined);

export const StorefrontColorSchemeProvider = ({ children }: PropsWithChildren) => {
  const [storefrontColorScheme, setStorefrontColorScheme] = useState<StorefrontColorScheme>('scheme-light-dark');
  const prefersDark = usePreferredColorScheme();

  // Load initial state from localStorage once component mounts
  // biome-ignore lint/correctness/useExhaustiveDependencies: only used for mount
  useEffect(() => {
    const storedColorScheme = localStorage.getItem(
      storefrontColorSchemeLocalStorageKey
    ) as StorefrontColorScheme | null;
    if (storedColorScheme && STOREFRONT_COLOR_SCHEME_TYPES.includes(storedColorScheme)) {
      setSelectedColorScheme(storedColorScheme);
    }
  }, []);

  const setSelectedColorScheme = (storefrontColorScheme: StorefrontColorScheme) => {
    if (!STOREFRONT_COLOR_SCHEME_TYPES.includes(storefrontColorScheme)) {
      return;
    }
    setStorefrontColorScheme(storefrontColorScheme);
    document.documentElement.classList.remove('scheme-light', 'scheme-dark', 'scheme-light-dark');
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
