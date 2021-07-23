import type { Theme } from '../types';

export const isDark = (theme: Theme): boolean => {
  return theme === 'dark';
};

export const reflectThemeOnDark = (theme: Theme): { theme: Theme } => {
  return isDark(theme) && { theme: 'dark' };
};
