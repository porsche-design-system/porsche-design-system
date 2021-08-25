import type { Breakpoint } from '@porsche-design-system/utilities';
import { breakpoint, color, font } from '@porsche-design-system/utilities';
import type { JssStyle, Styles } from '.';
import { isDark } from '.';
import type { Theme } from '../types';

export const transitionDuration = 'var(--p-transition-duration, .24s)';
export const transitionTimingFunction = 'ease';

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const colorDarken: DeepPartial<typeof color> = {
  neutralContrast: {
    high: '#151718',
  },
  notification: {
    success: '#014d0c',
    error: '#a30000',
  },
  state: {
    hover: '#980014',
  },
  darkTheme: {
    default: '#e0e0e0',
    notification: {
      success: '#017d14',
      error: '#d30303',
    },
    state: {
      hover: '#c4001a',
    },
  },
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

  return {
    transition: `color ${transitionDuration} ${transitionTimingFunction}`,
    '&:hover': {
      color: isDark(options.theme) ? color.darkTheme.state.hover : color.state.hover,
    },
  };
};

type GetFocusStylesOptions = {
  color?: string;
  offset?: number;
};

export const getFocusStyles = (opts?: GetFocusStylesOptions): JssStyle => {
  const options: GetFocusStylesOptions = {
    color: color.state.focus,
    offset: 2,
    ...opts,
  };

  return {
    outline: 'transparent solid 1px',
    outlineOffset: `${options.offset}px`,
    '&::-moz-focus-inner': {
      border: '0',
    },
    '&:focus': {
      outlineColor: options.color,
    },
    '&:focus:not(:focus-visible)': {
      outlineColor: 'transparent',
    },
  };
};

type GetFocusPseudoStylesOptions = {
  color?: string;
  offset?: number;
};

/**
 * this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-(
 */
export const getFocusPseudoStyles = (opts?: GetFocusPseudoStylesOptions): Styles => {
  const options: GetFocusPseudoStylesOptions = {
    color: 'currentColor',
    offset: 2,
    ...opts,
  };

  return {
    '& a::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      inset: 0,
      outline: '1px solid transparent',
      outlineOffset: `${options.offset}px`,
    },
    '& a:focus::before': {
      outlineColor: options.color,
    },
    '& a:focus:not(:focus-visible)::before': {
      outlineColor: 'transparent',
    },
  };
};

export { Breakpoint, breakpoint } from '@porsche-design-system/utilities';
export const mediaQuery = (minBreakpoint: Breakpoint): string => `@media (min-width: ${breakpoint[minBreakpoint]}px)`;

export const getBaseSlottedStyles = (): Styles => {
  return {
    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
      ...getHoverStyles(),
      ...getFocusStyles({ offset: 1 }),
    },
    '&[theme="dark"] a:hover': getHoverStyles({ theme: 'dark' })['&:hover'],
    '& b, & strong': {
      fontWeight: font.weight.bold,
    },
    '& em, & i': {
      fontStyle: 'normal',
    },
  };
};

export const getScreenReaderJssStyle = (): JssStyle => ({
  position: 'absolute',
  display: 'block',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  border: 0,
  clip: 'rect(1px,1px,1px,1px)',
  clipPath: 'inset(50%)',
});
