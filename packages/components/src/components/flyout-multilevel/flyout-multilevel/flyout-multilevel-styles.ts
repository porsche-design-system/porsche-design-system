import {
  frostedGlassStyle,
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
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { type Theme, getCss } from '../../../utils';

export const scrollerWidthEnhancedView = 'clamp(338px, 210px + 18vw, 640px)';
export const mediaQueryEnhancedView = getMediaQueryMin('s');

export const animatePrimaryClass = 'animate-primary';
export const animateSecondaryClass = 'animate-secondary';

const animationSlideUpPrimary = {
  from: {
    paddingBlockStart: `calc(${spacingFluidMedium} * 2)`,
  },
  to: {
    paddingBlockStart: spacingFluidMedium,
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
      '@keyframes slide-up-primary': animationSlideUpPrimary,
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
        visibility: 'inherit',
        outline: 0,
        transform: 'translate3d(-100%, 0, 0)',
        opacity: 0,
        display: 'grid',
        overflow: 'visible',
        width: 'auto',
        maxWidth: '100vw',
        // overlay + display transition duration needs to be in sync with ::backdrop transition duration when dialog gets closed
        transition: `${getTransition('display', backdropDurationClose, easingClose)} allow-discrete, ${getTransition('overlay', backdropDurationClose, easingClose)} allow-discrete, ${getTransition('opacity', dialogDurationClose, easingClose)}, ${getTransition('transform', dialogDurationClose, easingClose)}`,
        color: primaryColor,
        background: backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
          background: backgroundColorDark,
        }),
        [mediaQueryEnhancedView]: {
          background: isSecondaryScrollerVisible
            ? `linear-gradient(90deg, ${backgroundColor} 0%, ${backgroundColor} 50%, ${backgroundSurfaceColor} 50%, ${backgroundSurfaceColor} 100%)`
            : backgroundColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
            background: isSecondaryScrollerVisible
              ? `linear-gradient(90deg, ${backgroundColorDark} 0%, ${backgroundColorDark} 50%, ${backgroundSurfaceColorDark} 50%, ${backgroundSurfaceColorDark} 100%)`
              : backgroundColorDark,
          }),
          gridTemplateColumns: `repeat(${isSecondaryScrollerVisible ? 2 : 1}, ${scrollerWidthEnhancedView}) auto`,
          gridTemplateRows: '100dvh',
          insetInlineEnd: 'auto',
          '&::before, &::after': {
            content: '""',
            position: 'relative',
            zIndex: 2,
            pointerEvents: 'none',
            opacity: 0,
          },
          '&::before': {
            gridArea: '1/1',
            background: backgroundColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: backgroundColorDark,
            }),
          },
          '&::after': {
            gridArea: '1/2',
            backgroundColor: backgroundSurfaceColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: backgroundSurfaceColorDark,
            }),
          },
        },
        '&::before, &::after': {
          content: '""',
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0,
        },
        '&::before': {
          gridArea: '1/1',
          background: backgroundColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundColorDark,
          }),
        },
        '&::after': {
          gridArea: '1/2',
          backgroundColor: backgroundSurfaceColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            backgroundColor: backgroundSurfaceColorDark,
          }),
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
          transition: `${getTransition('opacity', dialogDurationOpen, easingOpen)}, ${getTransition('transform', dialogDurationOpen, easingOpen)}`,
          opacity: 1,
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
      slot: {
        gridArea: '1/1',
        display: 'flex',
        flexDirection: 'column',
        gap: spacingFluidXSmall,
        overflow: 'hidden auto',
        padding: `${spacingFluidMedium} ${spacingFluidLarge} ${spacingFluidLarge}`,
        ...(isPrimary && {
          animation: `slide-up-primary ${motionDurationModerate} ${motionEasingBase}`,
        }),
      },
      // If not primary e.g. root level not visible, hide all siblings of primary or cascade items
      ...(!isPrimary && {
        '::slotted(*:not([primary],[cascade]))': {
          display: 'none',
        },
      }),
    },
    dismiss: {
      padding: spacingFluidSmall,
      [mediaQueryEnhancedView]: {
        '--p-internal-icon-filter': 'invert(1)',
        position: 'absolute',
        left: `calc(100% + ${spacingFluidSmall})`,
        top: spacingFluidSmall,
        padding: spacingStaticSmall,
      },
    },
  });

  // @starting-style CSS rule is unknown for JSS, therefore we need to extend the CSS string manually
  const startingStyle = `
    @starting-style {
      dialog[open] {
        transform: translate3d(-100%, 0, 0);
        opacity: 0;

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
