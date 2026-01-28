import type { Theme } from '@porsche-design-system/emotion';
import { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('auto');

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
  };

  return <ThemeContext.Provider value={{ theme: selectedTheme, setTheme }}>{children}</ThemeContext.Provider>;
};
