// TODO: unit test this
import type { JssStyle } from 'jss';
import { getThemedTypographyColor } from './text-icon-styles';
import {
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  getInsetJssStyle,
  getTransition,
  pxToRemWithUnit,
} from './common-styles';
import { buildResponsiveStyles, buildSlottedStyles, getCss, mergeDeep } from '../utils';
import { getFontWeight } from './font-weight-styles';
import { borderRadiusMedium, fontSizeTextMedium, textLargeStyle } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../utils/breakpoint-customizable';
import { hostHiddenStyles } from './host-hidden-styles';
import { hoverMediaQuery } from './hover-media-query';

export const LINK_BUTTON_TILE_WEIGHTS = ['regular', 'semibold'] as const;
export type LinkButtonTileWeight = typeof LINK_BUTTON_TILE_WEIGHTS[number];

export const LINK_BUTTON_TILE_SIZES = ['default', 'inherit'] as const;
export type LinkButtonTileSize = typeof LINK_BUTTON_TILE_SIZES[number];
export const LINK_BUTTON_TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type LinkButtonTileAspectRatio = typeof LINK_BUTTON_TILE_ASPECT_RATIOS[number];

const aspectRatioPaddingTop: Record<LinkButtonTileAspectRatio, string> = {
  '1:1': '100%',
  '4:3': '75%',
  '3:4': '133.33%',
  '16:9': '56.25%',
  '9:16': '177.75%',
};

const sizeMap: {
  inherit: { fontSize: string };
  default: { fontSize: string };
} = {
  inherit: {
    fontSize: 'inherit',
  },
  default: { fontSize: fontSizeTextMedium },
};

export const getLinkButtonTileHostAndSlottedStyles = (): JssStyle => ({
  ':host': {
    display: 'block',
    ...addImportantToEachRule(hostHiddenStyles),
  },
  ...addImportantToEachRule({
    '::slotted(picture),::slotted(img)': {
      transition: getTransition('transform'),
      ...getBackfaceVisibilityJssStyle(),
    },
    '::slotted(picture)': {
      position: 'absolute',
      ...getInsetJssStyle(0),
    },
    '::slotted(img)': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  }),
});

export const getLinkButtonTilePStyles = (
  size: BreakpointCustomizable<LinkButtonTileSize>,
  weight: BreakpointCustomizable<LinkButtonTileWeight>
): JssStyle => ({
  p: {
    color: getThemedTypographyColor('dark', 'primary'),
    maxWidth: pxToRemWithUnit(550), // in this case rem unit makes sense to scale up available space
    margin: 0,
    ...textLargeStyle,
    ...mergeDeep(
      buildResponsiveStyles(size, (s: LinkButtonTileSize) => sizeMap[s]),
      buildResponsiveStyles(weight, (w: LinkButtonTileWeight) => ({ fontWeight: getFontWeight(w) }))
    ),
  },
});

export const getLinkButtonTileRootStyles = (
  aspectRatio: BreakpointCustomizable<LinkButtonTileAspectRatio>
): JssStyle => ({
  height: 0,
  position: 'relative',
  transform: 'translate3d(0,0,0)', // Change stacking context for position fixed
  ...hoverMediaQuery({
    '&:hover': {
      '& ::slotted(picture),::slotted(img)': addImportantToEachRule({
        transform: 'scale3d(1.05, 1.05, 1.05)',
      }),
    },
  }),
  ...buildResponsiveStyles(aspectRatio, (ratio: LinkButtonTileAspectRatio) => ({
    paddingTop: aspectRatioPaddingTop[ratio],
  })),
});

export const linkButtonTileImageContainerStyles = {
  position: 'absolute',
  overflow: 'hidden',
  borderRadius: borderRadiusMedium,
  ...getInsetJssStyle(0),
};

export const linkButtonTileLinkOverlayStyles = {
  position: 'fixed',
  ...getInsetJssStyle(0),
  outline: 0,
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      '& picture > img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    })
  );
};
