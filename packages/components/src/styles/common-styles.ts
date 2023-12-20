import type { Theme } from '../types';
import type { JssStyle } from 'jss';
import type { PropertiesHyphen } from 'csstype';
import type { ThemedColors } from './';
import {
  borderWidthBase,
  frostedGlassStyle,
  motionDurationModerate,
  motionDurationShort,
  motionDurationLong,
  motionDurationVeryLong,
  motionEasingBase,
  motionEasingIn,
  motionEasingOut,
  themeDarkBackgroundShading,
  themeLightBackgroundShading,
  themeLightStateFocus,
} from '@porsche-design-system/utilities-v2';
import { getThemedColors, prefersColorSchemeDarkMediaQuery } from './';
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
): string =>
  `${cssProperty} var(${cssVariableTransitionDuration}, ${motionDurationMap[duration]}) ${motionEasingMap[easing]}${
    delay ? ` var(${cssVariableTransitionDuration}, ${motionDurationMap[delay]})` : ''
  }`;

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
  outline: 0, // reset native blue outline
  borderRadius: 0,
  background: 'transparent',
};

export const focusPseudoJssStyle: JssStyle = {
  outline: 0,
  '&::before': {
    // needs to be defined always to have correct custom click area
    content: '""',
    position: 'absolute',
    ...getInsetJssStyle(),
  },
  '&:focus::before': {
    borderRadius: '1px', // TODO: why just 1px border-radius?
    outline: `${borderWidthBase} solid ${themeLightStateFocus}`,
    outlineOffset: '2px',
  },
  '&:focus:not(:focus-visible)::before': {
    outline: 0,
  },
};

/**
 * Returns a JSS style object that can be used to visually hide text in the browser, while still allowing it to be accessed by screen readers.
 * @param {boolean} isHidden - A boolean value indicating whether the text should be hidden or not. Defaults to true.
 * @param {JssStyle} isShownJssStyle - Additional styles applied when isHidden = false
 * @returns {JssStyle} - A JSS style object containing styles depending on the value of isHidden and isShownJssStyle.
 */
export const getHiddenTextJssStyle = (isHidden = true, isShownJssStyle?: JssStyle): JssStyle =>
  isHidden
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

export const getBackfaceVisibilityJssStyle = (): JssStyle => ({
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
});

/**
 * Generates JSS styles for a frosted glass background.
 * @param {boolean} isVisible - Determines if the frosted glass effect is visible.
 * @param {string} duration - The duration of the transition animation.
 * @param {Theme} theme - The theme to be used
 * @param {string} timingFn - The timing function of the transition animation. (default: 'cubic-bezier(.16,1,.3,1)')
 * @returns {JssStyle} - The JSS styles for the frosted glass background.
 */
export const getFrostedGlassBackgroundJssStyles = (
  isVisible: boolean,
  duration: MotionDurationKey,
  theme: Theme
): JssStyle => {
  return {
    // workaround via pseudo element to fix stacking (black) background in safari
    '&::before': {
      content: '""',
      position: 'fixed',
      ...getInsetJssStyle(),
      background: isThemeDark(theme) ? themeDarkBackgroundShading : themeLightBackgroundShading,
      pointerEvents: 'none',
      ...(isVisible
        ? {
            opacity: 1,
            ...frostedGlassStyle,
          }
        : {
            opacity: 0,
            backdropFilter: 'blur(0px)',
            WebkitBackdropFilter: 'blur(0px)',
          }),
      transition: `${getTransition('opacity', duration, 'base')}, ${getTransition(
        'backdrop-filter',
        duration,
        'base'
      )}, ${getTransition('-webkit-backdrop-filter', duration, 'base')}`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        background: themeDarkBackgroundShading,
      }),
    },
  };
};
