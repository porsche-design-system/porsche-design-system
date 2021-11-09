import {
  addImportantToEachRule,
  attachComponentCss,
  buildHostStyles,
  getCss,
  getThemedColors,
  pxToRemWithUnit,
} from '../../../utils';
import { TOAST_DEFAULT_TIMEOUT } from './toast-manager';
import type { ToastState } from './toast-manager';

export const getComponentCss = (state: ToastState): string => {
  const themedColors = getThemedColors('light');

  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        position: 'fixed',
        bottom: pxToRemWithUnit(8),
        left: pxToRemWithUnit(8),
      })
    ),
    root: {
      display: 'block',
      width: '20vw',
      maxWidth: '20rem',
      boxSizing: 'border-box',
      padding: '1rem',
      background: themedColors[state + 'SoftColor'],
    },
    progress: {
      animationName: '$progress',
      animationDuration: `${TOAST_DEFAULT_TIMEOUT}ms`,
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards',
      display: 'block',
      background: themedColors[state + 'Color'],
      height: '.5rem',
    },
    '@keyframes progress': {
      from: { width: '100%' },
      to: { width: 0 },
    },
  });
};

export const addComponentCss = (host: HTMLElement, state: ToastState): void => {
  attachComponentCss(host, getComponentCss, state);
};
