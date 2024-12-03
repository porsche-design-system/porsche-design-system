import {
  frostedGlassStyle,
  getMediaQueryMax,
  getMediaQueryMin,
  motionDurationModerate,
  motionDurationVeryLong,
  motionEasingBase,
  motionEasingIn,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  spacingStaticSmall,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  dismissButtonJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  motionDurationMap,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { type Theme, getCss } from '../../../utils';

export const scrollerWidthDesktop = 'clamp(338px, 210px + 18vw, 640px)';
export const mediaQueryMobile = getMediaQueryMax('s');
export const mediaQueryDesktop = getMediaQueryMin('s');

export const animatePrimaryClass = 'animate-primary';
export const animateSecondaryClass = 'animate-secondary';

const dialogDurationOpen = 'moderate';
const backdropDurationOpen = 'long';
const easingOpen = 'in';
const dialogDurationClose = 'short';
const backdropDurationClose = 'moderate';
const easingClose = 'out';

export const getComponentCss = (
  isOpen: boolean,
  isPrimary: boolean,
  isSecondaryScrollerVisible: boolean,
  theme: Theme
): string => {
  const { backgroundColor, backgroundSurfaceColor, backgroundShadingColor } = getThemedColors(theme);
  const {
    backgroundColor: backgroundColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    backgroundShadingColor: backgroundShadingColorDark,
  } = getThemedColors('dark');

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
      '@keyframes fade-in': {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
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
              background: backgroundShadingColor,
              transition: `${getTransition('background', backdropDurationOpen, easingOpen)}, ${getTransition('backdrop-filter', backdropDurationOpen, easingOpen)}, ${getTransition('-webkit-backdrop-filter', backdropDurationOpen, easingOpen)}`,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                background: backgroundShadingColorDark,
              }),
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
            zIndex: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: spacingFluidXSmall,
            gridArea: '4/2/auto/-2',
            height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
            paddingBlockEnd: spacingFluidLarge,
            ...(isPrimary && {
              animation: `slide-up-mobile ${motionDurationModerate} ${motionEasingBase}`,
            }),
          }),
        },
        [mediaQueryDesktop]: {
          display: 'flex',
          flexDirection: 'column',
          gap: isPrimary ? spacingFluidXSmall : spacingFluidMedium,
          gridArea: '2/2/auto/-2',
          height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
          paddingBlockEnd: spacingFluidLarge,
          ...(isPrimary && {
            animation: `slide-up-desktop ${motionDurationModerate} ${motionEasingBase}`,
          }),
        },
      },
      ...(isSecondaryScrollerVisible && {
        '::slotted(*:not([primary],[secondary],[cascade]))': {
          [mediaQueryMobile]: {
            display: 'none',
          },
        },
        '::slotted(*:not([primary],[cascade]))': {
          [mediaQueryDesktop]: {
            ...(!isPrimary && {
              display: 'none',
            }),
          },
        },
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
          }),
      [mediaQueryMobile]: {
        gridTemplate: `${spacingFluidMedium} auto ${spacingFluidLarge} minmax(0, 1fr)/${spacingFluidLarge} auto minmax(0, 1fr) auto ${spacingFluidLarge}`,
        background: backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorDark,
        }),
      },
      [mediaQueryDesktop]: {
        width: isSecondaryScrollerVisible ? `calc(${scrollerWidthDesktop} * 2)` : scrollerWidthDesktop,
        gridTemplate: `${spacingFluidMedium} minmax(0, 1fr)/repeat(${isSecondaryScrollerVisible ? 2 : 1}, ${spacingFluidLarge} minmax(0, 1fr) ${spacingFluidLarge})`,
        background: backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorDark,
        }),
        ...(isSecondaryScrollerVisible && {
          background: `linear-gradient(90deg,${backgroundColor} 0%,${backgroundColor} 50%,${backgroundSurfaceColor} 50%,${backgroundSurfaceColor} 100%)`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: `linear-gradient(90deg,${backgroundColorDark} 0%,${backgroundColorDark} 50%,${backgroundSurfaceColorDark} 50%,${backgroundSurfaceColorDark} 100%)`,
          }),
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
          background: backgroundColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundColorDark,
          }),
        },
        [mediaQueryDesktop]: {
          gridArea: '1/1/-1/4',
          background: backgroundColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundColorDark,
          }),
        },
      },
      '&::after': {
        [mediaQueryMobile]: {
          gridArea: '1/1/-1/-1',
          background: backgroundColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundColorDark,
          }),
        },
        [mediaQueryDesktop]: {
          gridArea: '1/4/-1/-1',
          background: backgroundSurfaceColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundSurfaceColorDark,
          }),
        },
      },
      [`.${animatePrimaryClass} &::before`]: {
        animation: `fade-in ${motionDurationVeryLong} ${motionEasingIn}`,
      },
      [`.${animateSecondaryClass} &::after`]: {
        animation: `fade-in ${motionDurationVeryLong} ${motionEasingIn}`,
      },
    },
    scroller: {
      [mediaQueryMobile]: {
        display: 'contents',
        ...(!isSecondaryScrollerVisible && {
          gridArea: '1/1/-1/-1',
          display: 'grid',
          gridTemplateRows: 'subgrid',
          gridTemplateColumns: 'subgrid',
          overflow: 'hidden auto',
          overscrollBehaviorY: 'none',
          '&::before': {
            content: '""',
            position: 'sticky',
            top: 0,
            gridArea: '1/1/4/-1',
            zIndex: 1,
            background: `linear-gradient(180deg,${backgroundColor} 0%,${backgroundColor} 65%,transparent 100%)`,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: `linear-gradient(180deg,${backgroundColorDark} 0%,${backgroundColorDark} 65%,transparent 100%)`,
            }),
          },
        }),
      },
      [mediaQueryDesktop]: {
        gridArea: '1/1/-1/4',
        display: 'grid',
        gridTemplateRows: 'subgrid',
        gridTemplateColumns: 'subgrid',
        overflow: 'hidden auto',
        overscrollBehaviorY: 'none',
      },
    },
    'dismiss-mobile': {
      [mediaQueryMobile]: {
        ...dismissButtonJssStyle,
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
        '--p-internal-icon-filter': 'invert(1)',
        position: 'absolute',
        left: `calc(100% + ${spacingFluidSmall})`,
        top: spacingFluidSmall,
        padding: spacingStaticSmall,
      },
    },
    back: {
      display: 'none',
      ...(isSecondaryScrollerVisible && {
        [mediaQueryMobile]: {
          display: 'block',
          gridArea: '2/2',
          placeSelf: 'center flex-start',
          zIndex: 2,
        },
      }),
    },
  });
};
