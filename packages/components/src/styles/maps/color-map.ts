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
  ref,
} from '@porsche-design-system/stylesheets';

export const colorMap = {
  primary: ref(colorPrimary),
  'contrast-higher': ref(colorContrastHigher),
  'contrast-high': ref(colorContrastHigh),
  'contrast-medium': ref(colorContrastMedium),
  'contrast-low': ref(colorContrastLow),
  'contrast-lower': ref(colorContrastLower),
  success: ref(colorSuccess),
  warning: ref(colorWarning),
  error: ref(colorError),
  info: ref(colorInfo),
  inherit: 'currentcolor',
} as const;
