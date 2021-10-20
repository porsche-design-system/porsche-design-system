import {
  addImportantToEachRule,
  buildHostStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
  mediaQuery,
  pxToRemWithUnit,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import type { BannerState, Theme } from '../../../types';

export const getComponentCss = (state: BannerState, theme: Theme): string => {
  const { neutralSoftColor } = getThemedColors(theme);
  const backgroundColor = state === 'neutral' ? neutralSoftColor : color.notification[state + 'Soft']; // not themed
  const borderAndIconColor = color.notification[state]; // not themed

  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        display: 'flex',
        position: 'relative',
        padding: pxToRemWithUnit(16),
        background: backgroundColor, // not themed
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: pxToRemWithUnit(4),
          background: borderAndIconColor, // not themed
        },
      })
    ),
    content: {
      maxWidth: pxToRemWithUnit(800),
      paddingRight: pxToRemWithUnit(40),
      // p-text for description
      '& *:nth-child(2):not(.close)': {
        marginTop: pxToRemWithUnit(4),
      },
    },
    icon: {
      display: 'none',
      [mediaQuery('s')]: {
        display: 'block',
        paddingRight: pxToRemWithUnit(8),
        color: borderAndIconColor,
      },
    },
    close: {
      position: 'absolute',
      top: pxToRemWithUnit(16),
      right: pxToRemWithUnit(16),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
