import type { Theme } from '@porsche-design-system/utilities-v2';
import type { TextColor } from '../types';
import { getThemedColors } from './colors';

export const getThemedTextColor = (theme: Theme, textColor: TextColor): string => {
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

  const colorMap: { [key in TextColor]: string } = {
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
