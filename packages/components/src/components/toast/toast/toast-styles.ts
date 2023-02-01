import { getMediaQueryMin, gridSafeZone } from '@porsche-design-system/utilities-v2';
import { getCss } from '../../../utils';
import { addImportantToEachRule } from '../../../styles';
import { TOAST_Z_INDEX } from '../../../constants';
import { getAnimationIn, getAnimationOut, getKeyframesMobile } from '../../banner/banner-styles-shared';

const toastPositionBottomVarPublic = '--p-toast-position-bottom'; // CSS custom property exposed as public interface
const toastPositionBottomVarInternal = '--p-internal-toast-position-bottom';
export const toastCloseClassName = 'close';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        position: 'fixed',
        left: gridSafeZone,
        right: gridSafeZone,
        // Needs a not overridable internal css variable to cover default position depending on viewport size and to handle animation properly.
        // In addition, a public css variable can be passed to overwrite the default position.
        [toastPositionBottomVarInternal]: `var(${toastPositionBottomVarPublic}, 56px)`,
        bottom: `var(${toastPositionBottomVarInternal})`,
        maxWidth: '42rem',
        zIndex: TOAST_Z_INDEX,
        [getMediaQueryMin('s')]: {
          left: '64px',
          right: 'auto',
          [toastPositionBottomVarInternal]: `var(${toastPositionBottomVarPublic}, 64px)`,
          bottom: `var(${toastPositionBottomVarInternal})`,
        },
      }),
      '@keyframes in': getKeyframesMobile('in', toastPositionBottomVarInternal),
      '@keyframes out': getKeyframesMobile('out', toastPositionBottomVarInternal),
    },
    hydrated: getAnimationIn(
      'in',
      ROLLUP_REPLACE_IS_STAGING !== 'production' && process.env.NODE_ENV !== 'test' && '--p-animation-duration'
    ),
    [toastCloseClassName]: getAnimationOut('out'),
  });
};
