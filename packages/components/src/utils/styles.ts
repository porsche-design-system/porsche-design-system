import type { Breakpoint } from '@porsche-design-system/utilities';
import { breakpoint, color, font, srOnly } from '@porsche-design-system/utilities';
import type { JssStyle, Styles } from '.';
import { isDark } from '.';
import type { Theme } from '../types';
import type { PropertiesHyphen } from 'csstype';

const transitionDuration = 'var(--p-transition-duration, .24s)';
const transitionTimingFunction = 'ease';

export const getTransition = (cssProperty: keyof PropertiesHyphen): string =>
  `${cssProperty} ${transitionDuration} ${transitionTimingFunction}`;

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
    transition: getTransition('color'),
    '&:hover': {
      color: isDark(options.theme) ? color.darkTheme.state.hover : color.state.hover,
    },
  };
};

export type GetFocusStylesOptions = {
  color?: string;
  offset?: number;
  pseudo?: '::after' | '::before';
};

export const getFocusStyles = (opts?: GetFocusStylesOptions): JssStyle => {
  const options: GetFocusStylesOptions = {
    color: color.state.focus,
    offset: 2,
    pseudo: undefined,
    ...opts,
  };

  const { pseudo, offset: outlineOffset, color: outlineColor } = options;

  return pseudo
    ? {
        outline: 'transparent none',
        '&::-moz-focus-inner': {
          border: 0,
        },
        [`&${pseudo}`]: {
          outline: 'transparent solid 1px',
          outlineOffset: `${outlineOffset}px`,
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        [`&:focus${pseudo}`]: {
          outlineColor,
        },
        [`&:focus:not(:focus-visible)${pseudo}`]: {
          outlineColor: 'transparent',
        },
      }
    : {
        outline: 'transparent solid 1px',
        outlineOffset: `${outlineOffset}px`,
        '&::-moz-focus-inner': {
          border: '0',
        },
        '&:focus': {
          outlineColor,
        },
        '&:focus:not(:focus-visible)': {
          outlineColor: 'transparent',
        },
      };
};

export type GetFocusSlottedPseudoStylesOptions = {
  color?: string;
  offset?: number;
};

/**
 * this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-(
 */
export const getFocusSlottedPseudoStyles = (opts?: GetFocusSlottedPseudoStylesOptions): Styles => {
  const options: GetFocusSlottedPseudoStylesOptions = {
    color: color.state.focus,
    offset: 2,
    ...opts,
  };

  const { offset: outlineOffset, color: outlineColor } = options;

  return {
    '& a': {
      display: 'block',
      position: 'static',
      textDecoration: 'none',
      font: 'inherit',
      color: 'inherit',
      outline: 'transparent none',
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        outline: '1px solid transparent',
        outlineOffset: `${outlineOffset}px`,
      },
      '&:focus::before': {
        outlineColor,
      },
      '&:focus:not(:focus-visible)::before': {
        outlineColor: 'transparent',
      },
    },
  };
};

export { Breakpoint, breakpoint } from '@porsche-design-system/utilities';
export const mediaQuery = (minBreakpoint: Breakpoint): string => `@media (min-width: ${breakpoint[minBreakpoint]}px)`;

export const getBaseSlottedStyles = (opts: { withDarkTheme?: boolean } = { withDarkTheme: true }): Styles => {
  return {
    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
      ...getHoverStyles(),
      ...getFocusStyles({ offset: 1 }),
    },
    ...(opts.withDarkTheme && {
      '&[theme="dark"] a:hover': getHoverStyles({ theme: 'dark' })['&:hover'],
    }),
    '& b, & strong': {
      fontWeight: font.weight.bold,
    },
    '& em, & i': {
      fontStyle: 'normal',
    },
  };
};

export const getTextHiddenJssStyle = (isHidden: boolean): JssStyle =>
  isHidden
    ? (srOnly() as JssStyle)
    : {
        position: 'static',
        width: 'auto',
        height: 'auto',
        margin: 0,
        overflow: 'visible',
        clip: 'auto',
        clipPath: 'none',
        whiteSpace: 'normal',
      };

export const getFormTextHiddenJssStyle = (isHidden: boolean, isCheckboxOrRadio?: boolean): JssStyle => ({
  ...getTextHiddenJssStyle(isHidden),
  width: isCheckboxOrRadio ? 'auto' : 'fit-content',
  padding: isCheckboxOrRadio ? `0 0 0 ${pxToRemWithUnit(8)}` : `0 0 ${pxToRemWithUnit(4)} 0`,
});
