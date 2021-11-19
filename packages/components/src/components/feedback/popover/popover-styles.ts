import {
  addImportantToEachRule,
  buildHostStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  isDark,
  mediaQuery,
  pxToRemWithUnit,
} from '../../../utils';
import type { PopoverDirection } from './popover-utils';
import type { JssStyle } from '../../../utils';
import { Theme } from '../../../types';
import { color, text } from '@porsche-design-system/utilities';

const getPopoverPosition = (direction: PopoverDirection): JssStyle => {
  switch (direction) {
    case 'top':
      return {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'right':
      return {
        top: '50%',
        left: '100%',
        transform: 'translateY(-50%)',
      };
    case 'bottom':
      return {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        top: '50%',
        right: '100%',
        transform: 'translateY(-50%)',
      };
  }
};

const getArrow = (direction: PopoverDirection, backgroundColor: string): JssStyle => {
  const invisibleBorder = 'solid .75rem transparent';
  const visibleBorder = `solid .75rem ${backgroundColor}`;

  switch (direction) {
    case 'top':
      return {
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: invisibleBorder,
        borderRight: invisibleBorder,
        borderTop: visibleBorder,
      };
    case 'right':
      return {
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: invisibleBorder,
        borderBottom: invisibleBorder,
        borderRight: visibleBorder,
      };
    case 'bottom':
      return {
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: invisibleBorder,
        borderRight: invisibleBorder,
        borderBottom: visibleBorder,
      };
    case 'left':
      return {
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: invisibleBorder,
        borderBottom: invisibleBorder,
        borderLeft: visibleBorder,
      };
  }
};

const getColors = (isDarkTheme: boolean): { baseColor: string; backgroundColor: string } => {
  return {
    baseColor: isDarkTheme ? color.darkTheme.default : color.default,
    backgroundColor: isDarkTheme ? color.darkTheme.background.surface : color.background.default,
  };
};

export const getComponentCss = (direction: PopoverDirection, theme: Theme): string => {
  const isDarkTheme = isDark(theme);
  const { baseColor, backgroundColor } = getColors(isDarkTheme);
  const mediaQueryXS = mediaQuery('xs');

  return getCss({
    ...buildHostStyles({
      verticalAlign: 'top',
      ...addImportantToEachRule({
        position: 'relative',
        display: 'inline-block',
      }),
    }),
    spacer: {
      position: 'absolute',
      top: '-1rem',
      left: '-1rem',
      right: '-1rem',
      bottom: '-1rem',
      filter: 'drop-shadow(0 0 1rem rgba(0,0,0,.3))',
      pointerEvents: 'none',
      animation: 'var(--p-animation-duration__popover, 240ms) $fadeIn ease forwards',
      '&::before': {
        content: '""',
        width: 0,
        height: 0,
        position: 'absolute',
        ...getArrow(direction, backgroundColor),
      },
    },
    popover: {
      position: 'absolute',
      zIndex: 99999,
      maxWidth: '90vw',
      width: 'max-content',
      boxSizing: 'border-box',
      background: backgroundColor,
      padding: '.5rem 1rem',
      pointerEvents: 'auto',
      ...getPopoverPosition(direction),
      ...text.small,
      '-webkit-text-size-adjust': 'none',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      listStyleType: 'none',
      color: baseColor,
      whiteSpace: 'inherit',
      [mediaQueryXS]: {
        maxWidth: pxToRemWithUnit(432),
      },
    },
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
