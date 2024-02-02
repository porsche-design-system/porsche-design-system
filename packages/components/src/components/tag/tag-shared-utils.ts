import { type ThemedColors } from '../../styles';
import type { TagColor, TagColorDeprecated } from './tag-utils';

export const getThemedBackgroundColor = (
  tagColor: Exclude<TagColor, TagColorDeprecated>,
  themedColors: ThemedColors
): string => {
  const colorMap: Record<Exclude<TagColor, TagColorDeprecated>, string> = {
    'background-base': themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    primary: themedColors.primaryColor,
    'notification-info-soft': themedColors.infoSoftColor,
    'notification-warning-soft': themedColors.warningSoftColor,
    'notification-success-soft': themedColors.successSoftColor,
    'notification-error-soft': themedColors.errorSoftColor,
  };

  return colorMap[tagColor];
};
