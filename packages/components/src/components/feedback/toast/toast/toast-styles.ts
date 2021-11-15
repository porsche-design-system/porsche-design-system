import {
  addImportantToEachRule,
  attachComponentCss,
  buildHostStyles,
  getCss,
  pxToRemWithUnit,
} from '../../../../utils';
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
        bottom: pxToRemWithUnit(offset.bottom),
        left: pxToRemWithUnit(8),
        zIndex: TOAST_Z_INDEX,
      })
    )
  );
};

export const addComponentCss = (host: HTMLElement, offset: ToastOffset): void => {
  attachComponentCss(host, getComponentCss, offset);
};
