import { getInsetJssStyle, ThemedColors } from '../../styles';
import { JssStyle } from 'jss';
import { TagColor } from './tag-utils';
import { borderRadiusMedium, borderWidthBase, fontStyle, fontWeight } from '@porsche-design-system/utilities-v2';

export const getTagFocusJssStyle = (themedColors: ThemedColors): JssStyle => {
  return {
    '&::before': {
      content: '""',
      position: 'absolute',
      ...getInsetJssStyle(-4),
      border: `${borderWidthBase} solid transparent`,
      borderRadius: borderRadiusMedium,
    },
    '&:focus::before': {
      borderColor: themedColors.focusColor,
    },
    '&:focus:not(:focus-visible)::before': {
      borderColor: 'transparent',
    },
  };
};

export const getThemedBackgroundColor = (tagColor: TagColor, themedColors: ThemedColors): string => {
  const colorMap: { [key in TagColor]: string } = {
    'background-default': themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    'neutral-contrast-high': themedColors.primaryColor,
    'notification-information': themedColors.infoSoftColor,
    'notification-success': themedColors.successSoftColor,
    'notification-error': themedColors.errorSoftColor,
    'notification-warning': themedColors.warningSoftColor,
  };

  return colorMap[tagColor];
};

export const slottedTextJssStyle: JssStyle = {
  '&(strong),&(b)': {
    fontWeight: fontWeight.bold,
  },
  '&(em),&(i)': {
    fontStyle,
  },
};
