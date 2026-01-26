import type { Theme } from '@porsche-design-system/emotion';
import { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const themeLocalStorageKey = 'theme';

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('auto');

  // Load initial state from localStorage once component mounts
  // biome-ignore lint/correctness/useExhaustiveDependencies: only used for mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(themeLocalStorageKey) as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const setTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    document.documentElement.classList.remove('light', 'dark', 'auto');
    document.documentElement.classList.add(theme);
    localStorage.setItem(themeLocalStorageKey, theme);
  };

  return <ThemeContext.Provider value={{ theme: selectedTheme, setTheme }}>{children}</ThemeContext.Provider>;
};
