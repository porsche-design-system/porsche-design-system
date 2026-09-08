import type { IconName } from '../../../types';
import type { ToastState } from '../toast/toast-utils';

export const getToastIconName = (state: ToastState): IconName => {
  const iconMap: Record<ToastState, IconName> = {
    info: 'information-filled',
    warning: 'warning-filled',
    success: 'success-filled',
    error: 'error-filled',
  };

  return iconMap[state];
};
