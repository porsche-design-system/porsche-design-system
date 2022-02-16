import type { Theme } from '@porsche-design-system/utilities-v2';
import type { TextColor } from '../types';
import { getThemedColors } from './colors';

export const getThemedTextColor = (theme: Theme, textColor: TextColor): string => {
  const {
    baseColor,
    brandColor,
    contrastHighColor,
    contrastMediumColor,
    contrastLowColor,
    successColor,
    errorColor,
    warningColor,
    neutralColor,
  } = getThemedColors(theme);

  const colorMap: { [key in TextColor]: string } = {
    brand: brandColor,
    default: baseColor,
    'neutral-contrast-high': contrastHighColor,
    'neutral-contrast-medium': contrastMediumColor,
    'neutral-contrast-low': contrastLowColor,
    'notification-success': successColor,
    'notification-warning': warningColor,
    'notification-error': errorColor,
    'notification-neutral': neutralColor,
    inherit: 'currentColor',
  };
  return colorMap[textColor];
};
