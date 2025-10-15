import type { Theme } from '@porsche-design-system/styles';
import type { DisplayColor } from '../components/display/display-utils';
import type { HeadingColor } from '../components/heading/heading-utils';
import type { TypographyTextColor } from '../types';
import { getThemedColors } from './colors';

export const getThemedTypographyColor = (
  theme: Theme,
  textColor: TypographyTextColor | HeadingColor | DisplayColor // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
): string => {
  const themedColors = getThemedColors(theme);

  const colorMap: Record<
    TypographyTextColor | HeadingColor | DisplayColor, // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
    string
  > = {
    primary: themedColors.primaryColor,
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
