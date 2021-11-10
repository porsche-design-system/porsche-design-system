import { buildHostStyles, buildSlottedStyles, getBaseSlottedStyles, getCss, getThemedColors } from '../../../../utils';
import {
  getCloseIconStyles,
  getNotificationContentStyles,
  getNotificationIconStyles,
  getNotificationRootStyles,
} from '../../inline-notification/inline-notification-styles';
import { TOAST_DEFAULT_TIMEOUT } from '../toast/toast-manager';
import { Theme } from '../../../../types';
import { ToastState } from '../toast/toast-utils';

export const getComponentCss = (state: ToastState, theme: Theme): string => {
  return getCss({
    ...buildHostStyles(getNotificationRootStyles(state, theme)),
    icon: getNotificationIconStyles(state),
    content: getNotificationContentStyles(),
    close: getCloseIconStyles(),
    progress: {
      animationName: '$progress',
      animationDuration: `${TOAST_DEFAULT_TIMEOUT}ms`,
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards',
      display: 'block',
      background: getThemedColors(theme)[state + 'Color'],
      height: '.5rem',
    },
    '@keyframes progress': {
      from: { width: '100%' },
      to: { width: 0 },
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles({ withDarkTheme: false })));
};
