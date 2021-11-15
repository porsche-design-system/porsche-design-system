import {
  addImportantToRule,
  breakpoint,
  buildHostStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  mediaQuery,
  pxToRemWithUnit,
} from '../../../utils';
import type { JssStyle } from '../../../utils';
import { BANNER_Z_INDEX } from '../../../constants';

const bannerPositionTypeVar = '--p-banner-position-type';
const bannerPositionTopVar = '--p-banner-position-top';
const bannerPositionBottomVar = '--p-banner-position-bottom';
const bannerZIndexVar = '--p-banner-z-index';
const bannerAnimationDurationVar = '--p-animation-duration__banner';

const easeInQuad = 'cubic-bezier(0.45,0,0.55,1)';
const easeOutQuad = 'cubic-bezier(0.5,1,0.89,1)';

const mediaQueryS = mediaQuery('s');
const mediaQueryXxs = `${mediaQuery('xxs')} and (max-width: ${breakpoint.s}px)`;

export const getComponentCss = (): string => {
  const animationVisible: JssStyle = { opacity: 1, transform: 'translate3d(0,0,0)' };

  return getCss({
    ...buildHostStyles({
      // TODO: Why is nothing set as important here?
      [bannerPositionTypeVar]: 'fixed',
      [bannerPositionTopVar]: pxToRemWithUnit(56),
      [bannerPositionBottomVar]: pxToRemWithUnit(56),
      [bannerZIndexVar]: BANNER_Z_INDEX,
      display: 'block',
      position: `var(${bannerPositionTypeVar})`,
      zIndex: `var(${bannerZIndexVar})`,
      opacity: 0,
      left: 0,
      right: 0,
      willChange: 'opacity,transform',
      [mediaQueryXxs]: {
        bottom: `var(${bannerPositionBottomVar})`,
      },
      [mediaQueryS]: {
        top: `var(${bannerPositionTopVar})`,
      },
    }),
    ':host(.hydrated)': {
      [mediaQueryXxs]: {
        animation: `var(${bannerAnimationDurationVar},600ms) $animateMobileIn ${easeInQuad} forwards`,
      },
      [mediaQueryS]: {
        animation: `var(${bannerAnimationDurationVar},600ms) $animateDesktopIn ${easeInQuad} forwards`,
      },
    },
    ':host(.banner--close)': {
      [mediaQueryXxs]: {
        animation: addImportantToRule(`600ms $animateMobileOut ${easeOutQuad} forwards`),
      },
      [mediaQueryS]: {
        animation: addImportantToRule(`600ms $animateDesktopOut ${easeOutQuad} forwards`),
      },
    },
    root: {
      boxShadow:
        `0 ${pxToRemWithUnit(2)} ${pxToRemWithUnit(4)} 0 rgba(0,0,0,0.05),` +
        `0 ${pxToRemWithUnit(15)} ${pxToRemWithUnit(20)} 0 rgba(0,0,0,0.2)`,
    },
    '@keyframes animateMobileIn': {
      from: {
        opacity: 0,
        transform: `translate3d(0,calc(var(${bannerPositionBottomVar})+100%),0)`,
      },
      to: animationVisible,
    },
    '@keyframes animateDesktopIn': {
      from: {
        opacity: 0,
        transform: `translate3d(0,calc(-100% - var(${bannerPositionBottomVar})),0)`,
      },
      to: animationVisible,
    },
    '@keyframes animateMobileOut': {
      from: animationVisible,
      to: {
        opacity: 0,
        transform: `translate3d(0,calc(var(${bannerPositionBottomVar})+100%),0)`,
      },
    },
    '@keyframes animateDesktopOut': {
      from: animationVisible,
      to: {
        opacity: 0,
        transform: `translate3d(0,calc(-100% - var(${bannerPositionBottomVar})),0)`,
      },
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles({ withDarkTheme: false })));
};
