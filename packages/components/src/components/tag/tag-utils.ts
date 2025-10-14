import type { ThemedColors } from '../../styles'; // deep import needed since barrel contains MutationObserver and causes VRT to fail because of TAG_COLORS import
import type { IconName, Theme } from '../../types';
import { darken, isThemeDark, lighten } from '../../utils';
import { TAG_DISMISSIBLE_COLORS } from '../tag-dismissible/tag-dismissible-utils';

export type TagIcon = IconName;

export const TAG_COLORS = [
  ...TAG_DISMISSIBLE_COLORS,
  'background-frosted',
  'primary',
  'notification-info-soft',
  'notification-warning-soft',
  'notification-success-soft',
  'notification-error-soft',
] as const;
export type TagColor = (typeof TAG_COLORS)[number];

export const getThemedBackgroundHoverColor = (tagColor: TagColor, themedColors: ThemedColors, theme: Theme): string => {
  const isDark = isThemeDark(theme);
  const keySuffix = isDark ? 'Lighten' : 'Darken';
  const colorMap: Record<TagColor, string> = {
    'background-base': themedColors[`backgroundColor${keySuffix}`],
    'background-surface': themedColors[`backgroundSurfaceColor${keySuffix}`],
    'background-frosted': isDark
      ? lighten(themedColors.backgroundFrostedColor)
      : darken(themedColors.backgroundFrostedColor),
    primary: isDark ? themedColors.contrastHighColorLighten : themedColors.contrastHighColor,
    'notification-info-soft': themedColors[`infoSoftColor${keySuffix}`],
    'notification-success-soft': themedColors[`successSoftColor${keySuffix}`],
    'notification-error-soft': themedColors[`errorSoftColor${keySuffix}`],
    'notification-warning-soft': themedColors[`warningSoftColor${keySuffix}`],
  };

  return colorMap[tagColor];
};
