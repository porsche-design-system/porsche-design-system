import { COLOR_SCHEMES, type ColorScheme } from '@porsche-design-system/shared/models';
import { createContext, type PropsWithChildren, useEffect, useState } from 'react';

interface ThemeContextProps {
  theme: ColorScheme;
  setTheme: (theme: ColorScheme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [selectedTheme, setSelectedTheme] = useState<ColorScheme>('scheme-light');

  // Sync initial theme class on mount
  useEffect(() => {
    document.documentElement.classList.remove(...COLOR_SCHEMES);
    document.documentElement.classList.add(selectedTheme);
  }, []);

  const setTheme = (theme: ColorScheme) => {
    setSelectedTheme(theme);
    document.documentElement.classList.remove(...COLOR_SCHEMES);
    document.documentElement.classList.add(theme);
  };

  return <ThemeContext.Provider value={{ theme: selectedTheme, setTheme }}>{children}</ThemeContext.Provider>;
};
