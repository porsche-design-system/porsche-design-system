import { colorErrorFrosted, colorInfoFrosted, colorSuccessFrosted, colorWarningFrosted } from '../css-variables';

export const notificationBackgroundMap = {
  info: colorInfoFrosted,
  warning: colorWarningFrosted,
  success: colorSuccessFrosted,
  error: colorErrorFrosted,
} as const;
