import { buildResponsiveStyles, getCss, Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import {
  borderRadiusLarge,
  borderRadiusMedium,
  borderWidthBase,
  fontLineHeight,
  fontSizeTextXSmall,
  fontWeightRegular,
  getFocusStyle,
  getMediaQueryMin,
  headingSmallStyle,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  textXSmallStyle,
  textXXSmallStyle,
  themeLightStateFocus,
} from '@porsche-design-system/utilities-v2';
import { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { anchorSlot, headerSlot, LinkTileProductAspectRatio } from './link-tile-product-utils';

const cssVariableMixBlendMode = '--p-link-tile-product-mix-blend-mode';
const slottedAnchorSelector = `a[slot='${anchorSlot}']`;

export const getComponentCss = (
  hasLikeButton: boolean,
  hasSlottedAnchor: boolean,
  aspectRatio: BreakpointCustomizable<LinkTileProductAspectRatio>,
  theme: Theme
): string => {
  const { primaryColor, contrastHighColor, backgroundSurfaceColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastHighColor: contrastHighColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
  } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        position: 'relative',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...addImportantToEachRule({
        '::slotted': {
          '&(img), &(picture)': {
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            overflow: 'hidden',
            borderRadius: borderRadiusLarge,
            mixBlendMode: `var(${cssVariableMixBlendMode})`,
          },
          ...(hasSlottedAnchor && {
            [`&(${slottedAnchorSelector})`]: {
              position: 'absolute',
              borderRadius: borderRadiusMedium,
              ...getInsetJssStyle(),
              zIndex: 1, // Necessary to be on top of img
              textIndent: '-999999px', // Hide anchor label visually but still usable for a11y
            },
            // TODO: Refactor getFocusStyles to support slotted selector
            [`&(${slottedAnchorSelector}:focus)`]: {
              outline: `${borderWidthBase} solid ${themeLightStateFocus}`,
              outlineOffset: '2px',
            },
            [`&(${slottedAnchorSelector}:focus:not(:focus-visible))`]: {
              outlineColor: 'transparent',
            },
          }),
        },
      }),
    },
    ...(!hasSlottedAnchor && {
      'link-overlay': {
        position: 'absolute',
        ...getInsetJssStyle(),
        ...getFocusStyle({ borderRadius: 'medium' }),
      },
    }),
    root: {
      display: 'flex',
      flexDirection: 'column',
      aspectRatio: '3 / 4',
      ...buildResponsiveStyles(aspectRatio, (ratio: LinkTileProductAspectRatio) => ({
        aspectRatio: ratio.replace(':', ' / '),
      })),
      overflow: 'hidden',
      boxSizing: 'border-box',
      borderRadius: borderRadiusMedium,
      padding: spacingFluidSmall,
      color: primaryColor,
      backgroundColor: backgroundSurfaceColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
        backgroundColor: backgroundSurfaceColorDark,
      }),
      ...hoverMediaQuery({
        '&:hover .image-container': {
          transform: 'scale3d(1.05,1.05,1.05)',
        },
      }),
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: fontSizeTextXSmall, // Use same font size and height as tag component
      [`& slot[name="${headerSlot}"]`]: {
        display: 'block', // To ensure button positioning when slot is unused
      },
    },
    ...(hasLikeButton && {
      'like-button': {
        height: 'fit-content',
        position: 'relative',
        zIndex: 2, // Necessary to be on top of anchor link
        ...hoverMediaQuery({
          '&:hover': {
            cursor: 'pointer',
          },
        }),
      },
    }),
    'text-container': {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      margin: 'auto',
    },
    text: {
      textAlign: 'center',
      margin: 0,
      '&__heading': {
        ...headingSmallStyle,
        paddingBottom: '2px',
        minHeight: `calc(${fontLineHeight} * 2)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      '&__price, &__description': {
        fontWeight: fontWeightRegular,
      },
      '&__price': {
        ...textXSmallStyle,
      },
      '&__description': {
        ...textXXSmallStyle,
        color: contrastHighColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: contrastHighColorDark,
        }),
      },
    },
    'image-container': {
      margin: `${spacingFluidSmall} auto ${spacingFluidXSmall} auto`,
      padding: 0,
      [getMediaQueryMin('s')]: {
        padding: `0 ${spacingFluidMedium}`,
      },
      overflow: 'hidden',
      aspectRatio: '8 / 9',
      transition: getTransition('transform', 'moderate'),
      maxHeight: '100%',
    },
  });
};
