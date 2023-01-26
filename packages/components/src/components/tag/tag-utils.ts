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
  const keySuffix = isDark ? 'ColorLighten' : 'ColorDarken';
  const colorMap: { [key in TagColor]: string } = {
    'background-default': themedColors[`background${keySuffix}`],
    'background-surface': themedColors[`backgroundSurface${keySuffix}`],
    'neutral-contrast-high': isDark ? themedColors.contrastHighColorLighten : themedColors.contrastHighColor,
    'notification-neutral': themedColors[`infoSoft${keySuffix}`],
    'notification-information': themedColors[`infoSoft${keySuffix}`],
    'notification-success': themedColors[`successSoft${keySuffix}`],
    'notification-error': themedColors[`errorSoft${keySuffix}`],
    'notification-warning': themedColors[`warningSoft${keySuffix}`],
  };

  return colorMap[tagColor];
};
