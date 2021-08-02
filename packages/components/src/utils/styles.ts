import { breakpoint, color, font } from '@porsche-design-system/utilities';
import type { Breakpoint } from '@porsche-design-system/utilities';
import { isDark } from '.';
import type { JssStyle, Styles } from '.';
import type { Theme } from '../types';

export const transitionDuration = 'var(--p-transition-duration, .24s)';
export const transitionTimingFunction = 'ease';

export const colorDarken = {
  neutralContrast: {
    high: '#151718'
  },
  state: {
    hover: '#980014'
  },
  darkTheme: {
    default: '#e0e0e0',
    state: {
      hover: '#c4001a'
    },
  }
};

export const pxToRem = (px: number): number => px / 16;
export const pxToRemWithUnit = (px: number): string => `${pxToRem(px)}rem`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addImportantToRule = (value: any): string => `${value} !important`;

export const addImportantToEachRule = <T extends Record<string, unknown>>(style: T): T => {
  // eslint-disable-next-line guard-for-in
  for (const key in style) {
    const value = style[key];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    style[key] = typeof value === 'object' ? addImportantToEachRule(value) : addImportantToRule(value);
  }

  return style;
};

type GetHoverStylesOptions = {
  theme?: Theme;
};

export const getHoverStyles = (opts?: GetHoverStylesOptions): JssStyle => {
  const options: GetHoverStylesOptions = {
    theme: 'light',
    ...opts,
  };

  const style: JssStyle = {
    transition: `color ${transitionDuration} ${transitionTimingFunction}`,
    '&:hover': {
      color: isDark(options.theme) ? color.darkTheme.state.hover : color.state.hover,
    },
  };

  return style;
};

type GetFocusStylesOptions = {
  color?: string;
  offset?: number;
  theme?: Theme;
};

export const getFocusStyles = (opts?: GetFocusStylesOptions): JssStyle => {
  const options: GetFocusStylesOptions = {
    color: color.state.focus,
    offset: 2,
    theme: 'light',
    ...opts,
  };

  const style: JssStyle = {
    outline: 'transparent solid 1px',
    outlineOffset: `${options.offset}px`,
    '&::-moz-focus-inner': {
      border: '0',
    },
    '&:focus': {
      outlineColor: isDark(options.theme) ? color.darkTheme.state.focus : options.color,
    },
    '&:focus:not(:focus-visible)': {
      outlineColor: 'transparent',
    },
  };

  return style;
};

export { Breakpoint, breakpoint } from '@porsche-design-system/utilities';
export const mediaQuery = (minBreakpoint: Breakpoint): string => `@media (min-width: ${breakpoint[minBreakpoint]}px)`;

export const getBaseSlottedStyles = (theme?: Theme): Styles => {
  return {
    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
      ...getHoverStyles({ theme }),
      ...getFocusStyles({ offset: 1, theme }),
    },
    '& b, & strong': {
      fontWeight: font.weight.bold,
    },
    '& em, & i': {
      fontStyle: 'normal',
    },
  };
};
