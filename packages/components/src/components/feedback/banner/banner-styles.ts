import {
  addImportantToRule,
  attachCss,
  breakpoint,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCachedComponentCss,
  getCss,
  insertSlottedStyles,
  mediaQuery,
} from '../../../utils';

const easeOutQuad = 'cubic-bezier(0.5, 1, 0.89, 1)';

export const getComponentCss = (): string => {
  return getCss({
    '@keyframes animateMobileOut': {
      from: {
        opacity: 1,
        transform: 'translate3d(0,0,0)',
      },
      to: {
        opacity: 0,
        transform: 'translate3d(0, calc(var(--p-banner-position-bottom) + 100%), 0)',
      },
    },
    '@keyframes animateDesktopOut': {
      from: {
        opacity: 1,
        transform: 'translate3d(0,0,0)',
      },
      to: {
        opacity: 0,
        transform: 'translate3d(0, calc(-100% - var(--p-banner-position-bottom)), 0)',
      },
    },
    ':host(.banner--close)': {
      [`${mediaQuery('xxs')} and (max-width: ${breakpoint.s}px)`]: {
        animation: addImportantToRule(`600ms $animateMobileOut ${easeOutQuad} forwards`),
      },
      [mediaQuery('s')]: {
        animation: addImportantToRule(`600ms $animateDesktopOut ${easeOutQuad} forwards`),
      },
    },
  });
};

export const addComponentCss = (host: HTMLElement): void => {
  attachCss(host, getCachedComponentCss(host, getComponentCss));
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
