import {
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getNotificationHostStyles,
  getNotificationIconAndContentStyles,
  getThemedColors,
  mediaQuery,
  pxToRemWithUnit,
} from '../../../utils';
import type { Theme } from '../../../types';
import type { InlineNotificationState } from './inline-notification-utils';

const mediaQueryS = mediaQuery('s');

export const getComponentCss = (
  state: InlineNotificationState,
  hasAction: boolean,
  hasClose: boolean,
  theme: Theme
): string => {
  const themedColors = getThemedColors(theme);
  const backgroundColor = themedColors[`${state}SoftColor`];
  const borderColor = themedColors[`${state}Color`];
  const iconColor = getThemedColors('light')[`${state}Color`];

  return getCss({
    ...getNotificationHostStyles(backgroundColor, borderColor, mediaQueryS),
    ...getNotificationIconAndContentStyles(mediaQueryS, iconColor),
    ...(hasAction && {
      action: {
        gridColumnStart: 1,
        gridRowStart: 2,
        [mediaQueryS]: {
          gridColumnStart: 3,
          gridRowStart: 1,
          marginLeft: pxToRemWithUnit(16),
        },
      },
    }),
    ...(hasClose && {
      close: {
        marginLeft: pxToRemWithUnit(16),
      },
    }),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles({ withDarkTheme: false })));
};
