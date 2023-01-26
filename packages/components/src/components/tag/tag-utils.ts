import { TAG_DISMISSIBLE_COLORS } from '../tag-dismissible/tag-dismissible-utils';
import type { Theme } from '../../types';
import { isThemeDark } from '../../utils/theme/isThemeDark';
import type { ThemedColors } from '../../styles'; // deep import needed since barrel contains MutationObserver and causes VRT to fail because of TAG_COLORS import

export const TAG_COLORS = [
  ...TAG_DISMISSIBLE_COLORS,
  'neutral-contrast-high',
  'notification-neutral', // 'notification-neutral' is deprecated (replaced with 'notification-information')
  'notification-information',
  'notification-warning',
  'notification-success',
  'notification-error',
] as const;
export type TagColor = typeof TAG_COLORS[number];

export const hasInvertedThemeColor = (tagColor: TagColor, theme: Theme): boolean => {
  const isDark = isThemeDark(theme);
  return (
    (!isDark && tagColor === 'neutral-contrast-high') ||
    (isDark &&
      tagColor !== 'background-surface' &&
      tagColor !== 'background-default' &&
      tagColor !== 'notification-neutral' && // 'notification-neutral' is deprecated (replaced with 'notification-information')
      tagColor !== 'notification-information' &&
      tagColor !== 'notification-warning' &&
      tagColor !== 'notification-success' &&
      tagColor !== 'notification-error')
  );
};

export const getThemedBackgroundHoverColor = (tagColor: TagColor, themedColors: ThemedColors, theme: Theme): string => {
  const isDark = isThemeDark(theme);
  const colorMap: { [key in TagColor]: string } = {
    'background-default': isDark ? themedColors.backgroundColorLighten : themedColors.backgroundColorDarken,
    'background-surface': isDark
      ? themedColors.backgroundSurfaceColorLighten
      : themedColors.backgroundSurfaceColorDarken,
    'neutral-contrast-high': isDark ? themedColors.contrastHighColorLighten : themedColors.contrastHighColor,
    'notification-neutral': isDark ? themedColors.infoSoftColorLighten : themedColors.infoSoftColorDarken, // 'notification-neutral' is deprecated (replaced with 'notification-information')
    'notification-information': isDark ? themedColors.infoSoftColorLighten : themedColors.infoSoftColorDarken,
    'notification-success': isDark ? themedColors.successSoftColorLighten : themedColors.successSoftColorDarken,
    'notification-error': isDark ? themedColors.errorSoftColorLighten : themedColors.errorSoftColorDarken,
    'notification-warning': isDark ? themedColors.warningSoftColorLighten : themedColors.warningSoftColorDarken,
  };

  return colorMap[tagColor];
};
