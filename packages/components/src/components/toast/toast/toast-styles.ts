import { gridSafeZone, mediaQueryMin } from '@porsche-design-system/utilities-v2';
import { getCss } from '../../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../../styles';
import { TOAST_Z_INDEX } from '../../../constants';
import { getAnimationIn, getAnimationOut, getKeyframesMobile } from '../../banner/banner-styles';
import { TOAST_ANIMATION_DURATION_VAR } from './toast-manager';

const toastPositionBottomVarPublic = '--p-toast-position-bottom'; // CSS custom property exposed as public interface
const toastPositionBottomVarInternal = `${toastPositionBottomVarPublic}-internal`;
export const toastCloseClassName = 'close';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        position: 'fixed',
        left: gridSafeZone.base,
        right: gridSafeZone.base,
        // Needs a not overwritable internal css variable to cover default position depending on viewport size and to handle animation properly.
        // In addition, a public css variable can be passed to overwrite the default position.
        [toastPositionBottomVarInternal]: `var(${toastPositionBottomVarPublic}, ${pxToRemWithUnit(56)})`,
        bottom: `var(${toastPositionBottomVarInternal})`,
        maxWidth: '42rem',
        zIndex: TOAST_Z_INDEX,
        [mediaQueryMin('s')]: {
          left: pxToRemWithUnit(64),
          right: 'auto',
          [toastPositionBottomVarInternal]: `var(${toastPositionBottomVarPublic}, ${pxToRemWithUnit(64)})`,
          bottom: `var(${toastPositionBottomVarInternal})`,
        },
      }),
      '@keyframes in': getKeyframesMobile('in', toastPositionBottomVarInternal),
      '@keyframes out': getKeyframesMobile('out', toastPositionBottomVarInternal),
    },
    hydrated: getAnimationIn(
      'in',
      ROLLUP_REPLACE_IS_STAGING !== 'production' && process.env.NODE_ENV !== 'test' && TOAST_ANIMATION_DURATION_VAR
    ),
    [toastCloseClassName]: getAnimationOut('out'),
  });
};
