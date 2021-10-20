import {
  addImportantToRule,
  breakpoint,
  buildHostStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
  mediaQuery,
  pxToRemWithUnit,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import type { BannerState, Theme } from '../../../types';
import type { JssStyle } from '../../../utils';

const bannerPositionTypeVar = '--p-banner-position-type';
const bannerPositionTopVar = '--p-banner-position-top';
const bannerPositionBottomVar = '--p-banner-position-bottom';
const bannerZIndexVar = '--p-banner-z-index';
const bannerAnimationDurationVar = '--p-animation-duration__banner';

const easeInQuad = 'cubic-bezier(0.45,0,0.55,1)';
const easeOutQuad = 'cubic-bezier(0.5,1,0.89,1)';

const mediaQueryS = mediaQuery('s');
const mediaQueryXxsS = `${mediaQuery('xxs')} and (max-width: ${breakpoint.s}px)`;

export const getComponentCss = (state: BannerState, theme: Theme): string => {
  const { neutralSoftColor } = getThemedColors(theme);
  const rootBackgroundColor = // not themed
    state === 'warning'
      ? color.notification.warningSoft
      : state === 'error'
      ? color.notification.errorSoft
      : neutralSoftColor;
  const rootBeforeBackgroundColor = // not themed
    state === 'warning'
      ? color.notification.warning
      : state === 'error'
      ? color.notification.error
      : color.notification.neutral;

  const animationVisible: JssStyle = { opacity: 1, transform: 'translate3d(0,0,0)' };

  return getCss({
    ...buildHostStyles({
      [bannerPositionTypeVar]: 'fixed',
      [bannerPositionTopVar]: pxToRemWithUnit(56),
      [bannerPositionBottomVar]: pxToRemWithUnit(56),
      [bannerZIndexVar]: '99',
      display: 'block',
      position: `var(${bannerPositionTypeVar})`,
      zIndex: `var(${bannerZIndexVar})`,
      opacity: 0,
      left: 0,
      right: 0,
      willChange: 'opacity,transform',
      [mediaQueryXxsS]: {
        bottom: `var(${bannerPositionBottomVar})`,
      },
      [mediaQueryS]: {
        top: `var(${bannerPositionTopVar})`,
      },
    }),
    ':host(.hydrated)': {
      [mediaQueryXxsS]: {
        animation: `var(${bannerAnimationDurationVar},600ms) $animateMobileIn ${easeInQuad} forwards`,
      },
      [mediaQueryS]: {
        animation: `var(${bannerAnimationDurationVar},600ms) $animateDesktopIn ${easeInQuad} forwards`,
      },
    },
    ':host(.banner--close)': {
      [mediaQueryXxsS]: {
        animation: addImportantToRule(`600ms $animateMobileOut ${easeOutQuad} forwards`),
      },
      [mediaQueryS]: {
        animation: addImportantToRule(`600ms $animateDesktopOut ${easeOutQuad} forwards`),
      },
    },
    root: {
      display: 'flex',
      position: 'relative',
      padding: `${pxToRemWithUnit(16)} ${pxToRemWithUnit(16)} ${pxToRemWithUnit(16)} ${pxToRemWithUnit(20)}`,
      background: rootBackgroundColor, // not themed
      boxShadow:
        `0 ${pxToRemWithUnit(2)} ${pxToRemWithUnit(4)} 0 rgba(0,0,0,0.05),` +
        `0 ${pxToRemWithUnit(15)} ${pxToRemWithUnit(20)} 0 rgba(0,0,0,0.2)`,
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: pxToRemWithUnit(4),
        background: rootBeforeBackgroundColor, // not themed
      },
    },
    content: {
      maxWidth: pxToRemWithUnit(800),
      paddingRight: pxToRemWithUnit(48),
      // p-text for description
      '& *:nth-child(2):not(.close)': {
        marginTop: pxToRemWithUnit(8),
      },
    },
    icon: {
      display: 'none',
      [mediaQueryS]: {
        display: 'block',
        paddingRight: pxToRemWithUnit(12),
      },
    },
    close: {
      position: 'absolute',
      top: pxToRemWithUnit(16),
      right: pxToRemWithUnit(16),
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
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
