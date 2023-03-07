import { getInsetJssStyle, ThemedColors } from '../../styles';
import type { JssStyle } from 'jss';
import type { TagColor, TagColorDeprecated } from './tag-utils';
import { borderRadiusMedium, borderWidthBase } from '@porsche-design-system/utilities-v2';

export const getTagFocusJssStyle = (themedColors: ThemedColors): JssStyle => {
  return {
    '&:focus::before': {
      content: '""',
      position: 'absolute',
      ...getInsetJssStyle(-4),
      border: `${borderWidthBase} solid ${themedColors.focusColor}`,
      borderRadius: borderRadiusMedium,
    },
    '&:focus:not(:focus-visible)::before': {
      borderColor: 'transparent',
    },
  };
};

export const getThemedBackgroundColor = (
  tagColor: Exclude<TagColor, TagColorDeprecated>,
  themedColors: ThemedColors
): string => {
  const colorMap: Record<Exclude<TagColor, TagColorDeprecated>, string> = {
    'background-base': themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    primary: themedColors.primaryColor,
    'notification-info': themedColors.infoSoftColor,
    'notification-success': themedColors.successSoftColor,
    'notification-error': themedColors.errorSoftColor,
    'notification-warning': themedColors.warningSoftColor,
  };

  return colorMap[tagColor];
};
