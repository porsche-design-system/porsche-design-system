import { buildHostStyles, getCss } from '../../../../utils';
import {
  getCloseIconStyles,
  getNotificationContentStyles,
  getNotificationIconStyles,
  getNotificationRootStyles,
} from '../../inline-notification/inline-notification-styles';
import { Theme } from '../../../../types';
import { ToastState } from '../toast/toast-utils';

export const getComponentCss = (state: ToastState, theme: Theme): string => {
  return getCss({
    ...buildHostStyles(getNotificationRootStyles(state, theme)),
    icon: getNotificationIconStyles(state),
    content: getNotificationContentStyles(),
    close: getCloseIconStyles(),
  });
};
