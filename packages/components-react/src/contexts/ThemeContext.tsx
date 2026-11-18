import type { ColorScheme } from '@porsche-design-system/shared';
import { createContext, type JSX, type ReactNode, useContext, useState } from 'react';

interface ThemeContextValue {
  theme: ColorScheme;
  setTheme: (theme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<ColorScheme>('scheme-light-dark');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
