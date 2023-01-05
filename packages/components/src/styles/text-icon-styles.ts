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
    brand: primaryColor, // TODO: shall be deprecated with v3-alpha
    default: primaryColor, // TODO: shall be deprecated with v3-alpha
    'neutral-contrast-high': contrastHighColor,
    'neutral-contrast-medium': contrastMediumColor,
    'neutral-contrast-low': contrastLowColor,
    'notification-success': successColor,
    'notification-warning': warningColor,
    'notification-error': errorColor,
    'notification-info': infoColor,
    'notification-neutral': infoColor, // TODO: shall be deprecated with v3-alpha
    inherit: 'currentColor',
  };
  return colorMap[textColor];
};
