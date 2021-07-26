import { breakpoint, color, font } from '@porsche-design-system/utilities';
import type { Breakpoint } from '@porsche-design-system/utilities';
import type { JssStyle, Styles } from '.';

export const transitionDuration = 'var(--p-transition-duration, .24s)';
export const transitionTimingFunction = 'ease';

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
  theme?: boolean;
};

const defaultHoverStylesOptions: GetHoverStylesOptions = {
  theme: false,
};

export const getHoverStyles = (opts?: GetHoverStylesOptions): JssStyle => {
  const options: GetHoverStylesOptions = { ...defaultHoverStylesOptions, ...opts };

  const style: JssStyle = {
    transition: `color ${transitionDuration} ${transitionTimingFunction}`,
    '&:hover': {
      color: options.theme === true ? color.darkTheme.state.hover : color.state.hover,
    },
  };

  return style;
};

type GetFocusStylesOptions = {
  color?: string;
  offset?: number;
  theme?: boolean;
};

const defaultFocusStylesOptions: GetFocusStylesOptions = {
  color: color.state.focus,
  offset: 2,
  theme: false,
};

export const getFocusStyles = (opts?: GetFocusStylesOptions): JssStyle => {
  const options: GetFocusStylesOptions = { ...defaultFocusStylesOptions, ...opts };

  const style: JssStyle = {
    outline: 'transparent solid 1px',
    outlineOffset: `${options.offset}px`,
    '&::-moz-focus-inner': {
      border: '0',
    },
    '&:focus': {
      outlineColor: options.theme === true ? color.darkTheme.state.focus : options.color,
    },
    '&:focus:not(:focus-visible)': {
      outlineColor: 'transparent',
    },
  };

  return style;
};

type GetFocusPseudoStylesOptions = {
  color?: string;
  offset?: number;
};

const defaultFocusPseudoStylesOptions: GetFocusPseudoStylesOptions = {
  color: 'currentColor',
  offset: 2,
};

/**
 * this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-(
 */
export const getFocusPseudoStyles = (opts?: GetFocusPseudoStylesOptions): Styles => {
  const options: GetFocusPseudoStylesOptions = { ...defaultFocusPseudoStylesOptions, ...opts };

  const style: Styles = {
    '& a::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
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

  return style;
};

export { Breakpoint, breakpoint } from '@porsche-design-system/utilities';
export const mediaQuery = (minBreakpoint: Breakpoint): string => `@media (min-width: ${breakpoint[minBreakpoint]}px)`;

export const getBaseSlottedStyles = (theme?: boolean): Styles => {
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
