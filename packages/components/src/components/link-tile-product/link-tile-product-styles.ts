import { getMediaQueryMin } from '@porsche-design-system/emotion';
import {
  colorContrastHigh,
  colorContrastMedium,
  colorPrimary,
  colorSurface,
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  radius2Xl,
  radius3Xl,
  ref,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXs,
  typescale2Xs,
  typescaleSm,
  typescaleXs,
} from '@porsche-design-system/stylesheets';
import type { JssStyle } from '../../utils/emotionCss';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
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
  borderRadius: ref(radius3Xl),
  ...forcedColorsMediaQuery({
    forcedColorAdjust: 'none',
    boxShadow: 'inset 0 0 0 2px LinkText',
  }),
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
            gap: ref(spacingFluidXs),
          },
        },
        '::slotted(:is(img,picture))': {
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: ref(radius2Xl),
          overflow: 'hidden', // needed for picture > img to have correct border-radius
        },
      }),
      ...(hasPriceOriginal && {
        s: {
          color: ref(colorContrastMedium),
        },
      }),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      aspectRatio: '3/4',
      overflow: 'hidden', // TODO: discussable if we should prevent text to overflow .root, – e.g. it also prevents a popover from being shown correctly
      boxSizing: 'border-box',
      borderRadius: ref(radius3Xl),
      padding: ref(spacingFluidSm),
      color: ref(colorPrimary),
      backgroundColor: ref(colorSurface),
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
      gap: ref(spacingFluidSm),
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
      margin: `${ref(spacingFluidSm)} auto ${ref(spacingFluidXs)}`,
      overflow: 'hidden',
      transition: getTransition('transform', 'moderate'),
      [getMediaQueryMin('s')]: {
        padding: `0 ${ref(spacingFluidMd)}`, // ensures image is not getting to large
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
      font: `${ref(fontWeightSemibold)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      ...getMultilineEllipsis(3),
    },
    price: {
      margin: 0, // ua-style reset
      font: `${ref(fontWeightNormal)} ${ref(typescaleXs)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      ...(hasPriceOriginal && {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: ref(spacingFluidXs),
      }),
    },
    ...(hasDescription && {
      description: {
        margin: 0, // ua-style reset
        font: `${ref(fontWeightNormal)} ${ref(typescale2Xs)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        color: ref(colorContrastHigh),
        ...getMultilineEllipsis(2),
      },
    }),
    ...(hasPriceOriginal && {
      'sr-only': getHiddenTextJssStyle(),
    }),
  });
};
