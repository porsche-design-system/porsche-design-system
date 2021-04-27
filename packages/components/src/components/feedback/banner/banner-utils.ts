import { attachCss, breakpoint, buildHostStyles, getCss, mediaQuery, pxToRem } from '../../../utils';

const baseCss: string = getCss({});

export const getMediaQueryStyles = (): string =>
  getCss({
    '@keyframes animateMobileOut': {
      from: {
        bottom: pxToRem(56),
        opacity: 1,
      },
      to: {
        bottom: '-100%',
        opacity: 0,
      },
    },
    '@keyframes animateDesktopOut': {
      from: {
        top: pxToRem(56),
        opacity: 1,
      },
      to: {
        top: '-100%',
        opacity: 0,
      },
    },
    ...buildHostStyles({
      position: 'fixed',
      zIndex: 99,
      width: '100%',

      [`${mediaQuery('xxs')} and (max-width: ${breakpoint.s}px)`]: {
        bottom: '-100%',
        willChange: 'opacity, bottom',
        animation: '600ms 0s $animateMobileOut cubic-bezier(0.5, 1, 0.89, 1) forwards !important',
      },
      [mediaQuery('s')]: {
        top: '-100%',
        willChange: 'opacity, top',
        animation: '600ms 0s $animateDesktopOut cubic-bezier(0.5, 1, 0.89, 1) forwards !important',
      },
    }),
  });

export const addCss = (host: HTMLElement): void => {
  attachCss(host, baseCss + getMediaQueryStyles());
};
