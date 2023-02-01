import type { JssStyle } from 'jss';
import type { BannerWidth } from './banner-utils';
import { getMediaQueryMin, getMediaQueryMinMax } from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import { addImportantToRule } from '../../styles';
import { BANNER_Z_INDEX } from '../../constants';
import { getContentWrapperStyle } from '../content-wrapper/content-wrapper-shared-styles';

const bannerPositionTypeVar = '--p-banner-position-type';
const bannerPositionTopVar = '--p-banner-position-top';
const bannerPositionBottomVar = '--p-banner-position-bottom';
const bannerZIndexVar = '--p-internal-banner-z-index';
const bannerAnimationDurationVar = '--p-animation-duration';

const easeInQuad = 'cubic-bezier(0.45,0,0.55,1)';
const easeOutQuad = 'cubic-bezier(0.5,1,0.89,1)';
export const ANIMATION_DURATION = 600;

const mediaQueryS = getMediaQueryMin('s');
const mediaQueryBase = getMediaQueryMinMax('base', 's');

export const getBoxShadow = (): JssStyle => ({
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.05),0 15px 20px 0 rgba(0,0,0,0.2)',
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

const bannerOffset = '56px';

export const getComponentCss = (width: BannerWidth): string => {
  return getCss({
    '@global': {
      ':host': {
        // TODO: Why is nothing set as important here?
        [bannerPositionTopVar]: bannerOffset,
        [bannerPositionBottomVar]: bannerOffset,
        display: 'block',
        position: `var(${bannerPositionTypeVar},fixed)`,
        zIndex: `var(${bannerZIndexVar},${BANNER_Z_INDEX})`,
        opacity: 0,
        left: 0,
        right: 0,
        willChange: 'opacity,transform',
        ...getContentWrapperStyle(width),
        [mediaQueryBase]: {
          bottom: `var(${bannerPositionBottomVar})`,
        },
        [mediaQueryS]: {
          top: `var(${bannerPositionTopVar})`,
        },
        '&(.hydrated),&(.ssr)': {
          [mediaQueryBase]: getAnimationIn('mobileIn', bannerAnimationDurationVar),
          [mediaQueryS]: getAnimationIn('desktopIn', bannerAnimationDurationVar),
        },
        '&(.banner--close)': {
          [mediaQueryBase]: getAnimationOut('mobileOut'),
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
