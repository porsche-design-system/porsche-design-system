import {
  borderWidthBase,
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionDurationVeryLong,
  motionEasingBase,
  motionEasingIn,
  motionEasingOut,
} from '@porsche-design-system/emotion';
import type * as fromMotionType from '@porsche-design-system/emotion/dist/esm/motion';
import type { PropertiesHyphen } from 'csstype';
import type { JssStyle } from 'jss';
import { alphaDisabled } from './alpha-disabled';
import { colors } from './colors';
import { forcedColorsMediaQuery } from './media-query/forced-colors-media-query';

type WithoutMotionDurationPrefix<T> = T extends `motionDuration${infer P}` ? Uncapitalize<P> : never;
export type MotionDurationKey = WithoutMotionDurationPrefix<keyof typeof fromMotionType>;
type WithoutMotionEasingPrefix<T> = T extends `motionEasing${infer P}` ? Uncapitalize<P> : never;
export type MotionEasingKey = WithoutMotionEasingPrefix<keyof typeof fromMotionType>;

export const motionDurationMap: Record<MotionDurationKey, string> = {
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

export const dismissButtonJssStyle: JssStyle = {
  '--p-internal-button-scaling': 0.5,
};

export const cssVariableTransitionDuration = '--p-transition-duration';
export const cssVariableAnimationDuration = '--p-animation-duration';

export const getAnimation = (
  name: string,
  duration: MotionDurationKey = 'short',
  easing: keyof typeof motionEasingMap = 'base'
): string => {
  return `${name} var(${cssVariableAnimationDuration}, ${motionDurationMap[duration]}) ${motionEasingMap[easing]}`;
};

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
        : // @ts-expect-error: Type string can't be used to index type JssStyle
          ((result[key] =
            // biome-ignore lint/complexity/noCommaOperator: to be refactored
            typeof value === 'object' ? addImportantToEachRule(value as JssStyle) : addImportantToRule(value)),
          result),
    {} as JssStyle
  );
};

const { focusColor } = colors;

export const getFocusBaseStyles = () => {
  return {
    outline: `${borderWidthBase} solid ${focusColor}`,
    outlineOffset: '2px',
    ...forcedColorsMediaQuery({
      outlineColor: 'Highlight',
    }),
  } as const;
};

export const getDisabledBaseStyles = () => {
  return {
    opacity: alphaDisabled,
    ...forcedColorsMediaQuery({
      opacity: 1,
      color: 'GrayText',
    }),
  } as const;
};

/**
 * Returns a JSS style object that can be used to visually hide text in the browser, while still allowing it to be accessed by screen readers.
 * @param {boolean} isHidden - A boolean value indicating whether the text should be hidden or not. Defaults to true.
 * @param {JssStyle} isShownJssStyle - Additional styles applied when isHidden = false
 * @returns {JssStyle} - A JSS style object containing styles depending on the value of isHidden and isShownJssStyle.
 */
export const getHiddenTextJssStyle = (isHidden: boolean = true, isShownJssStyle?: JssStyle): JssStyle => {
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
