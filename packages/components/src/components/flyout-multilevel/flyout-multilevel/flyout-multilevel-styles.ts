import {
  frostedGlassStyle,
  getMediaQueryMax,
  getMediaQueryMin,
  motionDurationModerate,
  motionEasingBase,
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
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  motionDurationMap,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { type Theme, getCss } from '../../../utils';

export const scrollerWidthMobile = '100dvw';
export const scrollerWidthDesktop = 'clamp(338px, 210px + 18vw, 640px)';
export const mediaQueryMobile = getMediaQueryMax('s');
export const mediaQueryDesktop = getMediaQueryMin('s');

export const animatePrimaryClass = 'animate-primary';
export const animateSecondaryClass = 'animate-secondary';

const animationSlideUpMobile = {
  from: {
    transform: `translate3d(0,${spacingFluidMedium},0)`,
  },
  to: {
    transform: 'translate3d(0,0,0)',
  },
};

const animationSlideUpDesktop = {
  from: {
    marginBlockStart: spacingFluidMedium,
  },
  to: {
    marginBlockStart: '0px',
  },
};

const animationFadeIn = {
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
};

const dialogDurationOpen = 'moderate';
const backdropDurationOpen = 'long';
const easingOpen = 'in';
const dialogDurationClose = 'short';
const backdropDurationClose = 'moderate';
const easingClose = 'out';

export const getComponentCss = (isPrimary: boolean, isSecondaryScrollerVisible: boolean, theme: Theme): string => {
  const { primaryColor, backgroundColor, backgroundSurfaceColor, backgroundShadingColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    backgroundColor: backgroundColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    backgroundShadingColor: backgroundShadingColorDark,
  } = getThemedColors('dark');

  const style = getCss({
    '@global': {
      '@keyframes slide-up-mobile': animationSlideUpMobile,
      '@keyframes slide-up-desktop': animationSlideUpDesktop,
      '@keyframes fade-in': animationFadeIn,
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      dialog: {
        position: 'fixed',
        inset: 0,
        zIndex: 9999999, // fallback when dialog isn't rendered on #top-layer, e.g. relevant in ssr context
        height: '100dvh',
        maxHeight: '100dvh',
        margin: 0,
        padding: 0,
        border: 0,
        visibility: 'hidden',
        outline: 0,
        transform: 'translate3d(-100%, 0, 0)',
        opacity: 0,
        display: 'grid',
        overflow: 'visible',
        maxWidth: '100dvw',
        // overlay + display transition duration needs to be in sync with ::backdrop transition duration when dialog gets closed
        // visibility delay ensures no element within dialog is tabbable when dialog is closed
        transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationMap[backdropDurationClose]}), ${getTransition('display', backdropDurationClose, easingClose)} allow-discrete, ${getTransition('overlay', backdropDurationClose, easingClose)} allow-discrete, ${getTransition('opacity', dialogDurationClose, easingClose)}, ${getTransition('transform', dialogDurationClose, easingClose)}`,
        color: primaryColor,
        [mediaQueryMobile]: {
          width: scrollerWidthMobile,
          gridTemplate: `${spacingFluidSmall} auto ${spacingFluidSmall} minmax(0, 1fr) / ${spacingFluidLarge} auto minmax(0, 1fr) auto ${spacingFluidLarge}`,
          background: backgroundColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
            background: backgroundColorDark,
          }),
          '&::before, &::after': {
            content: '""',
            position: 'relative',
            zIndex: 2,
            pointerEvents: 'none',
            opacity: 0,
          },
          '&::before': {
            gridArea: '1/1/-1/-1',
            background: backgroundColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: backgroundColorDark,
            }),
          },
          '&::after': {
            gridArea: '1/1/-1/-1',
            backgroundColor: backgroundColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: backgroundColorDark,
            }),
          },
        },
        [mediaQueryDesktop]: {
          width: isSecondaryScrollerVisible ? `calc(${scrollerWidthDesktop} * 2)` : scrollerWidthDesktop,
          gridTemplate: `${spacingFluidMedium} minmax(0, 1fr) / repeat(${isSecondaryScrollerVisible ? 2 : 1}, ${spacingFluidLarge} minmax(0, 1fr) ${spacingFluidLarge})`,
          background: isSecondaryScrollerVisible
            ? `linear-gradient(90deg, ${backgroundColor} 0%, ${backgroundColor} 50%, ${backgroundSurfaceColor} 50%, ${backgroundSurfaceColor} 100%)`
            : backgroundColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
            background: isSecondaryScrollerVisible
              ? `linear-gradient(90deg, ${backgroundColorDark} 0%, ${backgroundColorDark} 50%, ${backgroundSurfaceColorDark} 50%, ${backgroundSurfaceColorDark} 100%)`
              : backgroundColorDark,
          }),
          '&::before, &::after': {
            content: '""',
            position: 'relative',
            zIndex: 2,
            pointerEvents: 'none',
            opacity: 0,
          },
          '&::before': {
            gridArea: '1/1/-1/4',
            background: backgroundColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: backgroundColorDark,
            }),
          },
          '&::after': {
            gridArea: '1/4/-1/-1',
            backgroundColor: backgroundSurfaceColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: backgroundSurfaceColorDark,
            }),
          },
        },
        '&::backdrop': {
          background: backgroundShadingColor,
          opacity: 0,
          WebkitBackdropFilter: 'blur(0px)',
          backdropFilter: 'blur(0px)',
          transition: `${getTransition('display', backdropDurationClose, easingClose)} allow-discrete, ${getTransition('overlay', backdropDurationClose, easingClose)} allow-discrete, ${getTransition('opacity', backdropDurationClose, easingClose)}, ${getTransition('backdrop-filter', backdropDurationClose, easingClose)}, ${getTransition('-webkit-backdrop-filter', backdropDurationClose, easingClose)}`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundShadingColorDark,
          }),
        },
        '&[open]': {
          transform: 'translate3d(0, 0, 0)',
          opacity: 1,
          visibility: 'inherit',
          transition: `${getTransition('opacity', dialogDurationOpen, easingOpen)}, ${getTransition('transform', dialogDurationOpen, easingOpen)}`,
          '&::backdrop': {
            opacity: 1,
            ...frostedGlassStyle,
            transition: `${getTransition('opacity', backdropDurationOpen, easingOpen)}, ${getTransition('backdrop-filter', backdropDurationOpen, easingOpen)}, ${getTransition('-webkit-backdrop-filter', backdropDurationOpen, easingOpen)}`,
          },
        },
        [`&.${animatePrimaryClass}::before`]: {
          animation: `fade-in ${motionDurationModerate} ${motionEasingBase}`,
        },
        [`&.${animateSecondaryClass}::after`]: {
          animation: `fade-in ${motionDurationModerate} ${motionEasingBase}`,
        },
      },
      nav: {
        [mediaQueryMobile]: {
          display: 'contents',
          ...(!isSecondaryScrollerVisible && {
            gridArea: '1/1/-1/-1',
            display: 'grid',
            gridTemplateRows: 'subgrid',
            gridTemplateColumns: 'subgrid',
            overflow: 'hidden auto',
            '&::before': {
              zIndex: 1,
              content: '""',
              position: 'sticky',
              top: 0,
              gridArea: '1/1/4/-1',
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
          }),
          // ...(isPrimary && !isSecondaryScrollerVisible && {
          //   animation: `slide-up-mobile ${motionDurationModerate} ${motionEasingBase}`,
          // }),
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
        [mediaQueryMobile]: {
          '::slotted(*:not([primary],[secondary],[cascade]))': {
            display: 'none',
          },
        },
        [mediaQueryDesktop]: {
          ...(!isPrimary && {
            '::slotted(*:not([primary],[cascade]))': {
              display: 'none',
            },
          }),
        },
      }),
    },
    dismiss: {
      [mediaQueryMobile]: {
        gridArea: '2/4',
        zIndex: 2,
        marginInlineEnd: '-8px', // improve visual alignment and compensate white space of close icon
        padding: spacingFluidSmall,
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

  // @starting-style CSS rule is unknown for JSS, therefore we need to extend the CSS string manually
  const startingStyle = `
    @starting-style {
      dialog[open] {
        transform: translate3d(-100%, 0, 0);
        opacity: 0;
        visibility: hidden;

        &::backdrop {
          opacity: 0;
          -webkit-backdrop-filter: blur(0px);
          backdrop-filter: blur(0px);
        }
      }
    }
  `;

  return style + startingStyle;
};
