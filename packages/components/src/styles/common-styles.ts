import type { Theme } from '../types';
import type { JssStyle } from 'jss';
import type { PropertiesHyphen } from 'csstype';
import type { ThemedColors } from './';
import { getThemedColors, prefersColorSchemeDarkMediaQuery } from './';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  frostedGlassStyle,
  headingLargeStyle,
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionDurationVeryLong,
  motionEasingBase,
  motionEasingIn,
  motionEasingOut,
  spacingFluidLarge,
  spacingFluidSmall,
  spacingStaticMedium,
  themeDarkBackgroundShading,
  themeLightBackgroundShading,
} from '@porsche-design-system/utilities-v2';
import { buildResponsiveStyles, isThemeDark, mergeDeep, scrollShadowColor, scrollShadowColorDark } from '../utils';
import type * as fromMotionType from '@porsche-design-system/utilities-v2/dist/esm/motion';
import { BreakpointCustomizable } from '../types';

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
  slotted?: true | string;
  pseudo?: boolean;
};
export const getFocusJssStyle = (theme: Theme, opts?: Options): JssStyle => {
  const { offset = '2px', slotted = '', pseudo = false } = opts || {};
  const { focusColor } = getThemedColors(theme);
  const { focusColor: focusColorDark } = getThemedColors('dark');
  const slottedSelector = slotted && slotted !== true ? slotted : '';

  return {
    [`&${slotted ? '(' : ''}${slottedSelector}::-moz-focus-inner${slotted ? ')' : ''}`]: {
      border: 0, // reset ua-style (for FF)
    },
    [`&${slotted ? '(' : ''}${slottedSelector}:focus${slotted ? ')' : ''}`]: {
      outline: 0, // reset ua-style (for older browsers)
    },
    ...(pseudo && {
      [`&${slotted ? '(' : ''}${slottedSelector}:focus-visible${slotted ? ')' : ''}`]: {
        outline: 0, // reset ua-style (for modern browsers)
      },
    }),
    [`&${slotted ? '(' : ''}${slottedSelector}:focus-visible${slotted ? ')' : ''}${pseudo ? '::before' : ''}`]: {
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

export const BACKDROPS = ['blur', 'shading'] as const;
export type Backdrop = (typeof BACKDROPS)[number];

// TODO: there should be a shared style util for modal, flyout and flyout-navigation instead of having this code in the
//  main bundle. Or don't share it at all, in case same transition concept isn't ideal to be shared from an UI point of view.
/**
 * Generates JSS styles for a frosted glass background.
 * @param {boolean} isVisible - Determines if the frosted glass effect is visible.
 * @param {number} zIndex - The z-index to be used.
 * @param {Theme} theme - The theme to be used.
 * @param {string} duration - The duration of the transition animation.
 * @param {'blur' | 'shading'} backdrop - The backdrop variant.
 * @returns {JssStyle} - The JSS styles for the frosted glass backdrop.
 */
export const getBackdropJssStyle = (
  isVisible: boolean,
  zIndex: number,
  theme: Theme,
  duration: MotionDurationKey = 'long',
  backdrop: Backdrop = 'blur'
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
          ...(backdrop === 'blur' && frostedGlassStyle),
          opacity: 1,
        }
      : {
          visibility: 'hidden', // element shall not be tabbable after fade out transition has finished
          pointerEvents: 'none',
          ...(backdrop === 'blur' && {
            // TODO: is `blur(0px)` necessary at all?
            WebkitBackdropFilter: 'blur(0px)',
            backdropFilter: 'blur(0px)',
          }),
          opacity: 0,
        }),
    transition: `${getTransition('opacity', duration)}, ${getTransition('backdrop-filter', duration)}, ${getTransition(
      '-webkit-backdrop-filter',
      duration
    )}, visibility 0s linear var(${cssVariableTransitionDuration}, ${isVisible ? '0s' : motionDurationMap[duration]})`,
  };
};

export const getModalDialogBackdropResetJssStyle = (): JssStyle => {
  return {
    position: 'fixed', // ua-style
    inset: 0, // ua-style
    margin: 0, // ua-style
    padding: 0, // ua-style
    border: 0, // ua-style
    width: '100dvw', // ua-style
    height: '100dvh', // ua-style
    maxWidth: '100dvw', // ua-style
    maxHeight: '100dvh', // ua-style
    overflow: 'hidden auto', // ua-style - only y-axis shall be scrollable
  };
};

export const getModalDialogBackdropTransitionJssStyle = (
  isVisible: boolean,
  theme: Theme,
  backdrop: Backdrop = 'blur'
): JssStyle => {
  const duration: MotionDurationKey = 'long';
  const isBackdropBlur = backdrop === 'blur';
  const { backgroundShadingColor } = getThemedColors(theme);
  const { backgroundShadingColor: backgroundShadingColorDark } = getThemedColors('dark');

  return {
    zIndex: 9999999, // fallback for fade out stacking until `overlay` + `allow-discrete` is supported in all browsers. It tries to mimic #top-layer positioning hierarchy.
    visibility: 'hidden', // element shall not be tabbable with keyboard after fade out transition has finished
    pointerEvents: 'none', // element can't be interacted with mouse
    background: 'transparent',
    ...(isBackdropBlur && {
      WebkitBackdropFilter: 'blur(0px)',
      backdropFilter: 'blur(0px)',
    }),
    ...(isVisible && {
      visibility: 'inherit',
      pointerEvents: 'auto',
      background: backgroundShadingColor,
      ...(isBackdropBlur && frostedGlassStyle),
      ...prefersColorSchemeDarkMediaQuery(theme, {
        background: backgroundShadingColorDark,
      }),
    }),
    // `allow-discrete` transition for ua-style `overlay` (supported browsers only) ensures dialog is rendered on
    // #top-layer as long as fade-in or fade-out transition/animation is running
    transition: `${isVisible ? '' : `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationMap[duration]}), `}${getTransition('overlay', duration)} allow-discrete, ${getTransition('background-color', duration)}, ${getTransition(
      '-webkit-backdrop-filter',
      duration
    )}, ${getTransition('backdrop-filter', duration)}`,
    '&::backdrop': {
      display: 'none', // we can't use it atm because it's not animatable in all browsers
    },
  };
};

export const getModalDialogGridJssStyle = (): JssStyle => {
  const safeZoneStart = `${spacingFluidSmall} calc(${spacingFluidLarge} - ${spacingFluidSmall})`;
  const safeZoneEnd = `calc(${spacingFluidLarge} - ${spacingFluidSmall}) ${spacingFluidSmall}`;

  return {
    display: 'grid',
    gridTemplate: `${safeZoneStart} auto minmax(0, 1fr) auto ${safeZoneEnd}/${safeZoneStart} auto ${safeZoneEnd}`,
  };
};

export const getModalDialogTransitionJssStyle = (isVisible: boolean): JssStyle => {
  const duration = isVisible ? 'moderate' : 'short';
  const easing = isVisible ? 'in' : 'out';

  return {
    opacity: 0,
    transform: 'translateY(25%)',
    ...(isVisible && {
      opacity: 1,
      transform: 'translateY(0)',
    }),
    transition: `${getTransition('opacity', duration, easing)}, ${getTransition('transform', duration, easing)}`,
  };
};

export const getModalDialogDismissButtonJssStyle = (theme: Theme): JssStyle => {
  const { backgroundSurfaceColor } = getThemedColors(theme);
  const { backgroundSurfaceColor: backgroundSurfaceColorDark } = getThemedColors('dark');

  return {
    width: 'fit-content',
    height: 'fit-content',
    border: `2px solid ${backgroundSurfaceColor}`, // needed to enlarge button slightly without affecting the hover area (are equal now).
    borderRadius: borderRadiusSmall,
    background: backgroundSurfaceColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: backgroundSurfaceColorDark,
      borderColor: backgroundSurfaceColorDark,
    }),
  };
};

export const getModalDialogHeadingJssStyle = (): JssStyle => {
  return {
    ...headingLargeStyle,
    margin: 0,
  };
};

export const getModalDialogFooterJssStyle = (theme: Theme): JssStyle => {
  const { backgroundColor } = getThemedColors(theme);
  const { backgroundColor: backgroundColorDark } = getThemedColors('dark');

  return {
    position: 'sticky',
    bottom: '-1px', // necessary for `IntersectionObserver` to detect if sticky element is stuck or not
    marginBlock: `-${spacingStaticMedium}`,
    padding: `${spacingStaticMedium} ${spacingFluidLarge}`, // with CSS subgrid the spacingFluidLarge definition wouldn't be necessary
    background: backgroundColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: backgroundColorDark,
    }),
    clipPath: 'inset(-20px 0 0 0)', // crop leaking box-shadow on left and right side
    transition: `${getTransition('box-shadow')}`,
    '&[data-stuck]': {
      boxShadow: `${isThemeDark(theme) ? scrollShadowColorDark : scrollShadowColor} 0 -5px 10px`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        boxShadow: `${scrollShadowColorDark} 0 -5px 10px`,
      }),
    },
  };
};

export const getModalDialogStretchToFullModalWidthJssStyle = (
  hasHeader: boolean,
  hasFooter: boolean,
  fullscreen: BreakpointCustomizable<boolean>
): JssStyle => {
  const safeZone = `calc(${spacingFluidLarge} * -1)`;
  const cssClassNameStretchToFullModalWidth = 'stretch-to-full-modal-width';

  return mergeDeep(
    {
      [`&(.${cssClassNameStretchToFullModalWidth})`]: {
        display: 'block',
        margin: `0 ${safeZone}`,
        width: `calc(100% + calc(${spacingFluidLarge} * 2))`,
      },
      ...(!hasHeader && {
        [`&(.${cssClassNameStretchToFullModalWidth}:first-child)`]: {
          marginBlockStart: safeZone,
        },
      }),
      ...(!hasFooter && {
        [`&(.${cssClassNameStretchToFullModalWidth}:last-child)`]: {
          marginBlockEnd: safeZone,
        },
      }),
    },
    buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) => ({
      ...(!hasHeader && {
        [`&(.${cssClassNameStretchToFullModalWidth}:first-child)`]: {
          borderRadius: fullscreenValue ? 0 : `${borderRadiusMedium} ${borderRadiusMedium} 0 0`,
        },
      }),
      ...(!hasFooter && {
        [`&(.${cssClassNameStretchToFullModalWidth}:last-child)`]: {
          borderRadius: fullscreenValue ? 0 : `0 0 ${borderRadiusMedium} ${borderRadiusMedium}`,
        },
      }),
    }))
  );
};
