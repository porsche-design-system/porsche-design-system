import type { Theme } from '../../../../types';
import type { ToastState } from '../toast/toast-utils';
import { getCss } from '../../../../utils';
import {
  getCloseIconStyle,
  getNotificationContentStyle,
  getNotificationIconStyle,
  getNotificationRootStyle,
} from '../../inline-notification/inline-notification-styles';
import { getBoxShadow } from '../../banner/banner-styles';

export const getComponentCss = (state: ToastState, theme: Theme): string => {
  return getCss({
    ':host': { ...getNotificationRootStyle(state, theme), ...getBoxShadow() },
    icon: getNotificationIconStyle(state),
    content: getNotificationContentStyle(),
    close: getCloseIconStyle(),
  });
};
