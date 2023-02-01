import type { Theme } from '../../types';
import type { ThemedColors } from '../../styles'; // deep import needed since barrel contains MutationObserver and causes VRT to fail because of TAG_COLORS import
import { TAG_DISMISSIBLE_COLORS } from '../tag-dismissible/tag-dismissible-utils';
import { isThemeDark } from '../../utils/theme/isThemeDark';

export const getThemeForIcon = (color: TagColor, theme: Theme): Theme => {
  return ['neutral-contrast-high', 'primary'].includes(color) ? (theme === 'light' ? 'dark' : 'light') : theme;
};

export const TAG_COLORS = [
  ...TAG_DISMISSIBLE_COLORS,
  'neutral-contrast-high', // 'notification-contrast-high' is deprecated (replaced with 'primary')
  'primary',
  'notification-neutral', // 'notification-neutral' is deprecated (replaced with 'notification-info')
  'notification-info',
  'notification-warning',
  'notification-success',
  'notification-error',
] as const;
export type TagColor = typeof TAG_COLORS[number];

export const hasInvertedThemeColor = (tagColor: TagColor, theme: Theme): boolean => {
  const isDark = isThemeDark(theme);
  return (
    (!isDark && (tagColor === 'neutral-contrast-high' || tagColor === 'primary')) || // 'neutral-contrast-high' is deprecated (replaced with 'primary')
    (isDark &&
      tagColor !== 'background-surface' &&
      tagColor !== 'background-default' && // 'background-default' is deprecated (replaced with 'background-base')
      tagColor !== 'background-base' &&
      tagColor !== 'notification-neutral' && // 'notification-neutral' is deprecated (replaced with 'notification-info')
      tagColor !== 'notification-info' &&
      tagColor !== 'notification-warning' &&
      tagColor !== 'notification-success' &&
      tagColor !== 'notification-error')
  );
};

export const getThemedBackgroundHoverColor = (tagColor: TagColor, themedColors: ThemedColors, theme: Theme): string => {
  const isDark = isThemeDark(theme);
  const keySuffix = isDark ? 'ColorLighten' : 'ColorDarken';
  const primaryColor = isDark ? themedColors.contrastHighColorLighten : themedColors.contrastHighColor;
  const colorMap: { [key in TagColor]: string } = {
    'background-default': themedColors[`background${keySuffix}`], // 'background-default' is deprecated (replaced with 'background-base')
    'background-base': themedColors[`background${keySuffix}`],
    'background-surface': themedColors[`backgroundSurface${keySuffix}`],
    'neutral-contrast-high': primaryColor, // 'neutral-contrast-high' is deprecated (replaced with 'primary')
    primary: primaryColor,
    'notification-neutral': themedColors[`infoSoft${keySuffix}`], // 'notification-neutral' is deprecated (replaced with 'notification-info')
    'notification-info': themedColors[`infoSoft${keySuffix}`],
    'notification-success': themedColors[`successSoft${keySuffix}`],
    'notification-error': themedColors[`errorSoft${keySuffix}`],
    'notification-warning': themedColors[`warningSoft${keySuffix}`],
  };

  return colorMap[tagColor];
};
