import { TAG_DISMISSIBLE_COLORS } from '../tag-dismissible/tag-dismissible-utils';
import type { Theme } from '../../../../types';
import { isThemeDark } from '../../../../utils';

export const TAG_STATUS_COLORS = [
  ...TAG_DISMISSIBLE_COLORS,
  'neutral-contrast-high',
  'notification-success',
  'notification-warning',
  'notification-error',
  'notification-neutral',
] as const;

export type TagStatusColor = typeof TAG_STATUS_COLORS[number];

export const hasInvertedThemeColor = (tagStatusColor: TagStatusColor, theme: Theme): boolean => {
  const isDark = isThemeDark(theme);
  return (
    (!isDark && tagStatusColor === 'neutral-contrast-high') ||
    (isDark && tagStatusColor !== 'background-surface' && tagStatusColor !== 'background-default')
  );
};
