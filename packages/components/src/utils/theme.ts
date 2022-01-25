import type { Theme } from '@porsche-design-system/utilities-v2';

export const isThemeDark = (theme: Theme): boolean => {
  return theme === 'dark';
};

export const isThemeLightElectric = (theme: Theme): boolean => {
  return theme === 'light-electric';
};

export const isThemeDarkElectric = (theme: Theme): boolean => {
  return theme === 'dark-electric';
};

export const getThemeDarkAttribute = (theme: Theme): { theme: Extract<Theme, 'dark'> } | null => {
  return isThemeDark(theme) ? { theme: 'dark' } : null;
};
