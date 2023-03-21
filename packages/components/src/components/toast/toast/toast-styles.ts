import { getMediaQueryMin, gridSafeZoneBase } from '@porsche-design-system/utilities-v2';
import { getCss } from '../../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import { TOAST_Z_INDEX } from '../../../constants';
import { getAnimationIn, getAnimationOut, getKeyframesMobile } from '../../banner/banner-styles-shared';

const cssVariablePositionBottom = '--p-toast-position-bottom'; // CSS custom property exposed as public interface
const cssVariablePositionBottomInternal = '--p-internal-toast-position-bottom';
export const toastCloseClassName = 'close';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        position: 'fixed',
        left: gridSafeZoneBase,
        right: gridSafeZoneBase,
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
        ...hostHiddenStyles,
      }),
      '@keyframes in': getKeyframesMobile('in', cssVariablePositionBottomInternal),
      '@keyframes out': getKeyframesMobile('out', cssVariablePositionBottomInternal),
    },
    hydrated: getAnimationIn(
      'in',
      ROLLUP_REPLACE_IS_STAGING !== 'production' && process.env.NODE_ENV !== 'test' && '--p-animation-duration'
    ),
    [toastCloseClassName]: getAnimationOut('out'),
  });
};
