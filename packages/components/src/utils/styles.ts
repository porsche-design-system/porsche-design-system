import { breakpoint, color } from '@porsche-design-system/utilities';
import type { Breakpoint } from '@porsche-design-system/utilities';
import type { JssStyle } from '.';

export const transitionDuration = 'var(--p-transition-duration, .24s)';
export const transitionTimingFunction = 'ease';

export const pxToRem = (px: number): number => px / 16;
export const pxToRemWithUnit = (px: number): string => `${pxToRem(px)}rem`;

export const addImportantToRule = (value: any): string => `${value} !important`;

export const addImportantToEachRule = (style: JssStyle, important: boolean): JssStyle => {
  if (important) {
    for (const key in style) {
      const value = style[key];
      style[key] =
        typeof value === 'object' ? addImportantToEachRule(style[key], important) : addImportantToRule(value);
    }
  }

  return style;
};

type GetHoverStylesOptions = {
  important?: boolean;
};

const defaultHoverStylesOptions: GetHoverStylesOptions = {
  important: false,
};

export const getHoverStyles = (opts?: GetHoverStylesOptions): JssStyle => {
  const { important }: GetFocusStylesOptions = { ...defaultHoverStylesOptions, ...opts };

  return addImportantToEachRule(
    {
      transition: `color ${transitionDuration} ${transitionTimingFunction}`,
      '&:hover': {
        color: `${color.state.hover}`,
      },
    },
    important
  );
};

type GetFocusStylesOptions = {
  color?: string;
  offset?: number;
  important?: boolean;
};

const defaultFocusStylesOptions: GetFocusStylesOptions = {
  color: color.state.focus,
  offset: 2,
  important: false,
};

export const getFocusStyles = (opts?: GetFocusStylesOptions): JssStyle => {
  const { offset, color, important }: GetFocusStylesOptions = { ...defaultFocusStylesOptions, ...opts };

  return addImportantToEachRule(
    {
      outline: 'transparent solid 1px',
      outlineOffset: `${offset}px`,
      '&::-moz-focus-inner': {
        border: '0',
      },
      '&:focus': {
        outlineColor: `${color}`,
      },
      '&:focus:not(:focus-visible)': {
        outlineColor: 'transparent',
      },
    },
    important
  );
};

export { Breakpoint, breakpoint } from '@porsche-design-system/utilities';
export const mediaQuery = (minBreakpoint: Breakpoint): string => `@media (min-width: ${breakpoint[minBreakpoint]}px)`;
