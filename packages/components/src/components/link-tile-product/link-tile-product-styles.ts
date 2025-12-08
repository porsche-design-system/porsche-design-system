import {
  borderRadiusLarge,
  fontHyphenationStyle,
  getMediaQueryMin,
  headingSmallStyle,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  textXSmallStyle,
  textXXSmallStyle,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { anchorSlot, headerSlot, type LinkTileProductAspectRatio } from './link-tile-product-utils';

const slottedAnchorSelector = `a[slot='${anchorSlot}']`;

const anchorJssStyle: JssStyle = {
  position: 'absolute',
  inset: 0,
  zIndex: 1, // necessary to be on top of img
  borderRadius: borderRadiusLarge,
};

const getMultilineEllipsis = (lineClamp: number): JssStyle => {
  return {
    display: '-webkit-box',
    WebkitLineClamp: lineClamp,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
};

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

const { primaryColor, contrastHighColor, contrastMediumColor, surfaceColor } = colors;

export const getComponentCss = (
  hasLikeButton: boolean,
  hasSlottedAnchor: boolean,
  hasPriceOriginal: boolean,
  hasDescription: boolean,
  aspectRatio: BreakpointCustomizable<LinkTileProductAspectRatio>
): string => {
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
      ...preventFoucOfNestedElementsStyles,
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
            [`&(${slottedAnchorSelector}:focus-visible)`]: getFocusBaseStyles(),
          }),
          [`&([slot="${headerSlot}"])`]: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacingFluidXSmall,
          },
        },
        '::slotted(:is(img,picture))': {
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: borderRadiusLarge,
          overflow: 'hidden', // needed for picture > img to have correct border-radius
        },
      }),
      ...(hasPriceOriginal && {
        s: {
          color: contrastMediumColor,
        },
      }),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      aspectRatio: '3/4',
      overflow: 'hidden', // TODO: discussable if we should prevent text to overflow .root, – e.g. it also prevents a popover from being shown correctly
      boxSizing: 'border-box',
      borderRadius: borderRadiusLarge,
      padding: spacingFluidSmall,
      color: primaryColor,
      backgroundColor: surfaceColor,
      ...buildResponsiveStyles(aspectRatio, (ratio: LinkTileProductAspectRatio) => ({
        aspectRatio: ratio,
      })),
    },
    ...(!hasSlottedAnchor && {
      anchor: {
        ...anchorJssStyle,
        '&:focus-visible': getFocusBaseStyles(),
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
      margin: '0 0 2px', // ua-style reset
      ...headingSmallStyle,
      ...fontHyphenationStyle,
      ...getMultilineEllipsis(3),
    },
    price: {
      margin: 0, // ua-style reset
      ...textXSmallStyle,
      ...(hasPriceOriginal && {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: spacingFluidXSmall,
      }),
    },
    ...(hasDescription && {
      description: {
        margin: 0, // ua-style reset
        ...textXXSmallStyle,
        ...getMultilineEllipsis(2),
        color: contrastHighColor,
      },
    }),
    ...(hasPriceOriginal && {
      'sr-only': getHiddenTextJssStyle(),
    }),
  });
};
