import {
  addImportantToEachRule,
  attachComponentCss,
  buildHostStyles,
  getCss,
  getThemedColors,
  pxToRemWithUnit,
} from '../../../../utils';
import type { ToastOffset } from './toast-utils';
import { TOAST_DEFAULT_TIMEOUT } from './toast-manager';

export const getComponentCss = (offset: ToastOffset): string => {
  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        position: 'fixed',
        bottom: pxToRemWithUnit(offset.bottom),
        left: pxToRemWithUnit(8),
      })
    ),
    progress: {
      animationName: '$progress',
      animationDuration: `${TOAST_DEFAULT_TIMEOUT}ms`,
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards',
      display: 'block',
      background: 'hotpink',
      height: '.5rem',
    },
    '@keyframes progress': {
      from: { width: '100%' },
      to: { width: 0 },
    },
  });
};

export const addComponentCss = (host: HTMLElement, offset: ToastOffset): void => {
  attachComponentCss(host, getComponentCss, offset);
};
