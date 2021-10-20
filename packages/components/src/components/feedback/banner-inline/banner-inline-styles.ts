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
        alignItems: 'flex-start',
        position: 'relative',
        padding: pxToRemWithUnit(16),
        background: backgroundColor, // not themed
        borderLeft: `${pxToRemWithUnit(4)} solid ${borderAndIconColor}`,
      })
    ),
    content: {
      width: '100%',
      '& *': {
        maxWidth: pxToRemWithUnit(800),
      },
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
      marginLeft: pxToRemWithUnit(8),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
