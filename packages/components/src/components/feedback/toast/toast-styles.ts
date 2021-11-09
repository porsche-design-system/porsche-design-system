import {
  addImportantToEachRule,
  attachComponentCss,
  buildHostStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCloseIconStyles,
  getCss,
  getNotificationHostStyles,
  getNotificationIconAndContentStyles,
  getThemedColors,
  mediaQuery,
  pxToRemWithUnit,
} from '../../../utils';
import type { ToastOffset, ToastState } from './toast-utils';
import type { Theme } from '../../../types';
import { TOAST_DEFAULT_TIMEOUT } from './toast-manager';

const mediaQueryS = mediaQuery('s');

export const getComponentCss = (state: ToastState, theme: Theme, offset: ToastOffset): string => {
  const themedColors = getThemedColors(theme);
  const backgroundColor = themedColors[`${state}SoftColor`];
  const borderColor = themedColors[`${state}Color`];
  const iconColor = getThemedColors('light')[`${state}Color`];

  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        position: 'fixed',
        bottom: pxToRemWithUnit(offset.bottom),
        left: pxToRemWithUnit(8),
      })
    ),
    root: getNotificationHostStyles(backgroundColor, borderColor, mediaQueryS),
    ...getNotificationIconAndContentStyles(mediaQueryS, iconColor),
    ...getCloseIconStyles(),
    progress: {
      animationName: '$progress',
      animationDuration: `${TOAST_DEFAULT_TIMEOUT}ms`,
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards',
      display: 'block',
      background: themedColors[state + 'Color'],
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
