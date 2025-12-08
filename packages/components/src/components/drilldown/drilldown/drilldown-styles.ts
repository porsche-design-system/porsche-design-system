import {
  frostedGlassStyle,
  getMediaQueryMax,
  getMediaQueryMin,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  spacingStaticSmall,
} from '@porsche-design-system/styles';
import { colorFrostedDark, colorPrimaryDark } from '@porsche-design-system/tokens';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  cssVariableTransitionDuration,
  dismissButtonJssStyle,
  getAnimation,
  getTransition,
  hostHiddenStyles,
  motionDurationMap,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getCss } from '../../../utils';

// public css variables
export const cssVariableGridTemplate = '--p-drilldown-grid-template';
export const cssVariableGap = '--p-drilldown-gap';

// private css variables
export const cssVarColorPrimary = '--_p-a';
export const cssVarColorBackgroundBase = '--_p-b';
export const cssVarColorBackgroundSurface = '--_p-c';
export const cssVarColorBackgroundShading = '--_p-d';
export const cssVarColorBackgroundScroller = '--_p-f';

export const scrollerWidthDesktop = 'clamp(338px, 210px + 18vw, 640px)';
export const mediaQueryMobile = getMediaQueryMax('s');
export const mediaQueryDesktop = getMediaQueryMin('s');

const dialogDurationOpen = 'moderate';
const backdropDurationOpen = 'long';
const easingOpen = 'in';
const dialogDurationClose = 'short';
const backdropDurationClose = 'moderate';
const easingClose = 'out';

const { primaryColor, canvasColor, surfaceColor, backdropColor } = colors;

export const getComponentCss = (isOpen: boolean, isPrimary: boolean, isSecondaryScrollerVisible: boolean): string => {
  return getCss({
    '@global': {
      '@keyframes slide-up-mobile': {
        from: { transform: `translate3d(0,${spacingFluidMedium},0)` },
        to: { transform: 'translate3d(0,0,0)' },
      },
      // unfortunately, it's not possible to use transform animation like in mobile view
      // because then a new stacking context within scroll container would be initialized
      // causing the slotted scroll container to become invisible
      '@keyframes slide-up-desktop': {
        from: { marginBlockStart: spacingFluidMedium },
        to: { marginBlockStart: '0px' },
      },
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          [cssVarColorPrimary]: primaryColor,
          [cssVarColorBackgroundBase]: canvasColor,
          [cssVarColorBackgroundSurface]: surfaceColor,
          [cssVarColorBackgroundShading]: backdropColor,
          // [cssVarColorBackgroundScroller]: theme === 'dark' ? 'rgba(0,0,0,.01)' : 'rgba(255,255,255,.01)', // ensures that the scrollbar color is mostly set correctly
          [cssVarColorBackgroundScroller]: 'rgba(255,255,255,.01)', // ensures that the scrollbar color is mostly set correctly
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      '::slotted(*)': {
        [cssVariableGridTemplate]: 'auto/auto', // reset css variable to prevent inheritance
        [cssVariableGap]: spacingFluidXSmall, // reset css variable to prevent inheritance
      },
      dialog: {
        all: 'unset',
        position: 'fixed',
        inset: 0,
        zIndex: 999999999, // fallback when dialog isn't rendered on #top-layer, e.g. relevant in ssr context or fade-out transition in Safari or Firefox
        outline: 0, // prevents outline in case dialog becomes focusable
        ...(isOpen
          ? {
              visibility: 'inherit',
              ...frostedGlassStyle,
              background: `var(${cssVarColorBackgroundShading})`,
              transition: `${getTransition('background', backdropDurationOpen, easingOpen)}, ${getTransition('backdrop-filter', backdropDurationOpen, easingOpen)}, ${getTransition('-webkit-backdrop-filter', backdropDurationOpen, easingOpen)}`,
            }
          : {
              visibility: 'hidden',
              transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationMap[backdropDurationClose]}), ${getTransition('overlay', backdropDurationClose, easingClose)} allow-discrete, ${getTransition('background', backdropDurationClose, easingClose)}, ${getTransition('backdrop-filter', backdropDurationClose, easingClose)}, ${getTransition('-webkit-backdrop-filter', backdropDurationClose, easingClose)}`,
            }),
        '&::backdrop': {
          display: 'none',
        },
      },
      slot: {
        [mediaQueryMobile]: {
          display: 'contents',
          ...(!isSecondaryScrollerVisible && {
            gridArea: '4/2/auto/-2',
            zIndex: 0,
            display: 'grid',
            gridTemplate: `var(${cssVariableGridTemplate},auto/auto)`,
            gap: `var(${cssVariableGap},${spacingFluidXSmall})`,
            alignContent: 'start',
            alignItems: 'start',
            boxSizing: 'border-box',
            minHeight: '100%',
            height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
            paddingBlockEnd: spacingFluidLarge,
            ...(isPrimary && {
              animation: getAnimation('slide-up-mobile', 'moderate', 'base'),
            }),
          }),
        },
        [mediaQueryDesktop]: {
          ...(isPrimary && {
            gridArea: '3/2/auto/-2',
            display: 'grid',
            gridTemplate: `var(${cssVariableGridTemplate},auto/auto)`,
            gap: `var(${cssVariableGap},${isPrimary ? spacingFluidXSmall : spacingFluidMedium})`,
            alignContent: 'start',
            alignItems: 'start',
            boxSizing: 'border-box',
            minHeight: '100%',
            height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
            paddingBlockEnd: spacingFluidLarge,
            animation: getAnimation('slide-up-desktop', 'moderate', 'base'),
          }),
        },
      },
      ...(isSecondaryScrollerVisible && {
        '::slotted(*:not([primary],[secondary],[cascade]))': {
          [mediaQueryMobile]: addImportantToEachRule({
            display: 'none',
          }),
        },
        '::slotted(*:not([primary],[cascade]))': addImportantToEachRule({
          [mediaQueryDesktop]: {
            ...(!isPrimary && {
              display: 'none',
            }),
          },
        }),
      }),
    },
    drawer: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      ...(isOpen
        ? {
            opacity: 1,
            transform: 'translate3d(0,0,0)',
            transition: `${getTransition('opacity', dialogDurationOpen, easingOpen)}, ${getTransition('transform', dialogDurationOpen, easingOpen)}`,
          }
        : {
            opacity: 0,
            transform: 'translate3d(-100%,0,0)',
            transition: `${getTransition('opacity', dialogDurationClose, easingClose)}, ${getTransition('transform', dialogDurationClose, easingClose)}`,
            '&:dir(rtl)': {
              transform: 'translate3d(100%,0,0)',
            },
          }),
      [mediaQueryMobile]: {
        gridTemplate: `${spacingFluidMedium} auto ${spacingFluidLarge} minmax(0, 1fr)/${spacingFluidLarge} auto minmax(0, 1fr) auto ${spacingFluidLarge}`,
        background: `var(${cssVarColorBackgroundBase})`,
      },
      [mediaQueryDesktop]: {
        width: isSecondaryScrollerVisible ? `calc(${scrollerWidthDesktop} * 2)` : scrollerWidthDesktop,
        gridTemplate: `${spacingFluidMedium} auto minmax(0, 1fr)/repeat(${isSecondaryScrollerVisible ? 2 : 1}, ${spacingFluidLarge} minmax(0, 1fr) ${spacingFluidLarge})`,
        background: `var(${cssVarColorBackgroundBase})`,
        ...(isSecondaryScrollerVisible && {
          background: `linear-gradient(90deg,var(${cssVarColorBackgroundBase}) 0%,var(${cssVarColorBackgroundBase}) 50%,var(${cssVarColorBackgroundSurface}) 50%,var(${cssVarColorBackgroundSurface}) 100%)`,
          '&:dir(rtl)': {
            background: `linear-gradient(90deg,var(${cssVarColorBackgroundSurface}) 0%,var(${cssVarColorBackgroundSurface}) 50%,var(${cssVarColorBackgroundBase}) 50%,var(${cssVarColorBackgroundBase}) 100%)`,
          },
        }),
      },
      '&::before, &::after': {
        content: '""',
        position: 'relative',
        zIndex: 2,
        pointerEvents: 'none',
        opacity: 0,
      },
      '&::before': {
        [mediaQueryMobile]: {
          gridArea: '1/1/-1/-1',
          background: `var(${cssVarColorBackgroundBase})`,
        },
        [mediaQueryDesktop]: {
          gridArea: '1/1/-1/4',
          background: `var(${cssVarColorBackgroundBase})`,
        },
      },
      '&::after': {
        [mediaQueryMobile]: {
          gridArea: '1/1/-1/-1',
          background: `var(${cssVarColorBackgroundBase})`,
        },
        [mediaQueryDesktop]: {
          gridArea: '1/4/-1/-1',
          background: `var(${cssVarColorBackgroundSurface})`,
        },
      },
    },
    scroller: {
      display: 'contents',
      overflow: 'hidden auto',
      // scrollBehavior: 'smooth', // when defined, `.scrollTo()` isn't applied immediately
      // overscrollBehaviorY: 'none', // when defined, rubber band scroll effect is getting lost on iOS Safari
      // WebkitOverflowScrolling: 'touch', // when defined, secondary scroller might not be show in iOS Safari on iPhone only
      background: `var(${cssVarColorBackgroundScroller})`,
      [mediaQueryMobile]: {
        ...(!isSecondaryScrollerVisible && {
          gridArea: '1/1/-1/-1',
          display: 'grid',
          gridTemplateRows: 'subgrid',
          gridTemplateColumns: 'subgrid',
          '&::before': {
            content: '""',
            position: 'sticky',
            top: 0,
            gridArea: '1/1/4/-1',
            zIndex: 1,
            background: `linear-gradient(180deg,var(${cssVarColorBackgroundBase}) 0%,var(${cssVarColorBackgroundBase}) 65%,transparent 100%)`,
          },
        }),
      },
      [mediaQueryDesktop]: {
        gridArea: '1/1/-1/4',
        display: 'grid',
        gridTemplateRows: 'subgrid',
        gridTemplateColumns: 'subgrid',
      },
    },
    'dismiss-mobile': {
      [mediaQueryMobile]: {
        ...dismissButtonJssStyle,
        width: 'fit-content',
        height: 'fit-content',
        placeSelf: 'start end',
        gridArea: '2/4',
        zIndex: 3, // ensures dismiss button is on top of opacity animation handled by ::before/::after
        marginInlineEnd: '-1px', // improve visual alignment and compensate white space of close icon
      },
      [mediaQueryDesktop]: {
        display: 'none',
      },
    },
    'dismiss-desktop': {
      [mediaQueryMobile]: {
        display: 'none',
      },
      [mediaQueryDesktop]: {
        // TODO: we need to expose color variables for button-pure to be able to use the correct colors in drilldown
        '--color-primary': colorPrimaryDark,
        '--color-frosted': colorFrostedDark,
        position: 'absolute',
        insetInlineStart: `calc(100% + ${spacingFluidSmall})`,
        insetBlockStart: spacingFluidSmall,
        padding: spacingStaticSmall,
      },
    },
    back: {
      display: 'none',
      ...(isSecondaryScrollerVisible &&
        isPrimary && {
          [mediaQueryMobile]: {
            display: 'block',
            marginTop: '2px', // compensate negative margin of ::pseudo background of button-pure
            gridArea: '2/2',
            width: 'fit-content',
            height: 'fit-content',
            placeSelf: 'start',
            zIndex: 2,
          },
        }),
    },
  });
};
