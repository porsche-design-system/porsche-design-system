import type { JssStyle } from 'jss';
import {
  getMediaQueryMin,
  gridExtendedOffsetBase,
  motionDurationModerate,
  motionEasingIn,
  motionEasingOut,
} from '@porsche-design-system/utilities-v2';
import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  colorSchemeStyles,
  cssVariableAnimationDuration,
  hostHiddenStyles,
} from '../../../styles';
import { TOAST_Z_INDEX } from '../../../constants';

const cssVariablePositionBottom = '--p-toast-position-bottom'; // CSS custom property exposed as public interface
const cssVariablePositionBottomInternal = '--p-internal-toast-position-bottom';

const duration =
  ROLLUP_REPLACE_IS_STAGING !== 'production' && process.env.NODE_ENV !== 'test'
    ? `var(${cssVariableAnimationDuration},${motionDurationModerate})`
    : motionDurationModerate;

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

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        position: 'fixed',
        left: gridExtendedOffsetBase,
        right: gridExtendedOffsetBase,
        // Needs a not overridable internal css variable to cover default position depending on viewport size and to handle animation properly.
        // In addition, a public css variable can be passed to overwrite the default position.
        [cssVariablePositionBottomInternal]: `var(${cssVariablePositionBottom}, 56px)`,
        bottom: `var(${cssVariablePositionBottomInternal})`,
        maxWidth: '42rem',
        zIndex: TOAST_Z_INDEX,
        [getMediaQueryMin('s')]: {
          left: '64px',
          right: 'auto',
          [cssVariablePositionBottomInternal]: `var(${cssVariablePositionBottom}, 64px)`,
          bottom: `var(${cssVariablePositionBottomInternal})`,
        },
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      }),
      '@keyframes in': getKeyframesMobile('in', cssVariablePositionBottomInternal),
      '@keyframes out': getKeyframesMobile('out', cssVariablePositionBottomInternal),
    },
    hydrated: {
      animation: `${duration} $in ${motionEasingIn} forwards`,
    },
    [toastCloseClassName]: {
      animation: addImportantToRule(`${duration} $out ${motionEasingOut} forwards`),
    },
  });
};
