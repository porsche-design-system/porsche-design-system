import { createContext, type PropsWithChildren, useEffect, useState } from 'react';

// TODO: Use imported when available
export type LightDarkTheme = 'light' | 'dark' | 'light-dark';

interface ThemeContextProps {
  theme: LightDarkTheme;
  setTheme: (theme: LightDarkTheme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [selectedTheme, setSelectedTheme] = useState<LightDarkTheme>('light');

  const schemeMap: Record<LightDarkTheme, string> = {
    light: 'scheme-light',
    dark: 'scheme-dark',
    'light-dark': 'scheme-light-dark',
  };

  // Sync initial theme class on mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: only for mount
  useEffect(() => {
    document.documentElement.classList.remove('scheme-light', 'scheme-dark', 'scheme-light-dark');
    document.documentElement.classList.add(schemeMap[selectedTheme]);
  }, []);

  const setTheme = (theme: LightDarkTheme) => {
    setSelectedTheme(theme);
    document.documentElement.classList.remove('scheme-light', 'scheme-dark', 'scheme-light-dark');
    document.documentElement.classList.add(schemeMap[theme]);
  };

  return <ThemeContext.Provider value={{ theme: selectedTheme, setTheme }}>{children}</ThemeContext.Provider>;
};
