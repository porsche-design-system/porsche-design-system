import type * as fromMotionType from '@porsche-design-system/emotion';
import {
  colorFocus,
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
  ref,
} from '@porsche-design-system/stylesheets';
import type { PropertiesHyphen } from 'csstype';
import type { CssStyle } from '../utils/css-serializer';
import { alphaDisabled } from './alpha-disabled';
import { forcedColorsMediaQuery } from './media-query/forced-colors-media-query';

type WithoutMotionDurationPrefix<T> = T extends `motionDuration${infer P}` ? Uncapitalize<P> : never;
export type MotionDurationKey = WithoutMotionDurationPrefix<keyof typeof fromMotionType>;
type WithoutMotionEasingPrefix<T> = T extends `motionEasing${infer P}` ? Uncapitalize<P> : never;
export type MotionEasingKey = WithoutMotionEasingPrefix<keyof typeof fromMotionType>;

export const motionDurationMap: Record<MotionDurationKey, string> = {
  short: ref(durationSm),
  moderate: ref(durationMd),
  long: ref(durationLg),
  veryLong: ref(durationXl),
};

export const motionEasingMap: Record<MotionEasingKey | 'linear', string> = {
  base: ref(easeInOut),
  in: ref(easeIn),
  out: ref(easeOut),
  linear: 'linear',
};

/**
 * Base value used for spacing calculations
 *
 * This constant defines the base value of 16 pixels, which serves as a
 * standard unit for calculating relative sizes. By multiplying this base
 * value with scaling factors and proportions, you can derive consistent
 * and proportional dimensions and spacings throughout the design.
 *
 * Example:
 * const spacing = scalingFactor * proportion * SCALING_BASE_VALUE;
 */
export const SCALING_BASE_VALUE = '16px';

export const dismissButtonCssStyle: CssStyle = {
  '--_p-button-a': 0.5,
};

export const cssVariableTransitionDuration = '--p-transition-duration';
export const cssVariableAnimationDuration = '--p-animation-duration';

export const getAnimation = (
  name: string,
  duration: MotionDurationKey = 'short',
  easing: keyof typeof motionEasingMap = 'base'
): string => {
  return `${name} ${ref(cssVariableAnimationDuration, motionDurationMap[duration])} ${motionEasingMap[easing]}`;
};

export const getTransition = (
  cssProperty: keyof PropertiesHyphen,
  duration: MotionDurationKey = 'short',
  easing: keyof typeof motionEasingMap = 'base',
  delay?: MotionDurationKey
): string => {
  return `${cssProperty} ${ref(cssVariableTransitionDuration, motionDurationMap[duration])} ${
    motionEasingMap[easing]
  }${delay ? ` ${ref(cssVariableTransitionDuration, motionDurationMap[delay])}` : ''}`;
};

export const addImportantToRule = (value: any): string => `${value} !important`;

export const addImportantToEachRule = (input: CssStyle): CssStyle => {
  return Object.entries(input).reduce(
    (result, [key, value]) =>
      value === null
        ? result
        : ((result[key] =
            // biome-ignore lint/complexity/noCommaOperator: to be refactored
            typeof value === 'object' ? addImportantToEachRule(value as CssStyle) : addImportantToRule(value)),
          result),
    {} as CssStyle
  );
};

export const getFocusBaseStyles = (offset: number = 2) => {
  return {
    outline: `2px solid ${ref(colorFocus)}`,
    outlineOffset: `${offset}px`,
    ...forcedColorsMediaQuery({
      outlineColor: 'Highlight',
    }),
  } as const;
};

export const getDisabledBaseStyles = (addForcedColorsDisabledStyles?: CssStyle) => {
  return {
    opacity: alphaDisabled,
    ...forcedColorsMediaQuery({
      opacity: 1,
      color: 'GrayText',
      ...addForcedColorsDisabledStyles,
    }),
  } as const;
};

/**
 * Returns a JSS style object that can be used to visually hide text in the browser, while still allowing it to be accessed by screen readers.
 * @param {boolean} isHidden - A boolean value indicating whether the text should be hidden or not. Defaults to true.
 * @param {CssStyle} isShownCssStyle - Additional styles applied when isHidden = false
 * @returns {CssStyle} - A JSS style object containing styles depending on the value of isHidden and isShownCssStyle.
 */
export const getHiddenTextCssStyle = (isHidden: boolean = true, isShownCssStyle?: CssStyle): CssStyle => {
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
        ...isShownCssStyle,
      };
};
