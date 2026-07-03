import type { JssStyle } from '../../utils/emotionCss';
import {
  addImportantToEachRule,
  cssVariableTransitionDuration,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  pointerCoarseMediaQuery,
} from '../../styles';
import { colorPrimary, durationSm, radiusLg, ref, spacingStaticSm, spacingStaticXs } from '@porsche-design-system/stylesheets';
import { getSmoothMask } from '../../styles/mask';
import { getCss } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import type { ScrollerDirection } from './scroller-utils';

/**
 * @css-variable {"name": "--p-scroller-gap", "description": "Defines the gap between slotted nodes.", "defaultValue": "8px"}
 */
const cssVarGap = '--p-scroller-gap';

/**
 * @css-variable {"name": "--p-scroller-indicator-top", "description": "Defines the distance from the top of the viewport at which the indicator sticks when scrolling down and `sticky` is enabled.", "defaultValue": "0px"}
 */
const cssVarIndicatorTop = '--p-scroller-indicator-top';

/**
 * @css-variable {"name": "--p-scroller-indicator-bottom", "description": "Defines the distance from the bottom of the viewport at which the indicator sticks when scrolling up and `sticky` is enabled.", "defaultValue": "0px"}
 */
const cssVarIndicatorBottom = '--p-scroller-indicator-bottom';

// internal css variables
const cssVarFocusRingRadius = '--_p-scroller-focus-ring-radius';

const iconPrev = getInlineSVGBackgroundImage(
  `<path d="m8.875 12v-.001l.006-.005 5.476-6.494.768.642-4.94 5.858 4.939 5.858-.768.642-5.477-6.497z"/>`
);
const iconNext = getInlineSVGBackgroundImage(
  `<path d="m15.121 11.997-5.477-6.497-.769.642 4.94 5.858-4.94 5.858.768.642 5.476-6.494.006-.005v-.001z"/>`
);
const scrollbarWidth = '12px';
const safeZone = '4px';

const getScrollIndicatorStyles = (
  direction: ScrollerDirection,
  isVisible: boolean,
  isSticky: boolean,
  hasScrollbar: boolean,
  isCompact: boolean
): JssStyle => {
  const isPrev = direction === 'prev';
  const iconMask = `${isPrev ? iconPrev : iconNext} center/contain no-repeat`;

  return {
    gridArea: isPrev ? '1/1' : '1/3',
    zIndex: 1, // ensure that indicators are above the scroll area
    ...(isSticky && {
      position: 'sticky',
      top: ref(cssVarIndicatorTop, '0px'),
      bottom: ref(cssVarIndicatorBottom, '0px'),
    }),
    ...(hasScrollbar && {
      marginTop: `calc(-1 * ${scrollbarWidth})`,
    }),
    ...(hasScrollbar &&
      pointerCoarseMediaQuery({
        marginTop: 0,
      })),
    display: 'grid',
    alignSelf: 'center',
    width: '1.5rem',
    height: '1.5rem',
    ...(!isCompact && {
      padding: ref(spacingStaticXs),
    }),
    cursor: 'pointer',
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'inherit' : 'hidden',
    transform: `translate3d(${isVisible ? '0' : `${isPrev ? `calc(-1 * ${ref(spacingStaticSm)})` : ref(spacingStaticSm)}`},0,0)`,
    transition: `${getTransition('transform')},${getTransition('opacity')},visibility 0s linear ${isVisible ? '0s' : ref(cssVariableTransitionDuration, ref(durationSm))}`,
    '&:dir(rtl)': {
      gridArea: isPrev ? '1/3' : '1/1',
    },
    ...hoverMediaQuery({
      '&:hover::after': {
        // do the transform on the pseudo-element to prevent the click area from moving when hovered
        transform: `translate3d(${isPrev ? `calc(-1 * ${ref(spacingStaticXs)})` : ref(spacingStaticXs)},0,0)`,
      },
    }),
    '&::after': {
      content: '""',
      WebkitMask: iconMask, // necessary for Sogou browser support :-)
      mask: iconMask,
      background: ref(colorPrimary),
      transition: getTransition('transform'),
      ...forcedColorsMediaQuery({
        background: 'CanvasText',
      }),
    },
  };
};

export const getComponentCss = (
  isIndicatorPrevVisible: boolean | undefined, // can be undefined in ssr context
  isIndicatorNextVisible: boolean | undefined, // can be undefined in ssr context
  isSticky: boolean,
  hasScrollbar: boolean,
  isCompact: boolean
): string => {
  const fadeEdges =
    !isIndicatorPrevVisible && !isIndicatorNextVisible
      ? 'none'
      : !isIndicatorPrevVisible
        ? 'right'
        : !isIndicatorNextVisible
          ? 'left'
          : 'both';

  const mask = `${getSmoothMask(fadeEdges)} 0 0/auto no-repeat`;
  const scrollbarMask = `linear-gradient(black,black) 0 bottom/auto ${scrollbarWidth} no-repeat`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        borderRadius: ref(radiusLg), // needs to be overwritable by tabs-bar to improve focus appearance
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      slot: {
        gridArea: '1/2',
        position: 'relative', // necessary for tabs bar animation
        display: 'inline-flex',
        gap: ref(cssVarGap, isCompact ? ref(spacingStaticXs) : ref(spacingStaticSm)),
      },
    },
    root: {
      display: 'grid',
      gridTemplateColumns: `auto minmax(0,1fr) auto`,
      alignItems: 'center',
      borderRadius: ref(cssVarFocusRingRadius, 'inherit'),
      '&:has(.scroll:focus-visible)': getFocusBaseStyles(), // delegating the focus ensures mask does not cut off the focus ring
    },
    scroll: {
      gridArea: '1/1/1/-1',
      zIndex: 0, // ensure that scroll area is behind the indicators
      display: 'grid',
      gridTemplateColumns: `${safeZone} minmax(auto,1fr) ${safeZone}`,
      margin: `calc(-1 * ${safeZone})`, // compensate padding to ensure that `:host` is aligned with other elements
      padding: `${safeZone} 0px${hasScrollbar ? ` calc(${safeZone} + ${scrollbarWidth})` : ''}`, // ensure enough space is available for focus ring of slotted elements (horizontal space is given by `.sentinel`)
      scrollbarWidth: hasScrollbar ? 'thin' : 'none',
      // Override for touch devices to avoid issues with ios not rendering mask at all when using multiple mask layers
      ...(hasScrollbar &&
        pointerCoarseMediaQuery({
          padding: `${safeZone} 0px`,
        })),
      outline: 'none', // focus ring is applied to `.root`, it would be cut off by the mask if applied to `.scroll`
      overflow: 'auto hidden',
      ...(fadeEdges !== 'none' && {
        WebkitMask: hasScrollbar ? `${mask},${scrollbarMask}` : mask, // necessary for Sogou browser support :-)
        mask: hasScrollbar ? `${mask},${scrollbarMask}` : mask,
      }),
      // Override for touch devices to avoid issues with ios not rendering mask at all when using multiple mask layers
      ...(fadeEdges !== 'none' &&
        hasScrollbar &&
        pointerCoarseMediaQuery({
          WebkitMask: mask,
          mask: mask,
        })),
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
    prev: getScrollIndicatorStyles('prev', !!isIndicatorPrevVisible, isSticky, hasScrollbar, isCompact),
    next: getScrollIndicatorStyles('next', !!isIndicatorNextVisible, isSticky, hasScrollbar, isCompact),
  });
};
