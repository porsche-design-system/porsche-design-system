import type { Theme } from '../types';
import type { JssStyle } from 'jss';
import type { PropertiesHyphen } from 'csstype';
import type { ThemedColors } from './';
import { getThemedColors, prefersColorSchemeDarkMediaQuery } from './';
import {
  borderWidthBase,
  frostedGlassStyle,
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionDurationVeryLong,
  motionEasingBase,
  motionEasingIn,
  motionEasingOut,
  themeDarkBackgroundShading,
  themeLightBackgroundShading,
} from '@porsche-design-system/utilities-v2';
import { isThemeDark } from '../utils';
import type * as fromMotionType from '@porsche-design-system/utilities-v2/dist/esm/motion';

type WithoutMotionDurationPrefix<T> = T extends `motionDuration${infer P}` ? Uncapitalize<P> : never;
export type MotionDurationKey = WithoutMotionDurationPrefix<keyof typeof fromMotionType>;
type WithoutMotionEasingPrefix<T> = T extends `motionEasing${infer P}` ? Uncapitalize<P> : never;
export type MotionEasingKey = WithoutMotionEasingPrefix<keyof typeof fromMotionType>;

const motionDurationMap: Record<MotionDurationKey, string> = {
  short: motionDurationShort,
  moderate: motionDurationModerate,
  long: motionDurationLong,
  veryLong: motionDurationVeryLong,
};

export const motionEasingMap: Record<MotionEasingKey | 'linear', string> = {
  base: motionEasingBase,
  in: motionEasingIn,
  out: motionEasingOut,
  linear: 'linear',
};

export const cssVariableTransitionDuration = '--p-transition-duration';
export const cssVariableAnimationDuration = '--p-animation-duration';

export const getTransition = (
  cssProperty: keyof PropertiesHyphen,
  duration: MotionDurationKey = 'short',
  easing: keyof typeof motionEasingMap = 'base',
  delay?: MotionDurationKey
): string => {
  return `${cssProperty} var(${cssVariableTransitionDuration}, ${motionDurationMap[duration]}) ${
    motionEasingMap[easing]
  }${delay ? ` var(${cssVariableTransitionDuration}, ${motionDurationMap[delay]})` : ''}`;
};

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

type Options = {
  offset?: string | 0;
  slotted?: boolean;
  pseudo?: boolean;
  prefix?: string;
  suffix?: string;
};
export const getFocusJssStyle = (theme: Theme, opts?: Options): JssStyle => {
  const { offset = '2px', slotted = false, pseudo = false, prefix = '', suffix = '' } = opts || {};
  const { focusColor } = getThemedColors(theme);
  const { focusColor: focusColorDark } = getThemedColors('dark');

  return {
    // TODO: re-think if outline reset is a good thing to abstract into a shared function.
    outline: 0, // prevents :focus style
    [`&${slotted ? '(' : ''}${prefix}${prefix}${suffix}::-moz-focus-inner${slotted ? ')' : ''}`]: {
      border: 0,
    },
    [`&${slotted ? '(' : ''}${prefix}:focus-visible${suffix}${slotted ? ')' : ''}${pseudo ? '::before' : ''}`]: {
      outline: `${borderWidthBase} solid ${focusColor}`,
      outlineOffset: offset,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        outlineColor: focusColorDark,
      }),
    },
  };
};

// reset initial styles, e.g. in case link-pure is used with slotted anchor and nested within e.g. an accordion
export const getResetInitialStylesForSlottedAnchor: JssStyle = {
  margin: 0,
  padding: 0,
  outline: 0, // reset native blue outline
  borderRadius: 0,
  background: 'transparent',
};

/**
 * Returns a JSS style object that can be used to visually hide text in the browser, while still allowing it to be accessed by screen readers.
 * @param {boolean} isHidden - A boolean value indicating whether the text should be hidden or not. Defaults to true.
 * @param {JssStyle} isShownJssStyle - Additional styles applied when isHidden = false
 * @returns {JssStyle} - A JSS style object containing styles depending on the value of isHidden and isShownJssStyle.
 */
export const getHiddenTextJssStyle = (isHidden = true, isShownJssStyle?: JssStyle): JssStyle => {
  return isHidden
    ? {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
      }
    : {
        position: 'static',
        width: 'auto',
        height: 'auto',
        padding: 0,
        margin: 0,
        overflow: 'visible',
        clip: 'auto',
        whiteSpace: 'normal',
        ...isShownJssStyle,
      };
};

// TODO: there should be a shared style util for modal, flyout and flyout-navigation instead of having this code in the
//  main bundle. Or don't share it at all, in case same transition concept isn't ideal to be shared from an UI point of view.
/**
 * Generates JSS styles for a frosted glass background.
 * @param {boolean} isVisible - Determines if the frosted glass effect is visible.
 * @param {number} zIndex - The z-index to be used.
 * @param {Theme} theme - The theme to be used.
 * @param {string} duration - The duration of the transition animation.
 * @returns {JssStyle} - The JSS styles for the frosted glass backdrop.
 */
export const getBackdropJssStyle = (
  isVisible: boolean,
  zIndex: number,
  theme: Theme,
  duration: MotionDurationKey = 'long'
): JssStyle => {
  return {
    position: 'fixed',
    inset: 0,
    zIndex,
    // TODO: background shading is missing in getThemedColors(theme).backgroundShading
    background: isThemeDark(theme) ? themeDarkBackgroundShading : themeLightBackgroundShading,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: themeDarkBackgroundShading,
    }),
    ...(isVisible
      ? {
          visibility: 'inherit',
          pointerEvents: 'auto',
          ...frostedGlassStyle,
          opacity: 1,
        }
      : {
          visibility: 'hidden', // element shall not be tabbable after fade out transition has finished
          pointerEvents: 'none',
          WebkitBackdropFilter: 'blur(0px)',
          backdropFilter: 'blur(0px)',
          opacity: 0,
        }),
    transition: `${getTransition('opacity', duration)}, ${getTransition('backdrop-filter', duration)}, ${getTransition(
      '-webkit-backdrop-filter',
      duration
    )}, visibility 0s linear var(${cssVariableTransitionDuration}, ${isVisible ? '0s' : motionDurationMap[duration]})`,
  };
};
