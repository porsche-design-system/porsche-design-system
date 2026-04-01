import { colorError, colorInfo, colorSuccess, colorWarning } from '../css-variables';

export const notificationColorMap = {
  info: colorInfo,
  warning: colorWarning,
  success: colorSuccess,
  error: colorError,
} as const;
