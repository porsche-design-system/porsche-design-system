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

export const getComponentCss = (offsetBottom: ToastOffset = defaultToastOffset): string => {
  return getCss(
    addImportantToEachRule(
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
            left: pxToRemWithUnit(64),
            right: 'auto',
          },
        }),
        buildResponsiveHostStyles(offsetBottom, (bottom: number): JssStyle => ({ bottom: pxToRemWithUnit(bottom) }))
      )
    )
  );
};
