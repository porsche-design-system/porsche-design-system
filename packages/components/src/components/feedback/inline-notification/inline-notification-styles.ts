import type { JssStyle } from 'jss';
import { headingXSmall, mediaQueryMin, textSmall } from '@porsche-design-system/utilities-v2';
import type { Theme } from '../../../types';
import type { InlineNotificationState } from './inline-notification-utils';
import { buildSlottedStyles, getCss } from '../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles, pxToRemWithUnit, getThemedColors } from '../../../styles';

const mediaQueryS = mediaQueryMin('s');

export const getComponentCss = (
  state: InlineNotificationState,
  hasAction: boolean,
  hasClose: boolean,
  theme: Theme
): string => {
  const textColor = getThemedColors('light').baseColor;
  return getCss({
    '@global': {
      ':host': addImportantToEachRule(getNotificationRootJssStyle(state, theme)),
      h5: {
        ...headingXSmall,
        margin: 0,
        color: textColor,
      },
      p: {
        ...textSmall,
        margin: 0,
        color: textColor,
      },
    },
    icon: getNotificationIconJssStyle(state),
    content: getNotificationContentJssStyle(),
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
    ...(hasClose && { close: getCloseIconJssStyle() }),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};

export const getNotificationRootJssStyle = (state: InlineNotificationState, theme: Theme): JssStyle => {
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

export const getNotificationIconJssStyle = (state: InlineNotificationState): JssStyle => ({
  display: 'none',
  [mediaQueryS]: {
    display: 'inline-flex',
    marginRight: pxToRemWithUnit(8),
    color: getThemedColors('light')[`${state}Color`],
  },
});

export const getNotificationContentJssStyle = (): JssStyle => ({
  display: 'grid',
  gridGap: pxToRemWithUnit(4),
  maxWidth: pxToRemWithUnit(800),
});

export const getCloseIconJssStyle = (): JssStyle => ({
  marginLeft: pxToRemWithUnit(16),
});
