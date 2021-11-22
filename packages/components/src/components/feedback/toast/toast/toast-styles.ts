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
import { getAnimationIn, getAnimationOut, getKeyframesMobile } from '../../banner/banner-styles';
import { TOAST_ANIMATION_DURATION_VAR } from './toast-manager';

const toastBottomPositionVar = '--p-toast-bottom-position';
export const toastCloseClassName = 'close';

export const getComponentCss = (offsetBottom: ToastOffset = defaultToastOffset): string => {
  return getCss({
    ...addImportantToEachRule(
      mergeDeep(
        buildHostStyles({
          position: 'fixed',
          left: '7vw', // aligned with banner's content-wrapper
          right: '7vw', // aligned with banner's content-wrapper
          maxWidth: '42rem',
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
            bottom: `var(${toastBottomPositionVar})`,
          })
        )
      )
    ),
    hydrated: getAnimationIn(
      'in',
      ROLLUP_REPLACE_IS_STAGING !== 'production' && process.env.NODE_ENV !== 'test' && TOAST_ANIMATION_DURATION_VAR
    ),
    [toastCloseClassName]: getAnimationOut('out'),
    '@keyframes in': getKeyframesMobile('in', toastBottomPositionVar),
    '@keyframes out': getKeyframesMobile('out', toastBottomPositionVar),
  });
};
