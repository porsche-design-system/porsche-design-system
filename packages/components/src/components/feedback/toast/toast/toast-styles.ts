import {
  addImportantToEachRule,
  attachComponentCss,
  buildHostStyles,
  getCss,
  pxToRemWithUnit,
} from '../../../../utils';
import type { ToastOffset } from './toast-utils';
import { defaultToastOffset } from './toast-utils';

export const getComponentCss = (offset: ToastOffset = defaultToastOffset): string => {
  return getCss(
    buildHostStyles(
      addImportantToEachRule({
        position: 'fixed',
        bottom: pxToRemWithUnit(offset.bottom),
        left: pxToRemWithUnit(8),
      })
    )
  );
};

export const addComponentCss = (host: HTMLElement, offset: ToastOffset): void => {
  attachComponentCss(host, getComponentCss, offset);
};
