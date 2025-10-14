import type { ThemedColors } from '../../styles';
import type { TagColor } from './tag-utils';

export const getThemedBackgroundColor = (tagColor: TagColor, themedColors: ThemedColors): string => {
  const colorMap: Record<TagColor, string> = {
    'background-base': themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    'background-frosted': themedColors.backgroundFrostedColor,
    primary: themedColors.primaryColor,
    'notification-info-soft': themedColors.infoSoftColor,
    'notification-warning-soft': themedColors.warningSoftColor,
    'notification-success-soft': themedColors.successSoftColor,
    'notification-error-soft': themedColors.errorSoftColor,
  };

  return colorMap[tagColor];
};
