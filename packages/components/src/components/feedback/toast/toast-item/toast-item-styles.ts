import type { Theme } from '../../../../types';
import type { ToastState } from '../toast/toast-utils';
import { getCss } from '../../../../utils';
import {
  getCloseIconJssStyle,
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from '../../inline-notification/inline-notification-styles';
import { getBoxShadow } from '../../banner/banner-styles';

export const getComponentCss = (state: ToastState, theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': {
        ...getNotificationRootJssStyle(state, theme),
        ...getBoxShadow(),
      },
    },
    icon: getNotificationIconJssStyle(state),
    content: getNotificationContentJssStyle(),
    close: getCloseIconJssStyle(),
  });
};
