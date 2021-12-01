import type { Theme } from '../types';

export const isDark = (theme: Theme): boolean => {
  return theme === 'dark';
};

export const isLightElectric = (theme: Theme): boolean => {
  return theme === 'light-electric';
};

export const getThemeDarkAttribute = (theme: Theme): { theme: Theme } => {
  return isDark(theme) ? { theme: 'dark' } : null;
};
