import type { JssStyle } from 'jss';
import { buildSlottedStyles, getCss } from '../../../utils';
import { addImportantToRule, breakpoint, getBaseSlottedStyles, mediaQuery, pxToRemWithUnit } from '../../../styles';
import { BANNER_Z_INDEX } from '../../../constants';

const bannerPositionTypeVar = '--p-banner-position-type';
const bannerPositionTopVar = '--p-banner-position-top';
const bannerPositionBottomVar = '--p-banner-position-bottom';
const bannerZIndexVar = '--p-banner-z-index';
const bannerAnimationDurationVar = '--p-animation-duration__banner';

const easeInQuad = 'cubic-bezier(0.45,0,0.55,1)';
const easeOutQuad = 'cubic-bezier(0.5,1,0.89,1)';
export const ANIMATION_DURATION = 600;

const mediaQueryS = mediaQuery('s');
const mediaQueryXxs = `${mediaQuery('xxs')} and (max-width: ${breakpoint.s}px)`;

export const getBoxShadow = (): JssStyle => ({
  boxShadow:
    `0 ${pxToRemWithUnit(2)} ${pxToRemWithUnit(4)} 0 rgba(0,0,0,0.05),` +
    `0 ${pxToRemWithUnit(15)} ${pxToRemWithUnit(20)} 0 rgba(0,0,0,0.2)`,
});

export const getAnimationIn = (keyframesName: string, durationVar?: string): JssStyle => {
  const duration = durationVar ? `var(${durationVar},${ANIMATION_DURATION}ms)` : `${ANIMATION_DURATION}ms`;
  return {
    animation: `${duration} $${keyframesName} ${easeInQuad} forwards`,
  };
};

export const getAnimationOut = (keyframesName: string): JssStyle => ({
  animation: addImportantToRule(`${ANIMATION_DURATION}ms $${keyframesName} ${easeOutQuad} forwards`),
});

export type KeyframesDirection = 'in' | 'out';
const getKeyframes = (direction: KeyframesDirection, outsideStyle: JssStyle): JssStyle => {
  const insideStyle: JssStyle = { opacity: 1, transform: 'translate3d(0,0,0)' };
  return direction === 'in'
    ? {
        from: outsideStyle,
        to: insideStyle,
      }
    : {
        from: insideStyle,
        to: outsideStyle,
      };
};

export const getKeyframesMobile = (direction: KeyframesDirection, bottomVar: string): JssStyle =>
  getKeyframes(direction, {
    opacity: 0,
    transform: `translate3d(0,calc(var(${bottomVar}) + 100%),0)`, // space before and after "+" is crucial
  });

const getKeyframesDesktop = (direction: KeyframesDirection, topVar: string): JssStyle =>
  getKeyframes(direction, {
    opacity: 0,
    transform: `translate3d(0,calc(-100% - var(${topVar})),0)`, // space before and after "-" is crucial
  });

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        // TODO: Why is nothing set as important here?
        [bannerPositionTopVar]: pxToRemWithUnit(56),
        [bannerPositionBottomVar]: pxToRemWithUnit(56),
        display: 'block',
        position: `var(${bannerPositionTypeVar},fixed)`,
        zIndex: `var(${bannerZIndexVar},${BANNER_Z_INDEX})`,
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
        '&(.hydrated)': {
          [mediaQueryXxs]: getAnimationIn('mobileIn', bannerAnimationDurationVar),
          [mediaQueryS]: getAnimationIn('desktopIn', bannerAnimationDurationVar),
        },
        '&(.banner--close)': {
          [mediaQueryXxs]: getAnimationOut('mobileOut'),
          [mediaQueryS]: getAnimationOut('desktopOut'),
        },
      },
      '@keyframes mobileIn': getKeyframesMobile('in', bannerPositionBottomVar),
      '@keyframes mobileOut': getKeyframesMobile('out', bannerPositionBottomVar),
      '@keyframes desktopIn': getKeyframesDesktop('in', bannerPositionTopVar),
      '@keyframes desktopOut': getKeyframesDesktop('out', bannerPositionTopVar),
    },
    root: getBoxShadow(),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles({ withDarkTheme: false })));
};
