import type { Theme } from '@porsche-design-system/emotion';
import { createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(() => {
    const urlTheme = searchParams.get('theme') as Theme | null;
    return urlTheme || 'auto';
  });

  // Sync initial theme class on mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: only for mount
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'auto');
    document.documentElement.classList.add(selectedTheme);
  }, []);

  const setTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    document.documentElement.classList.remove('light', 'dark', 'auto');
    document.documentElement.classList.add(theme);
    setSearchParams((params) => {
      params.set('theme', theme);
      return params;
    });
  };

  return <ThemeContext.Provider value={{ theme: selectedTheme, setTheme }}>{children}</ThemeContext.Provider>;
};
