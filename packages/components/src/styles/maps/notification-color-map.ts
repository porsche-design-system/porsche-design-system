import { colorError, colorInfo, colorSuccess, colorWarning, ref } from '@porsche-design-system/stylesheets';

export const notificationColorMap = {
  info: ref(colorInfo),
  warning: ref(colorWarning),
  success: ref(colorSuccess),
  error: ref(colorError),
} as const;
