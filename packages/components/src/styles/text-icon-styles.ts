import type { DisplayColor } from '../components/display/display-utils';
import type { HeadingColor } from '../components/heading/heading-utils';
import type { TypographyTextColor } from '../types';
import { colors } from './colors';

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
  'contrast-high': contrastHighColor,
  'contrast-medium': contrastMediumColor,
  'contrast-low': contrastLowColor,
  success: successColor,
  warning: warningColor,
  error: errorColor,
  info: infoColor,
  inherit: 'currentColor',
};

export const getThemedTypographyColor = (textColor: TypographyTextColor | HeadingColor | DisplayColor): string => {
  return colorMap[textColor];
};
