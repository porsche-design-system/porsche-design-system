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
import type { Theme } from '../../../types';
import type { BannerInlineState } from './banner-inline-utils';

export const getComponentCss = (state: BannerInlineState, theme: Theme): string => {
  const { neutralSoftColor, ...otherColors } = getThemedColors(theme);
  const backgroundColor = state === 'neutral' ? neutralSoftColor : otherColors[state + 'SoftColor'];
  const borderAndIconColor = otherColors[state + 'Color'];

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
