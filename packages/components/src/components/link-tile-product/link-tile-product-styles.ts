import { buildResponsiveStyles, getCss, type Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
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
  fontHyphenationStyle,
  getFocusStyle,
  getMediaQueryMin,
  headingSmallStyle,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  textXSmallStyle,
  textXXSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { type BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { anchorSlot, headerSlot, type LinkTileProductAspectRatio } from './link-tile-product-utils';
import { type JssStyle } from 'jss';

const slottedAnchorSelector = `a[slot='${anchorSlot}']`;

const anchorJssStyle: JssStyle = {
  position: 'absolute',
  inset: 0,
  zIndex: 1, // necessary to be on top of img
  borderRadius: borderRadiusMedium,
};

const getMultilineEllipsis = (lineClamp: number): JssStyle => {
  return {
    display: '-webkit-box',
    WebkitLineClamp: lineClamp,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
};

export const getComponentCss = (
  hasLikeButton: boolean,
  hasSlottedAnchor: boolean,
  aspectRatio: BreakpointCustomizable<LinkTileProductAspectRatio>,
  theme: Theme
): string => {
  const { primaryColor, contrastHighColor, backgroundSurfaceColor, focusColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastHighColor: contrastHighColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    focusColor: focusColorDark,
  } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        position: 'relative', // needed for ::slotted(a) to overlay correctly
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      [`slot[name="${headerSlot}"]`]: {
        display: 'block', // to ensure correct like button positioning when slot is unused
      },
      ...addImportantToEachRule({
        '::slotted': {
          ...(hasSlottedAnchor && {
            [`&(${slottedAnchorSelector})`]: {
              ...anchorJssStyle,
              textIndent: '-999999px', // hide anchor label visually but still usable for a11y (only works in RTL-mode because of `overflow: hidden;` parent)
            },
            // TODO: Refactor getFocusStyles to support slotted selector
            [`&(${slottedAnchorSelector}:focus)`]: {
              outline: `${borderWidthBase} solid ${focusColor}`,
              outlineOffset: '2px',
              ...prefersColorSchemeDarkMediaQuery(theme, {
                outlineColor: focusColorDark,
              }),
            },
            [`&(${slottedAnchorSelector}:focus:not(:focus-visible))`]: {
              outlineColor: 'transparent',
            },
          }),
          [`&([slot="${headerSlot}"])`]: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacingFluidXSmall,
          },
          '&(img), &(picture)': {
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: borderRadiusLarge,
            overflow: 'hidden', // needed for picture > img to have correct border-radius
          },
        },
      }),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      aspectRatio: '3/4',
      overflow: 'hidden', // TODO: discussable if we should prevent text to overflow .root, – e.g. it also prevents a popover from being shown correctly
      boxSizing: 'border-box',
      borderRadius: borderRadiusMedium,
      padding: spacingFluidSmall,
      color: primaryColor,
      backgroundColor: backgroundSurfaceColor,
      ...buildResponsiveStyles(aspectRatio, (ratio: LinkTileProductAspectRatio) => ({
        aspectRatio: ratio.replace(':', '/'),
      })),
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
        backgroundColor: backgroundSurfaceColorDark,
      }),
    },
    ...(!hasSlottedAnchor && {
      anchor: {
        ...anchorJssStyle,
        ...getFocusStyle({ borderRadius: 'medium' }),
      },
    }),
    header: {
      display: 'flex',
      gap: spacingFluidSmall,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    ...(hasLikeButton && {
      button: {
        position: 'relative',
        zIndex: 2, // Necessary to be on top of anchor link
      },
    }),
    image: {
      aspectRatio: '8/9',
      margin: `${spacingFluidSmall} auto ${spacingFluidXSmall}`,
      overflow: 'hidden',
      transition: getTransition('transform', 'moderate'),
      [getMediaQueryMin('s')]: {
        padding: `0 ${spacingFluidMedium}`, // ensures image is not getting to large
      },
      ...hoverMediaQuery({
        '.root:hover &': {
          transform: 'scale3d(1.05,1.05,1.05)',
        },
      }),
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      textAlign: 'center',
    },
    heading: {
      ...headingSmallStyle,
      ...fontHyphenationStyle,
      ...getMultilineEllipsis(3),
      margin: '0 0 2px',
    },
    price: {
      ...textXSmallStyle,
      ...getMultilineEllipsis(2),
      margin: 0, // ua-style reset
    },
    description: {
      ...textXXSmallStyle,
      ...getMultilineEllipsis(2),
      margin: 0, // ua-style reset
      color: contrastHighColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrastHighColorDark,
      }),
    },
  });
};
