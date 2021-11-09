import { addImportantToEachRule, attachComponentCss, buildHostStyles, getCss, pxToRemWithUnit } from '../../../utils';
import { ToastItemOffset } from './toast-utils';

export const getComponentCss = (offset: ToastItemOffset): string => {
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

export const addComponentCss = (host: HTMLElement, offset: ToastItemOffset): void => {
  attachComponentCss(host, getComponentCss, offset);
};
