import { TAG_DISMISSIBLE_COLORS } from '../tag-dismissible/tag-dismissible-utils';
import type { Theme } from '../../../types';
import { isThemeDark } from '../../../utils';

export const TAG_COLORS = [
  ...TAG_DISMISSIBLE_COLORS,
  'neutral-contrast-high',
  'notification-neutral',
  'notification-warning',
  'notification-success',
  'notification-error',
] as const;
export type TagColor = typeof TAG_COLORS[number];

export const hasInvertedThemeColor = (tagColor: TagColor, theme: Theme): boolean => {
  const isDark = isThemeDark(theme);
  return (
    (!isDark && tagColor === 'neutral-contrast-high') ||
    (isDark && tagColor !== 'background-surface' && tagColor !== 'background-default')
  );
};
