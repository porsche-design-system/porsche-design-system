import type { Theme } from '@porsche-design-system/utilities-v2';
import type { TypographyTextColor, TypographyTextColorDeprecated } from '../types';
import type { HeadingColor } from '../components/heading/heading-utils';
import type { HeadlineColor } from '../components/headline/headline-utils';
import type { DisplayColor } from '../components/display/display-utils';
import { getThemedColors } from './colors';

export const getThemedTypographyColor = (
  theme: Theme,
  textColor: Exclude<TypographyTextColor, TypographyTextColorDeprecated> | HeadlineColor | HeadingColor | DisplayColor // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
): string => {
  const themedColors = getThemedColors(theme);

  const colorMap: Record<
    Exclude<TypographyTextColor, TypographyTextColorDeprecated> | HeadlineColor | HeadingColor | DisplayColor, // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
    string
  > = {
    primary: themedColors.primaryColor,
    default: themedColors.primaryColor, // deprecated but part of HeadlineColor
    'contrast-low': themedColors.contrastLowColor,
    'contrast-medium': themedColors.contrastMediumColor,
    'contrast-high': themedColors.contrastHighColor,
    'notification-success': themedColors.successColor,
    'notification-warning': themedColors.warningColor,
    'notification-error': themedColors.errorColor,
    'notification-info': themedColors.infoColor,
    inherit: 'currentColor',
  };
  return colorMap[textColor];
};
