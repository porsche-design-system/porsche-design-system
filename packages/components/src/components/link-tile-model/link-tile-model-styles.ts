import { buildResponsiveStyles, getCss } from '../../utils';
import { pxToRemWithUnit } from '../../styles';
import { getThemedTypographyColor } from '../../styles/text-icon-styles';
import type { BreakpointCustomizable } from '../../types';
import type { LinkTileModelAspectRatio } from './link-tile-model-utils';
import { getFontWeight } from '../../styles/font-weight-styles';
import {
  borderRadiusMedium,
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  spacingStaticXSmall,
  textLargeStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { FlexDirections } from '../../styles/flex-direction-styles';
import { getFlexDirectionStyle } from '../../styles/flex-direction-styles';
import type { LinkButtonTileWeight } from '../../styles/link-button-tile-styles';
import {
  getLinkButtonTileHostAndSlottedStyles,
  getLinkButtonTileRootStyles,
  linkButtonTileImageContainerStyles,
  linkButtonTileLinkOverlayStyles,
} from '../../styles/link-button-tile-styles';

// TODO: Make styles also optional if elements are not rendered?
export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkTileModelAspectRatio>,
  weight: BreakpointCustomizable<LinkButtonTileWeight>,
  direction: BreakpointCustomizable<FlexDirections>
): string => {
  return getCss({
    '@global': {
      ...getLinkButtonTileHostAndSlottedStyles(),
    },
    root: getLinkButtonTileRootStyles(aspectRatio),
    'image-container': linkButtonTileImageContainerStyles,
    // is used for expanded click-area only
    'link-overlay': linkButtonTileLinkOverlayStyles,
    signature: {
      position: 'absolute',
      top: spacingFluidMedium,
      left: spacingFluidMedium,
    },
    content: {
      position: 'absolute',
      display: 'grid',
      bottom: 0,
      left: 0,
      right: 0,
      justifyItems: 'start',
      borderRadius: borderRadiusMedium,
      padding: `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`,
      gap: spacingStaticMedium,
      gridTemplateRows: 'auto auto',
      gridTemplateColumns: 'auto',
      '@media (forced-colors: active)': {
        background: 'rgba(0,0,0,0.7)',
      },
      ...gradientToTopStyle,
    },
    'description-group': {
      gap: spacingStaticXSmall,
    },
    description: {
      color: getThemedTypographyColor('dark', 'primary'),
      maxWidth: pxToRemWithUnit(550), // in this case rem unit makes sense to scale up available space
      margin: 0,
      ...textLargeStyle,
      ...buildResponsiveStyles(weight, (w: LinkButtonTileWeight) => ({ fontWeight: getFontWeight(w) })),
    },
    'sub-description': {
      color: getThemedTypographyColor('dark', 'primary'),
      maxWidth: pxToRemWithUnit(550), // in this case rem unit makes sense to scale up available space
      margin: 0,
      ...textSmallStyle,
    },
    link: {
      minHeight: '54px', // prevent content shift
    },
    'link-group': {
      display: 'flex',
      width: '100%',
      gap: spacingFluidSmall,
      ...buildResponsiveStyles(direction, getFlexDirectionStyle),
    },
  });
};
