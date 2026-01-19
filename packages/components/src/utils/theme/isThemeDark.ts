import type { Theme } from '@porsche-design-system/emotion';

export const isThemeDark = (theme: Theme): boolean => {
  return theme === 'dark';
};
