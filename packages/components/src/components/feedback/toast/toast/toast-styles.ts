import { addImportantToEachRule, buildHostStyles, getCss, mediaQuery, pxToRemWithUnit } from '../../../../utils';
import { TOAST_Z_INDEX } from '../../../../constants';
import { getAnimationIn, getAnimationOut, getKeyframesMobile } from '../../banner/banner-styles';
import { TOAST_ANIMATION_DURATION_VAR } from './toast-manager';
import { contentWrapperMargin } from '../../../layout/content-wrapper/content-wrapper-styles';

const toastPositionBottomVar = '--p-toast-position-bottom';
const toastPositionBottomVarInternal = '--p-toast-position-bottom-internal';
export const toastCloseClassName = 'close';

export const getComponentCss = (): string => {
  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        position: 'fixed',
        left: contentWrapperMargin,
        right: contentWrapperMargin,
        // Needs a not overwritable internal css variable to cover default position depending on viewport size and to handle animation properly.
        // In addition, a public css variable can be passed to overwrite the default position.
        [toastPositionBottomVarInternal]: `var(${toastPositionBottomVar}, ${pxToRemWithUnit(56)})`,
        bottom: `var(${toastPositionBottomVarInternal})`,
        maxWidth: '42rem',
        zIndex: TOAST_Z_INDEX,
        [mediaQuery('s')]: {
          left: pxToRemWithUnit(64),
          right: 'auto',
          [toastPositionBottomVarInternal]: `var(${toastPositionBottomVar}, ${pxToRemWithUnit(64)})`,
          bottom: `var(${toastPositionBottomVarInternal})`,
        },
      })
    ),
    hydrated: getAnimationIn(
      'in',
      ROLLUP_REPLACE_IS_STAGING !== 'production' && process.env.NODE_ENV !== 'test' && TOAST_ANIMATION_DURATION_VAR
    ),
    [toastCloseClassName]: getAnimationOut('out'),
    '@keyframes in': getKeyframesMobile('in', toastPositionBottomVarInternal),
    '@keyframes out': getKeyframesMobile('out', toastPositionBottomVarInternal),
  });
};
