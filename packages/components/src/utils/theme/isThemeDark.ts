import type { Theme } from '@porsche-design-system/styles';

export const isThemeDark = (theme: Theme): boolean => {
  return theme === 'dark';
};
