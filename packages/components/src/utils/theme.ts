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

export const getDataThemeDarkAttribute = (theme: Theme): { 'data-theme': Extract<Theme, 'dark'> } | null => {
  return isThemeDark(theme) ? { 'data-theme': 'dark' } : null;
};
