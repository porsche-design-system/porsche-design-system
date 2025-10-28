import type { ThemedColors } from '../../styles'; // deep import needed since barrel contains MutationObserver and causes VRT to fail because of TAG_COLORS import
import type { IconName } from '../../types';
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

export const getThemedBackgroundHoverColor = (tagColor: TagColor, themedColors: ThemedColors): string => {
  // const isDark = isThemeDark(theme);
  // const keySuffix = isDark ? 'Lighten' : 'Darken';
  const colorMap: Record<TagColor, string> = {
    'background-base': themedColors.canvasColor, // [`canvasColor${keySuffix}`],
    'background-surface': themedColors.surfaceColor, // [`backgroundSurfaceColor${keySuffix}`],
    'background-frosted': themedColors.frostedColor /* isDark
      ? lighten(themedColors.backgroundFrostedColor)
      : darken(themedColors.backgroundFrostedColor), */,
    primary: themedColors.primaryColor, // isDark ? themedColors.contrastHighColorLighten : themedColors.contrastHighColor,
    'notification-info-soft': themedColors.infoSoftColor, // themedColors[`infoSoftColor${keySuffix}`],
    'notification-success-soft': themedColors.successSoftColor, // [`successSoftColor${keySuffix}`],
    'notification-error-soft': themedColors.errorSoftColor, // [`errorSoftColor${keySuffix}`],
    'notification-warning-soft': themedColors.warningSoftColor, // [`warningSoftColor${keySuffix}`],
  };

  return colorMap[tagColor];
};
