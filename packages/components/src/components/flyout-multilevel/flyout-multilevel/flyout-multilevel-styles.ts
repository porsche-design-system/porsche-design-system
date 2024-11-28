import {
  frostedGlassStyle,
  getMediaQueryMin,
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
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { type Theme, getCss } from '../../../utils';

export const scrollerWidthEnhancedView = 'clamp(338px, 10.52vw + 258px, 460px)';
export const mediaQueryEnhancedView = getMediaQueryMin('s');

export const getComponentCss = (isPrimary: boolean, isSecondaryScrollerVisible: boolean, theme: Theme): string => {
  const { backgroundColor, backgroundSurfaceColor, backgroundShadingColor } = getThemedColors(theme);
  const {
    backgroundColor: backgroundColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    backgroundShadingColor: backgroundShadingColorDark,
  } = getThemedColors('dark');

  const style = getCss({
    '@global': {
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
        height: '100dvh',
        maxHeight: '100dvh',
        margin: 0,
        padding: 0,
        border: 0,
        visibility: 'inherit',
        outline: 0,
        transform: 'translate3d(-100%, 0, 0)',
        opacity: 0,
        inset: 0,
        display: 'grid',
        overflow: 'visible',
        width: 'auto',
        maxWidth: '100vw',
        transition: 'opacity 1.5s, transform 1.5s, overlay 1.5s, display 1.5s',
        transitionBehavior: 'allow-discrete',
        background: isSecondaryScrollerVisible
          ? `linear-gradient(90deg, ${backgroundColor} 0%, ${backgroundColor} 50%, ${backgroundSurfaceColor} 50%, ${backgroundSurfaceColor} 100%)`
          : backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: isSecondaryScrollerVisible
            ? `linear-gradient(90deg, ${backgroundColorDark} 0%, ${backgroundColorDark} 50%, ${backgroundSurfaceColorDark} 50%, ${backgroundSurfaceColorDark} 100%)`
            : backgroundColorDark,
        }),
        [mediaQueryEnhancedView]: {
          gridTemplateColumns: `repeat(${isSecondaryScrollerVisible ? 2 : 1}, ${scrollerWidthEnhancedView}) auto`,
          gridTemplateRows: '100dvh',
          insetInlineEnd: 'auto',
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
          transition: 'display 1.5s, overlay 1.5s, opacity 1.5s, backdrop-filter 1.5s, -webkit-backdrop-filter 1.5s',
          transitionBehavior: 'allow-discrete',
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundShadingColorDark,
          }),
        },
        '&[open]': {
          transform: 'translate3d(0, 0, 0)',
          opacity: 1,
          '&::backdrop': {
            opacity: 1,
            ...frostedGlassStyle,
          },
        },
      },
      slot: {
        gridArea: '1/1',
        display: 'flex',
        flexDirection: 'column',
        gap: spacingFluidXSmall,
        overflow: 'hidden auto',
        ...(isPrimary && {
          padding: `${spacingFluidMedium} ${spacingFluidLarge} ${spacingFluidLarge}`,
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
        margin: spacingFluidSmall,
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
