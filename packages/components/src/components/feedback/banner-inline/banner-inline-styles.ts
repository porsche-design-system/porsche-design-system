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
  const rootBackgroundColor = // not themed
    state === 'warning'
      ? color.notification.warningSoft
      : state === 'error'
      ? color.notification.errorSoft
      : neutralSoftColor;
  const rootBeforeBackgroundColor = // not themed
    state === 'warning'
      ? color.notification.warning
      : state === 'error'
      ? color.notification.error
      : color.notification.neutral;

  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        display: 'flex',
        position: 'relative',
        padding: `${pxToRemWithUnit(16)} ${pxToRemWithUnit(16)} ${pxToRemWithUnit(16)} ${pxToRemWithUnit(20)}`,
        background: rootBackgroundColor, // not themed
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: pxToRemWithUnit(4),
          background: rootBeforeBackgroundColor, // not themed
        },
      })
    ),
    content: {
      maxWidth: pxToRemWithUnit(800),
      paddingRight: pxToRemWithUnit(48),
      // p-text for description
      '& *:nth-child(2):not(.close)': {
        marginTop: pxToRemWithUnit(8),
      },
    },
    icon: {
      display: 'none',
      [mediaQuery('s')]: {
        display: 'block',
        paddingRight: pxToRemWithUnit(12),
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
