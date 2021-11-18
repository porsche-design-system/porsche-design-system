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
    hydrated: getAnimationIn('in'),
    [toastCloseClassName]: getAnimationOut('out'),
    '@keyframes in': getKeyframesMobile('in', toastBottomPositionVar),
    '@keyframes out': getKeyframesMobile('out', toastBottomPositionVar),
  });
};
