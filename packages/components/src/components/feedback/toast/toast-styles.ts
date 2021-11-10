import {
  addImportantToEachRule,
  attachComponentCss,
  buildHostStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
  pxToRemWithUnit,
} from '../../../utils';
import type { ToastOffset, ToastState } from './toast-utils';
import type { Theme } from '../../../types';
import { TOAST_DEFAULT_TIMEOUT } from './toast-manager';
import {
  getCloseIconStyles,
  getNotificationContentStyles,
  getNotificationIconStyles,
  getNotificationRootStyles,
} from '../inline-notification/inline-notification-styles';

export const getComponentCss = (state: ToastState, theme: Theme, offset: ToastOffset): string => {
  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        position: 'fixed',
        bottom: pxToRemWithUnit(offset.bottom),
        left: pxToRemWithUnit(8),
      })
    ),
    root: getNotificationRootStyles(state, theme),
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

export const addComponentCss = (host: HTMLElement, state: ToastState, theme: Theme, offset: ToastOffset): void => {
  attachComponentCss(host, getComponentCss, state, theme, offset);
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles({ withDarkTheme: false })));
};
