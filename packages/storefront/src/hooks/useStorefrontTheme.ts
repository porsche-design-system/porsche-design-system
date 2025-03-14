import { StorefrontThemeContext } from '@/components/providers/StorefrontThemeProvider';
import { useContext } from 'react';

export const useStorefrontTheme = () => {
  const context = useContext(StorefrontThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
