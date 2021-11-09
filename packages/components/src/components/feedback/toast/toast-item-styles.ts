import {
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getNotificationHostStyles,
  getNotificationIconAndContentStyles,
  getThemedColors,
  mediaQuery,
} from '../../../utils';

import type { ToastItemState } from './toast-item-utils';
import { Theme } from '../../../types';

const mediaQueryS = mediaQuery('s');

export const getComponentCss = (state: ToastItemState, theme: Theme): string => {
  const themedColors = getThemedColors(theme);
  const backgroundColor = themedColors[`${state}SoftColor`];
  const borderColor = themedColors[`${state}Color`];
  const iconColor = getThemedColors('light')[`${state}Color`];

  return getCss({
    ...getNotificationHostStyles(backgroundColor, borderColor, mediaQueryS),
    ...getNotificationIconAndContentStyles(mediaQueryS, iconColor),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles({ withDarkTheme: false })));
};
