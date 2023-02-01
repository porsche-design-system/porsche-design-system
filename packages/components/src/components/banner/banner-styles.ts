import type { JssStyle } from 'jss';
import type { BannerWidth } from './banner-utils';
import type { KeyframesDirection } from './banner-styles-shared';
import { getMediaQueryMin, getMediaQueryMinMax } from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import { BANNER_Z_INDEX } from '../../constants';
import { getContentWrapperStyle } from '../content-wrapper/content-wrapper-styles-shared';
import {
  getAnimationIn,
  getAnimationOut,
  getBoxShadow,
  getKeyframes,
  getKeyframesMobile,
} from './banner-styles-shared';

const bannerPositionTypeVar = '--p-banner-position-type';
const bannerPositionTopVar = '--p-banner-position-top';
const bannerPositionBottomVar = '--p-banner-position-bottom';
const bannerZIndexVar = '--p-internal-banner-z-index';
const bannerAnimationDurationVar = '--p-animation-duration';

const bannerOffset = '56px';

const mediaQueryBase = getMediaQueryMinMax('base', 's');
const mediaQueryS = getMediaQueryMin('s');

const getKeyframesDesktop = (direction: KeyframesDirection, topVar: string): JssStyle =>
  getKeyframes(direction, {
    opacity: 0,
    transform: `translate3d(0,calc(-100% - var(${topVar})),0)`, // space before and after "-" is crucial
  });

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
