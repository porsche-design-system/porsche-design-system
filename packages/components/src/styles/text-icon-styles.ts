import type { Theme } from '@porsche-design-system/utilities-v2';
import type { TextColor } from '../types';
import type { HeadingColor } from '../components/heading/heading-utils';
import type { DisplayColor } from '../components/display/display-utils';
import { getThemedColors } from './colors';

export const getThemedTypographyColor = (theme: Theme, textColor: TextColor | HeadingColor | DisplayColor): string => {
  const {
    primaryColor,
    contrastHighColor,
    contrastMediumColor,
    contrastLowColor,
    successColor,
    errorColor,
    warningColor,
    infoColor,
  } = getThemedColors(theme);

  const colorMap: { [key in TextColor | HeadingColor | DisplayColor]: string } = {
    primary: primaryColor,
    brand: primaryColor, // deprecated
    default: primaryColor, // deprecated
    'contrast-low': contrastLowColor,
    'neutral-contrast-low': contrastLowColor, // deprecated
    'contrast-medium': contrastMediumColor,
    'neutral-contrast-medium': contrastMediumColor, // deprecated
    'contrast-high': contrastHighColor,
    'neutral-contrast-high': contrastHighColor, // deprecated
    'notification-success': successColor,
    'notification-warning': warningColor,
    'notification-error': errorColor,
    'notification-info': infoColor,
    'notification-neutral': infoColor, // deprecated
    inherit: 'currentColor',
  };
  return colorMap[textColor];
};
