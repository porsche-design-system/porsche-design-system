import type { Theme, ThemeExtendedElectric } from '../types';

export const isDark = (theme: ThemeExtendedElectric): boolean => {
  return theme === 'dark';
};

export const isLightElectric = (theme: ThemeExtendedElectric): boolean => {
  return theme === 'light-electric';
};

export const getThemeDarkAttribute = (theme: Theme): { theme: Extract<Theme, 'dark'> } | null => {
  return isDark(theme) ? { theme: 'dark' } : null;
};
