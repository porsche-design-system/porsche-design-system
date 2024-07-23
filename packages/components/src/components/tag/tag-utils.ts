import type { IconName, Theme } from '../../types';
import type { ThemedColors } from '../../styles'; // deep import needed since barrel contains MutationObserver and causes VRT to fail because of TAG_COLORS import
import { TAG_DISMISSIBLE_COLORS, type TagDismissibleColorDeprecated } from '../tag-dismissible/tag-dismissible-utils';
import { darken, isThemeDark, lighten } from '../../utils';

export type TagIcon = IconName;

/** @deprecated */
export const TAG_COLORS_DEPRECATED = [
  'neutral-contrast-high', // 'notification-contrast-high' is deprecated (replaced with 'primary')
  'notification-neutral', // 'notification-neutral' is deprecated (replaced with 'notification-info-soft')
  'notification-warning',
  'notification-success',
  'notification-error',
] as const;
/** @deprecated */
export type TagColorDeprecated = (typeof TAG_COLORS_DEPRECATED)[number] | TagDismissibleColorDeprecated;
export const TAG_COLORS = [
  ...TAG_DISMISSIBLE_COLORS,
  'background-frosted',
  'primary',
  'notification-info-soft',
  'notification-warning-soft',
  'notification-success-soft',
  'notification-error-soft',
  ...TAG_COLORS_DEPRECATED,
] as const;
export type TagColor = (typeof TAG_COLORS)[number];

export const getThemedBackgroundHoverColor = (
  tagColor: Exclude<TagColor, TagColorDeprecated>,
  themedColors: ThemedColors,
  theme: Theme
): string => {
  const isDark = isThemeDark(theme);
  const keySuffix = isDark ? 'Lighten' : 'Darken';
  const colorMap: Record<Exclude<TagColor, TagColorDeprecated>, string> = {
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
