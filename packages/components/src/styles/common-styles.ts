import type { Theme } from '../types';
import type { JssStyle } from 'jss';
import type { PropertiesHyphen } from 'csstype';
import type { ThemedColors } from './';
import { spacingStaticSmall, borderWidthBase, themeLightStateFocus } from '@porsche-design-system/utilities-v2';
import { getThemedColors } from './';

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

// TODO: this is workaround, in order the colors to be bundled in the main bundle, we need to have at least one function here, which is used in project and which calls "getThemedColors"
// TODO: This mechanism needs to be investigated as part of refactoring
export const doGetThemedColors = (theme: Theme = 'light'): ThemedColors => {
  return getThemedColors(theme);
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

// reset initial styles, e.g. in case link-pure is used with slotted anchor and nested within e.g. an accordion
export const getResetInitialStylesForSlottedAnchor: JssStyle = {
  margin: 0,
  padding: 0,
  outline: 0,
  borderRadius: 0,
  background: 'transparent',
};

export const focusPseudoJssStyle: JssStyle = {
  outline: 0,
  '&:focus::before': {
    content: '""',
    position: 'absolute',
    ...getInsetJssStyle(),
    borderRadius: '1px',
    outline: `${borderWidthBase} solid ${themeLightStateFocus}`,
    outlineOffset: '2px',
  },
  '&:focus:not(:focus-visible)::before': {
    outline: 0,
  },
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
});

export const getFormCheckboxRadioHiddenJssStyle = (isHidden: boolean): JssStyle => ({
  ...getTextHiddenJssStyle(isHidden),
  width: 'auto',
  padding: `2px 0 0 ${spacingStaticSmall}`,
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

export const getBackfaceVisibilityJssStyle = (): JssStyle => ({
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
});
