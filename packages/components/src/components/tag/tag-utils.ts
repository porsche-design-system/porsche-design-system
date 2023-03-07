import type { Theme } from '../../types';
import type { ThemedColors } from '../../styles'; // deep import needed since barrel contains MutationObserver and causes VRT to fail because of TAG_COLORS import
import { TAG_DISMISSIBLE_COLORS, TagDismissibleColorDeprecated } from '../tag-dismissible/tag-dismissible-utils';
import { isThemeDark } from '../../utils';

export const getThemeForIcon = (color: TagColor, theme: Theme): Theme => {
  return color === 'neutral-contrast-high' || color === 'primary' ? (isThemeDark(theme) ? 'light' : 'dark') : theme;
};

/** @deprecated */
export const TAG_COLORS_DEPRECATED = [
  'neutral-contrast-high', // 'notification-contrast-high' is deprecated (replaced with 'primary')
  'notification-neutral', // 'notification-neutral' is deprecated (replaced with 'notification-info')
] as const;
/** @deprecated */
export type TagColorDeprecated = typeof TAG_COLORS_DEPRECATED[number] | TagDismissibleColorDeprecated;
export const TAG_COLORS = [
  ...TAG_DISMISSIBLE_COLORS,
  'primary',
  'notification-info',
  'notification-warning',
  'notification-success',
  'notification-error',
  ...TAG_COLORS_DEPRECATED,
] as const;
export type TagColor = typeof TAG_COLORS[number];

export const hasInvertedThemeColor = (color: TagColor, theme: Theme): boolean => {
  return color === 'neutral-contrast-high' ? true : color === 'primary' ? isThemeDark(theme) : false;
};

export const getThemedBackgroundHoverColor = (tagColor: TagColor, themedColors: ThemedColors, theme: Theme): string => {
  const isDark = isThemeDark(theme);
  const keySuffix = isDark ? 'ColorLighten' : 'ColorDarken';
  const primaryColor = isDark ? themedColors.contrastHighColorLighten : themedColors.contrastHighColor;
  const colorMap: Record<TagColor, string> = {
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
