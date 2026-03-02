import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  cssVariableTransitionDuration,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  colorPrimary,
  durationSm,
  legacyRadiusSmall,
  radiusLg,
  spacingStaticSm,
  spacingStaticXs,
} from '../../styles/css-variables';
import { getSmoothMask } from '../../styles/mask';
import { getCss } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import type { ScrollerDirection, ScrollerIndicatorPosition } from './scroller-utils';

/**
 * @css-variable {"name": "--p-scroller-gap", "description": "Controls the gap between slotted nodes.", "defaultValue": "8px"}
 */
const cssVarGap = '--p-scroller-gap';

/**
 * @css-variable {"name": "--p-scroller-indicator-top", "description": "Defines the distance from the top of the viewport at which the indicator sticks when scrolling down and `indicator-sticky` is enabled.", "defaultValue": "0px"}
 */
const cssVarIndicatorTop = '--p-scroller-indicator-top';

/**
 * @css-variable {"name": "--p-scroller-indicator-bottom", "description": "Defines the distance from the bottom of the viewport at which the indicator sticks when scrolling up and `indicator-sticky` is enabled.", "defaultValue": "0px"}
 */
const cssVarIndicatorBottom = '--p-scroller-indicator-bottom';

const iconPrev = getInlineSVGBackgroundImage(
  `<path d="m8.875 12v-.001l.006-.005 5.476-6.494.768.642-4.94 5.858 4.939 5.858-.768.642-5.477-6.497z"/>`
);
const iconNext = getInlineSVGBackgroundImage(
  `<path d="m15.121 11.997-5.477-6.497-.769.642 4.94 5.858-4.94 5.858.768.642 5.476-6.494.006-.005v-.001z"/>`
);
const scrollbarWidth = '12px';
const safeZone = spacingStaticXs;

const getScrollIndicatorStyles = (
  direction: ScrollerDirection,
  indicatorPosition: ScrollerIndicatorPosition,
  isIndicatorVisible: boolean,
  isIndicatorSticky: boolean,
  hasScrollbar: boolean
): JssStyle => {
  const isPrev = direction === 'prev';
  const iconMask = `${isPrev ? iconPrev : iconNext} center/contain no-repeat`;

  return {
    gridArea: isPrev ? '1/1' : '1/3',
    zIndex: 1, // ensure that indicators are above the scroll area
    ...(isIndicatorSticky && {
      position: 'sticky',
      top: `var(${cssVarIndicatorTop},0px)`,
      bottom: `var(${cssVarIndicatorBottom},0px)`,
    }),
    ...(hasScrollbar &&
      indicatorPosition === 'center' && {
        marginTop: `calc(-1 * ${scrollbarWidth})`,
      }),
    display: 'grid',
    alignSelf: indicatorPosition === 'center' ? 'center' : 'flex-start',
    width: '1.5rem',
    height: '1.5rem',
    padding: spacingStaticXs,
    cursor: 'pointer',
    opacity: isIndicatorVisible ? 1 : 0,
    visibility: isIndicatorVisible ? 'inherit' : 'hidden',
    transform: `translate3d(${isIndicatorVisible ? '0' : `${isPrev ? `calc(-1 * ${spacingStaticSm})` : spacingStaticSm}`},0,0)`,
    transition: `${getTransition('transform')},${getTransition('opacity')},visibility 0s linear ${isIndicatorVisible ? '0s' : `var(${cssVariableTransitionDuration},${durationSm})`}`,
    '&:dir(rtl)': {
      gridArea: isPrev ? '1/3' : '1/1',
    },
    ...hoverMediaQuery({
      '&:hover::after': {
        // do the transform on the pseudo-element to prevent the click area from moving when hovered
        transform: `translate3d(${isPrev ? `calc(-1 * ${spacingStaticXs})` : spacingStaticXs},0,0)`,
      },
    }),
    '&::after': {
      content: '""',
      WebkitMask: iconMask, // necessary for Sogou browser support :-)
      mask: iconMask,
      background: colorPrimary,
      transition: getTransition('transform'),
    },
  };
};

export const getComponentCss = (
  isIndicatorPrevHidden: boolean,
  isIndicatorNextHidden: boolean,
  indicatorPosition: ScrollerIndicatorPosition,
  isIndicatorSticky: boolean,
  hasScrollbar: boolean
): string => {
  const fadeEdges =
    isIndicatorPrevHidden && isIndicatorNextHidden
      ? 'none'
      : isIndicatorPrevHidden
        ? 'right'
        : isIndicatorNextHidden
          ? 'left'
          : 'both';
  const mask = `${getSmoothMask(fadeEdges)} 0 0/auto no-repeat${hasScrollbar ? `,linear-gradient(black,black) 0 bottom/auto ${scrollbarWidth} no-repeat` : ''}`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        borderRadius: `var(${legacyRadiusSmall},${radiusLg})`, // needs to be overwritable by tabs-bar to improve focus appearance
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      slot: {
        gridArea: '1/2',
        position: 'relative', // necessary for tabs bar animation
        display: 'inline-flex',
        gap: `var(${cssVarGap},${spacingStaticSm})`,
      },
    },
    root: {
      display: 'grid',
      gridTemplateColumns: `auto minmax(0,1fr) auto`,
      alignItems: 'center',
      borderRadius: 'inherit',
      '&:has(.scroll:focus-visible)': getFocusBaseStyles(), // delegating the focus ensures mask does not cut off the focus ring
    },
    scroll: {
      gridArea: '1/1/1/-1',
      zIndex: 0, // ensure that scroll area is behind the indicators
      display: 'grid',
      gridTemplateColumns: 'repeat(3,auto)',
      margin: `calc(-1 * ${safeZone})`, // compensate padding to ensure that `:host` is aligned with other elements
      padding: `${safeZone} 0px${hasScrollbar ? ` calc(${safeZone} + ${scrollbarWidth})` : ''}`, // ensure enough space is available for focus ring of slotted elements (horizontal space is given by `.sentinel`)
      outline: 'none', // focus ring is applied to `.root`, it would be cut off by the mask if applied to `.scroll`
      overflow: 'auto hidden',
      WebkitMask: mask, // necessary for Sogou browser support :-)
      mask,
      scrollbarWidth: hasScrollbar ? 'thin' : 'none',
    },
    // as soon as `@container scroll-state(scrollable: left)` has better browser support we can get rid of sentinel and IntersectionObserver
    sentinel: {
      width: safeZone,
      visibility: 'hidden',
      '&:first-of-type:dir(rtl)': {
        gridArea: '1/3',
      },
      '&:last-of-type:dir(rtl)': {
        gridArea: '1/1',
      },
    },
    prev: getScrollIndicatorStyles('prev', indicatorPosition, !isIndicatorPrevHidden, isIndicatorSticky, hasScrollbar),
    next: getScrollIndicatorStyles('next', indicatorPosition, !isIndicatorNextHidden, isIndicatorSticky, hasScrollbar),
  });
};
