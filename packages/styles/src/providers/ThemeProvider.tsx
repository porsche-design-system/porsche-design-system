import type { Theme } from '@porsche-design-system/emotion';
import { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('auto');

  const schemeMap = {
    light: 'scheme-light',
    dark: 'scheme-dark',
    auto: 'scheme-light-dark',
  };

  // Sync initial theme class on mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: only for mount
  useEffect(() => {
    document.documentElement.classList.remove('scheme-light', 'scheme-dark', 'scheme-light-dark');
    document.documentElement.classList.add(schemeMap[selectedTheme]);
  }, []);

  const setTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    document.documentElement.classList.remove('scheme-light', 'scheme-dark', 'scheme-light-dark');
    document.documentElement.classList.add(schemeMap[theme]);
  };

  return <ThemeContext.Provider value={{ theme: selectedTheme, setTheme }}>{children}</ThemeContext.Provider>;
};
