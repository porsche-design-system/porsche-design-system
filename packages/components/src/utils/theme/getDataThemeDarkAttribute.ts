import { isThemeDark } from './isThemeDark';
import type { Theme } from './theme';

export const getDataThemeDarkAttribute = (theme: Theme): { 'data-theme': Extract<Theme, 'dark'> } | null => {
  return isThemeDark(theme) ? { 'data-theme': 'dark' } : null;
};
