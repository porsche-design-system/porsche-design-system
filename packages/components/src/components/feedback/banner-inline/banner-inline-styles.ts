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
  const themedColors = getThemedColors(theme);
  const backgroundColor = themedColors[state + 'SoftColor'];
  const borderAndIconColor = themedColors[state + 'Color'];

  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridTemplateRows: 'auto',
        gridRowGap: pxToRemWithUnit(4),
        alignItems: 'start',
        padding: pxToRemWithUnit(16),
        background: backgroundColor,
        borderLeft: `${pxToRemWithUnit(4)} solid ${borderAndIconColor}`,
        [mediaQuery('s')]: {
          gridTemplateColumns: 'auto 1fr auto auto',
        },
      })
    ),
    content: {
      maxWidth: pxToRemWithUnit(800),
      display: 'grid',
      gridGap: pxToRemWithUnit(4),
    },
    icon: {
      display: 'none',
      [mediaQuery('s')]: {
        display: 'inline-flex',
        marginRight: pxToRemWithUnit(8),
        color: borderAndIconColor,
      },
    },
    action: {
      gridColumnStart: 1,
      gridRowStart: 2,
      [mediaQuery('s')]: {
        gridColumnStart: 3,
        gridRowStart: 1,
        marginLeft: pxToRemWithUnit(16),
      },
    },
    close: {
      marginLeft: pxToRemWithUnit(16),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
