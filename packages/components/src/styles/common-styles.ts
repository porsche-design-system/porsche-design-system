import type { JssStyle, Styles } from 'jss';
import type { Theme } from '../types';
import type { PropertiesHyphen } from 'csstype';
import { fontWeight, getScreenReaderOnlyJssStyle } from '@porsche-design-system/utilities-v2';
import { getThemedColors } from './';
export { Breakpoint, breakpoint } from '@porsche-design-system/utilities-v2';

export const transitionDuration = 'var(--p-transition-duration, .24s)';
const transitionTimingFunction = 'ease';

export const getTransition = (cssProperty: keyof PropertiesHyphen): string =>
  `${cssProperty} ${transitionDuration} ${transitionTimingFunction}`;

export const pxToRem = (px: number): number => px / 16;
export const pxToRemWithUnit = (px: number): string => `${pxToRem(px)}rem`;

export const contentWrapperVars = {
  maxWidth: pxToRemWithUnit(1536),
  maxWidthExtended: pxToRemWithUnit(1920),
  margin: '7vw',
  marginXl: '10vw',
  marginXxl: pxToRemWithUnit(192),
};

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

export const getHoverJssStyle = ({ theme }: GetHoverStylesOptions = { theme: 'light' }): JssStyle => {
  return {
    transition: getTransition('color'),
    '&:hover': {
      color: getThemedColors(theme).hoverColor,
    },
  };
};

export type GetFocusStylesOptions = {
  color?: string;
  offset?: number;
  pseudo?: '::after' | '::before';
};

export const getInsetJssStyle = (value: 'auto' | number = 0): JssStyle => {
  value = value > 0 ? (`${value}px` as any) : value;
  return {
    top: value,
    left: value,
    right: value,
    bottom: value,
  };
};

export const getFocusJssStyle = (opts?: GetFocusStylesOptions): JssStyle => {
  const {
    pseudo,
    offset: outlineOffset,
    color: outlineColor,
  }: GetFocusStylesOptions = {
    color: 'currentColor',
    offset: 2,
    ...opts,
  };

  return pseudo
    ? {
        outline: 0,
        '&::-moz-focus-inner': {
          border: 0,
        },
        [`&${pseudo}`]: {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(),
          outline: '1px solid transparent',
          outlineOffset: `${outlineOffset}px`,
        },
        [`&:focus${pseudo}`]: {
          outlineColor,
        },
        [`&:focus:not(:focus-visible)${pseudo}`]: {
          outlineColor: 'transparent',
        },
      }
    : {
        outline: '1px solid transparent',
        outlineOffset: `${outlineOffset}px`,
        '&::-moz-focus-inner': {
          border: 0,
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
export const getFocusSlottedPseudoStyles = (opts?: GetFocusSlottedPseudoStylesOptions): Styles<'& a'> => {
  const { offset: outlineOffset, color: outlineColor }: GetFocusSlottedPseudoStylesOptions = {
    color: 'currentColor',
    offset: 2,
    ...opts,
  };

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
        ...getInsetJssStyle(),
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

export const getBaseSlottedStyles = (opts: { withDarkTheme?: boolean } = { withDarkTheme: true }): Styles => {
  return {
    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
      ...getHoverJssStyle(),
      ...getFocusJssStyle({ offset: 1 }),
    },
    ...(opts.withDarkTheme && {
      '&[theme="dark"] a:hover': getHoverJssStyle({ theme: 'dark' })['&:hover'],
    }),
    '& b, & strong': {
      fontWeight: fontWeight.bold,
    },
    '& em, & i': {
      fontStyle: 'normal',
    },
  };
};

export const getTextHiddenJssStyle = (isHidden: boolean): JssStyle =>
  isHidden
    ? getScreenReaderOnlyJssStyle()
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

export const getFormTextHiddenJssStyle = (isHidden: boolean): JssStyle => ({
  ...getTextHiddenJssStyle(isHidden),
  width: 'fit-content',
  padding: `0 0 ${pxToRemWithUnit(4)}`,
});

export const getFormCheckboxRadioHiddenJssStyle = (isHidden: boolean): JssStyle => ({
  ...getTextHiddenJssStyle(isHidden),
  width: 'auto',
  padding: `0 0 0 ${pxToRemWithUnit(8)}`,
});
