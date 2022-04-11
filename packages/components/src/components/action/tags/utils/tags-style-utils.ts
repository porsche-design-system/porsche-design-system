import type { TagStatusColor } from '../tag-status/tag-status-utils';
import type { ThemedColors } from '../../../../styles';

export const getThemedBackgroundColor = (color: TagStatusColor, themedColors: ThemedColors): string => {
  const colorMap: { [key in TagStatusColor]: string } = {
    default: themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    'neutral-contrast-high': themedColors.contrastHighColor,
    'notification-neutral': themedColors.neutralSoftColor,
    'notification-success': themedColors.successSoftColor,
    'notification-error': themedColors.errorSoftColor,
    'notification-warning': themedColors.warningSoftColor,
  };

  return colorMap[color];
};
