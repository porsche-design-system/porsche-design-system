import {
  addImportantToEachRule,
  buildHostStyles,
  buildResponsiveHostStyles,
  getCss,
  mediaQuery,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../../utils';
import type { ToastOffset } from './toast-utils';
import { defaultToastOffset } from './toast-utils';
import { TOAST_Z_INDEX } from '../../../../constants';
import type { JssStyle } from 'jss';
import {
  ANIMATION_DURATION,
  easeInQuad,
  getAnimationMobileOut,
  getKeyframesMobileIn,
  getKeyframesMobileOut,
} from '../../banner/banner-styles';

const toastBottomPositionVar = '--p-toast-bottom-position';
export const toastCloseClassName = 'animate--close';

export const getComponentCss = (offsetBottom: ToastOffset = defaultToastOffset): string => {
  return getCss({
    ...addImportantToEachRule(
      mergeDeep(
        buildHostStyles({
          // use override for tests in prod build
          position:
            ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
              ? 'fixed'
              : 'var(--p-toast-position, fixed)',
          left: '7vw', // aligned with banner's content-wrapper
          right: '7vw', // aligned with banner's content-wrapper
          zIndex: TOAST_Z_INDEX,
          [mediaQuery('s')]: {
            left: pxToRemWithUnit(64), // aligned with banner's content-wrapper
            right: 'auto',
          },
        }),
        buildResponsiveHostStyles(
          offsetBottom,
          (bottom: number): JssStyle => ({
            [toastBottomPositionVar]: pxToRemWithUnit(bottom),
            bottom: pxToRemWithUnit(bottom),
          })
        )
      )
    ),
    hydrated: {
      animation: `${ANIMATION_DURATION}ms $animateMobileIn ${easeInQuad} forwards`,
    },
    [toastCloseClassName]: getAnimationMobileOut(),
    '@keyframes animateMobileIn': getKeyframesMobileIn(toastBottomPositionVar),
    '@keyframes animateMobileOut': getKeyframesMobileOut(toastBottomPositionVar),
  });
};
