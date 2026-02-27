'use client';

import { useContext } from 'react';
import { StorefrontColorSchemeContext } from '@/components/providers/StorefrontColorSchemeProvider';

export const useStorefrontColorScheme = () => {
  const context = useContext(StorefrontColorSchemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
