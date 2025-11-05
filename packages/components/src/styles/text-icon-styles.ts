import type { DisplayColor } from '../components/display/display-utils';
import type { HeadingColor } from '../components/heading/heading-utils';
import type { TypographyTextColor } from '../types';
import { colors } from './colors';

export const getThemedTypographyColor = (textColor: TypographyTextColor | HeadingColor | DisplayColor): string => {
  const {
    primaryColor,
    contrastLowColor,
    contrastMediumColor,
    contrastHighColor,
    successColor,
    warningColor,
    errorColor,
    infoColor,
  } = colors;

  const colorMap: Record<TypographyTextColor | HeadingColor | DisplayColor, string> = {
    primary: primaryColor,
    'contrast-low': contrastLowColor,
    'contrast-medium': contrastMediumColor,
    'contrast-high': contrastHighColor,
    'notification-success': successColor,
    'notification-warning': warningColor,
    'notification-error': errorColor,
    'notification-info': infoColor,
    inherit: 'currentColor',
  };
  return colorMap[textColor];
};
