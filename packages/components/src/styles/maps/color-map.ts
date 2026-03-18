import {
  colorContrastHigh,
  colorContrastLow,
  colorContrastMedium,
  colorError,
  colorInfo,
  colorPrimary,
  colorSuccess,
  colorWarning,
} from '../css-variables';

export const colorMap = {
  primary: colorPrimary,
  'contrast-high': colorContrastHigh,
  'contrast-medium': colorContrastMedium,
  'contrast-low': colorContrastLow,
  success: colorSuccess,
  warning: colorWarning,
  error: colorError,
  info: colorInfo,
  inherit: 'inherit',
} as const;
