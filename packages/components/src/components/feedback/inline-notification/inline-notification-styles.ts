import type { JssStyle } from 'jss';
import type { Theme } from '../../../types';
import type { InlineNotificationState } from './inline-notification-utils';
import { buildSlottedStyles, getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getBaseSlottedStyles,
  mediaQuery,
  pxToRemWithUnit,
  getThemedColors,
} from '../../../styles';

const mediaQueryS = mediaQuery('s');

export const getComponentCss = (
  state: InlineNotificationState,
  hasAction: boolean,
  hasClose: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule(getNotificationRootStyle(state, theme)),
    },
    icon: getNotificationIconStyle(state),
    content: getNotificationContentStyle(),
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
    ...(hasClose && { close: getCloseIconStyle() }),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles({ withDarkTheme: false })));
};

export const getNotificationRootStyle = (state: InlineNotificationState, theme: Theme): JssStyle => {
  const themedColors = getThemedColors(theme);
  return {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'auto',
    gridRowGap: pxToRemWithUnit(16),
    alignItems: 'start',
    justifyItems: 'start',
    padding: pxToRemWithUnit(16),
    background: themedColors[`${state}SoftColor`],
    borderLeft: `${pxToRemWithUnit(4)} solid ${themedColors[`${state}Color`]}`,
    [mediaQueryS]: {
      gridTemplateColumns: 'auto 1fr auto auto',
    },
  };
};

export const getNotificationIconStyle = (state: InlineNotificationState): JssStyle => ({
  display: 'none',
  [mediaQueryS]: {
    display: 'inline-flex',
    marginRight: pxToRemWithUnit(8),
    color: getThemedColors('light')[`${state}Color`],
  },
});

export const getNotificationContentStyle = (): JssStyle => ({
  display: 'grid',
  gridGap: pxToRemWithUnit(4),
  maxWidth: pxToRemWithUnit(800),
});

export const getCloseIconStyle = (): JssStyle => ({
  marginLeft: pxToRemWithUnit(16),
});
