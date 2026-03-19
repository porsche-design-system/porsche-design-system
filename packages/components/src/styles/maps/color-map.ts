import {
  colorContrastHigh,
  colorContrastHigher,
  colorContrastLow,
  colorContrastLower,
  colorContrastMedium,
  colorError,
  colorInfo,
  colorPrimary,
  colorSuccess,
  colorWarning,
} from '../css-variables';

export const colorMap = {
  primary: colorPrimary,
  'contrast-higher': colorContrastHigher,
  'contrast-high': colorContrastHigh,
  'contrast-medium': colorContrastMedium,
  'contrast-low': colorContrastLow,
  'contrast-lower': colorContrastLower,
  success: colorSuccess,
  warning: colorWarning,
  error: colorError,
  info: colorInfo,
  inherit: 'currentcolor',
} as const;
