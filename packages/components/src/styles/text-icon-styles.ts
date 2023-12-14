import type { Theme } from '@porsche-design-system/utilities-v2';
import type { TextColor, TextColorDeprecated } from '../types';
import type { HeadingColor } from '../components/heading/heading-utils';
import type { HeadlineColor } from '../components/headline/headline-utils';
import type { DisplayColor } from '../components/display/display-utils';
import { getThemedColors } from './colors';

export const getThemedTypographyColor = (
  theme: Theme,
  textColor: Exclude<TextColor, TextColorDeprecated> | HeadlineColor | HeadingColor | DisplayColor // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
): string => {
  // TODO: don't destructure for better minification
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

  const colorMap: Record<
    Exclude<TextColor, TextColorDeprecated> | HeadlineColor | HeadingColor | DisplayColor, // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
    string
  > = {
    primary: primaryColor,
    default: primaryColor, // deprecated but part of HeadlineColor
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
