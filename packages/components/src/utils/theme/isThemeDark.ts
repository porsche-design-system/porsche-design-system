import type { Theme } from '@porsche-design-system/utilities-v2';

export const isThemeDark = (theme: Theme): boolean => {
  return theme === 'dark';
};
