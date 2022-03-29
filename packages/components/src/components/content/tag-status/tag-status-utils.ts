import { Theme } from '../../../types';
import { isThemeDark } from '../../../utils';

export type TagColors =
  | 'background-default'
  | 'background-surface'
  | 'contrast-high'
  | 'notification-neutral-soft'
  | 'notification-success-soft'
  | 'notification-error-soft'
  | 'notification-warning-soft';

export const getTheme = (theme: Theme, color: TagColors) => {
  const isDarkTheme = isThemeDark(theme);
  const isContrastHigh = color === 'contrast-high';

  return !isContrastHigh ? theme : isDarkTheme ? 'light' : 'dark';
};
