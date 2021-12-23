import type { Theme, ThemeExtendedElectricDark } from '../types';

export const isDark = (theme: ThemeExtendedElectricDark): boolean => {
  return theme === 'dark';
};

export const isLightElectric = (theme: ThemeExtendedElectricDark): boolean => {
  return theme === 'light-electric';
};

export const isDarkElectric = (theme: ThemeExtendedElectricDark): boolean => {
  return theme === 'dark-electric';
};

export const getThemeDarkAttribute = (theme: Theme): { theme: Extract<Theme, 'dark'> } | null => {
  return isDark(theme) ? { theme: 'dark' } : null;
};
