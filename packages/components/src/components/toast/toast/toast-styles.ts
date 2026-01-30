import {
  getMediaQueryMin,
  gridExtendedOffsetBase,
  motionDurationModerate,
  motionEasingIn,
  motionEasingOut,
} from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import { TOAST_Z_INDEX } from '../../../constants';
import {
  addImportantToEachRule,
  addImportantToRule,
  cssVariableAnimationDuration,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getCss } from '../../../utils';

/**
 * @css-variable {"name": "--p-toast-position-bottom", "description": "Defines the spacing between the toast and the bottom edge of its container.", "defaultValue": "56px"}
 */
const cssVariablePositionBottom = '--p-toast-position-bottom'; // CSS custom property exposed as public interface
const cssVariablePositionBottomInternal = '--_p-a';

export const ANIMATION_DURATION = motionDurationModerate;
const duration =
  ROLLUP_REPLACE_IS_STAGING !== 'production' && process.env.NODE_ENV !== 'test'
    ? `var(${cssVariableAnimationDuration},${ANIMATION_DURATION})`
    : ANIMATION_DURATION;

export type KeyframesDirection = 'in' | 'out';
export const getKeyframes = (direction: KeyframesDirection, outsideStyle: JssStyle): JssStyle => {
  const insideStyle: JssStyle = { opacity: 1, transform: 'translate3d(0,0,0)' };
  return direction === 'in'
    ? {
        from: outsideStyle,
        to: insideStyle,
      }
    : {
        from: insideStyle,
        to: outsideStyle,
      };
};

export const getKeyframesMobile = (direction: KeyframesDirection, bottomVar: string): JssStyle =>
  getKeyframes(direction, {
    opacity: 0,
    transform: `translate3d(0,calc(var(${bottomVar}) + 100%),0)`, // space before and after "+" is crucial
  });

export const toastCloseClassName = 'close';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        // Needs a not overridable internal css variable to cover default position depending on viewport size and to handle animation properly.
        // In addition, a public css variable can be passed to overwrite the default position.
        [cssVariablePositionBottomInternal]: `var(${cssVariablePositionBottom}, 56px)`,
        position: 'fixed', // fallback for older browsers without native `popover` support
        inset: `auto ${gridExtendedOffsetBase} var(${cssVariablePositionBottomInternal})`,
        zIndex: TOAST_Z_INDEX, // fallback for older browsers without native `popover` support
        [getMediaQueryMin('s')]: {
          [cssVariablePositionBottomInternal]: `var(${cssVariablePositionBottom}, 64px)`,
          inset: `auto auto var(${cssVariablePositionBottomInternal}) 64px`,
          maxWidth: 'min(42rem, calc(100vw - 64px * 2))',
        },
        ...hostHiddenStyles,
      }),
      ...preventFoucOfNestedElementsStyles,
      '@keyframes in': getKeyframesMobile('in', cssVariablePositionBottomInternal),
      '@keyframes out': getKeyframesMobile('out', cssVariablePositionBottomInternal),
    },
    hydrated: {
      animation: `${duration} $in ${motionEasingIn} forwards`,
    },
    [toastCloseClassName]: {
      animation: addImportantToRule(`${ANIMATION_DURATION} $out ${motionEasingOut} forwards`),
    },
  });
};
