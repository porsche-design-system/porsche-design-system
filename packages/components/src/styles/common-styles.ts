import type { JssStyle, Styles } from 'jss';
import type { Theme } from '../types';
import type { PropertiesHyphen } from 'csstype';
import { fontWeight } from '@porsche-design-system/utilities-v2';
import { getThemedColors } from './';
import { hoverMediaQuery } from './hover-media-query';

export const transitionDuration = 'var(--p-transition-duration, .24s)';
const transitionTimingFunction = 'ease';

export const getTransition = (cssProperty: keyof PropertiesHyphen): string =>
  `${cssProperty} ${transitionDuration} ${transitionTimingFunction}`;

export const pxToRemWithUnit = (px: number): string => `${px / 16}rem`;

export const addImportantToRule = (value: any): string => `${value} !important`;

export const addImportantToEachRule = (input: JssStyle): JssStyle => {
  return Object.entries(input).reduce(
    (result, [key, value]) =>
      value === null
        ? result
        : ((result[key] =
            typeof value === 'object' ? addImportantToEachRule(value as JssStyle) : addImportantToRule(value)),
          result),
    {} as JssStyle
  );
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
  value = value === 0 || value === 'auto' ? value : (`${value}px` as any);
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

export const getBaseSlottedStyles = (opts: { withDarkTheme?: boolean } = { withDarkTheme: false }): Styles => {
  return {
    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
      ...getFocusJssStyle({ offset: 1 }),
      ...hoverMediaQuery(getHoverJssStyle()),
    },
    ...(opts.withDarkTheme &&
      ({
        '&[data-theme="dark"] a:hover': hoverMediaQuery(getHoverJssStyle({ theme: 'dark' })['&:hover'] as JssStyle),
      } as Styles)),
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

/**
 * Screen reader only styles to hide (text-)contents visually in the browser but grant access for screen readers
 */
export const getScreenReaderOnlyJssStyle = (): JssStyle => {
  return {
    position: 'absolute',
    height: '1px',
    width: '1px',
    border: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(1px,1px,1px,1px)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  };
};
