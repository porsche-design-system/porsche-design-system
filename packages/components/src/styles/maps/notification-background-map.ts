import {
  colorErrorFrosted,
  colorInfoFrosted,
  colorSuccessFrosted,
  colorWarningFrosted,
  ref,
} from '@porsche-design-system/stylesheets';

export const notificationBackgroundMap = {
  info: ref(colorInfoFrosted),
  warning: ref(colorWarningFrosted),
  success: ref(colorSuccessFrosted),
  error: ref(colorErrorFrosted),
} as const;
