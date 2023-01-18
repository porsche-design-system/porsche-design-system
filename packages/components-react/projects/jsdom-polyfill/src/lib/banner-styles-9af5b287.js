'use strict';

const validateProps = require('./validateProps-3b506a0d.js');
const constants = require('./constants-6ecb3cbb.js');

function getMediaQueryMinMax(min, max) {
    return `@media(min-width:${validateProps.breakpoint[min]}) and (max-width:${validateProps.breakpoint[max].slice(0, -2) - 1}px)`;
}

const bannerPositionTypeVar = '--p-banner-position-type';
const bannerPositionTopVar = '--p-banner-position-top';
const bannerPositionBottomVar = '--p-banner-position-bottom';
const bannerZIndexVar = '--p-banner-z-index';
const bannerAnimationDurationVar = '--p-animation-duration__banner';
const easeInQuad = 'cubic-bezier(0.45,0,0.55,1)';
const easeOutQuad = 'cubic-bezier(0.5,1,0.89,1)';
const ANIMATION_DURATION = 600;
const mediaQueryS = validateProps.getMediaQueryMin('s');
const mediaQueryBase = getMediaQueryMinMax('base', 's');
const getBoxShadow = () => ({
  boxShadow: `0 ${validateProps.pxToRemWithUnit(2)} ${validateProps.pxToRemWithUnit(4)} 0 rgba(0,0,0,0.05),` +
    `0 ${validateProps.pxToRemWithUnit(15)} ${validateProps.pxToRemWithUnit(20)} 0 rgba(0,0,0,0.2)`,
});
const getAnimationIn = (keyframesName, durationVar) => {
  const duration = durationVar ? `var(${durationVar},${ANIMATION_DURATION}ms)` : `${ANIMATION_DURATION}ms`;
  return {
    animation: `${duration} $${keyframesName} ${easeInQuad} forwards`,
  };
};
const getAnimationOut = (keyframesName) => ({
  animation: validateProps.addImportantToRule(`${ANIMATION_DURATION}ms $${keyframesName} ${easeOutQuad} forwards`),
});
const getKeyframes = (direction, outsideStyle) => {
  const insideStyle = { opacity: 1, transform: 'translate3d(0,0,0)' };
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
const getKeyframesMobile = (direction, bottomVar) => getKeyframes(direction, {
  opacity: 0,
  transform: `translate3d(0,calc(var(${bottomVar}) + 100%),0)`, // space before and after "+" is crucial
});
const getKeyframesDesktop = (direction, topVar) => getKeyframes(direction, {
  opacity: 0,
  transform: `translate3d(0,calc(-100% - var(${topVar})),0)`, // space before and after "-" is crucial
});
const getComponentCss = () => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        // TODO: Why is nothing set as important here?
        [bannerPositionTopVar]: validateProps.pxToRemWithUnit(56),
        [bannerPositionBottomVar]: validateProps.pxToRemWithUnit(56),
        display: 'block',
        position: `var(${bannerPositionTypeVar},fixed)`,
        zIndex: `var(${bannerZIndexVar},${constants.BANNER_Z_INDEX})`,
        opacity: 0,
        left: 0,
        right: 0,
        willChange: 'opacity,transform',
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
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, validateProps.getBaseSlottedStyles()));
};

exports.ANIMATION_DURATION = ANIMATION_DURATION;
exports.getAnimationIn = getAnimationIn;
exports.getAnimationOut = getAnimationOut;
exports.getBoxShadow = getBoxShadow;
exports.getComponentCss = getComponentCss;
exports.getKeyframesMobile = getKeyframesMobile;
exports.getSlottedCss = getSlottedCss;
