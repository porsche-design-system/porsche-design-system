import type { Theme } from '../types';

export const isDark = (theme: Theme): boolean => {
  return theme === 'dark';
};
