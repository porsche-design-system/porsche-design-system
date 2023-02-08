import { getInsetJssStyle, ThemedColors } from '../../styles';
import { JssStyle } from 'jss';
import { TagColor } from './tag-utils';
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

export const getThemedBackgroundColor = (tagColor: TagColor, themedColors: ThemedColors): string => {
  const colorMap: { [key in TagColor]: string } = {
    'background-default': themedColors.backgroundColor, // 'background-default' is deprecated (replaced with 'background-base')
    'background-base': themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    'neutral-contrast-high': themedColors.primaryColor, // 'neutral-contrast-high' is deprecated (replaced with 'primary')
    primary: themedColors.primaryColor,
    'notification-neutral': themedColors.infoSoftColor, // 'notification-neutral' is deprecated (replaced with 'notification-info')
    'notification-info': themedColors.infoSoftColor,
    'notification-success': themedColors.successSoftColor,
    'notification-error': themedColors.errorSoftColor,
    'notification-warning': themedColors.warningSoftColor,
  };

  return colorMap[tagColor];
};
