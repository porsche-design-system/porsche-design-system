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
  const borderAndIconColor = themedColors[`${state}Color`];

  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridTemplateRows: 'auto',
        gridRowGap: pxToRemWithUnit(4),
        alignItems: 'start',
        justifyItems: 'start',
        padding: pxToRemWithUnit(16),
        background: backgroundColor,
        borderLeft: `${pxToRemWithUnit(4)} solid ${borderAndIconColor}`,
        [mediaQueryS]: {
          gridTemplateColumns: 'auto 1fr auto auto',
        },
      })
    ),
    icon: {
      display: 'none',
      [mediaQueryS]: {
        display: 'inline-flex',
        marginRight: pxToRemWithUnit(8),
        color: borderAndIconColor,
      },
    },
    content: {
      display: 'grid',
      gridGap: pxToRemWithUnit(4),
      maxWidth: pxToRemWithUnit(800),
    },
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
