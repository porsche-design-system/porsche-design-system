import type { DisplayColor } from '../components/display/display-utils';
import type { HeadingColor } from '../components/heading/heading-utils';
import type { TypographyTextColor } from '../types';
import {
  colorContrastHigh,
  colorContrastLow,
  colorContrastMedium,
  colorError,
  colorInfo,
  colorPrimary,
  colorSuccess,
  colorWarning,
} from './css-variables';

const colorMap: Record<TypographyTextColor | HeadingColor | DisplayColor, string> = {
  primary: colorPrimary,
  'contrast-high': colorContrastHigh,
  'contrast-medium': colorContrastMedium,
  'contrast-low': colorContrastLow,
  success: colorSuccess,
  warning: colorWarning,
  error: colorError,
  info: colorInfo,
  inherit: 'currentColor',
};

export const getThemedTypographyColor = (textColor: TypographyTextColor | HeadingColor | DisplayColor): string => {
  return colorMap[textColor];
};
