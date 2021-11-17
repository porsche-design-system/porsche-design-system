import { addImportantToEachRule, buildHostStyles, getCss, mediaQuery, pxToRemWithUnit } from '../../../../utils';
import type { ToastOffset } from './toast-utils';
import { defaultToastOffset } from './toast-utils';
import { TOAST_Z_INDEX } from '../../../../constants';

export const getComponentCss = (offset: ToastOffset = defaultToastOffset): string => {
  return getCss(
    buildHostStyles(
      addImportantToEachRule({
        // use override for tests in prod build
        position:
          ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
            ? 'fixed'
            : 'var(--p-toast-position, fixed)',
        left: '7vw', // aligned with banner's content-wrapper
        right: '7vw', // aligned with banner's content-wrapper
        bottom: pxToRemWithUnit(56), // aligned with banner's content-wrapper
        zIndex: TOAST_Z_INDEX,
        [mediaQuery('s')]: {
          left: pxToRemWithUnit(64),
          right: 'auto',
          bottom: pxToRemWithUnit(offset.bottom),
        },
      })
    )
  );
};
