import { JssStyle } from 'jss';
import type { BreakpointCustomizable } from '../../types';
import type { LinkTileAlign } from './link-tile-utils';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
import {
  spacingFluidMedium,
  spacingStaticMedium,
  spacingFluidLarge,
  borderRadiusMedium,
  gradientToBottomStyle,
  gradientToTopStyle,
} from '@porsche-design-system/utilities-v2';
import type {
  LinkButtonTileAspectRatio,
  LinkButtonTileSize,
  LinkButtonTileWeight,
} from '../../styles/link-button-tile-styles';
import {
  getLinkButtonTilePStyles,
  getLinkButtonTileHostAndSlottedStyles,
  linkButtonTileLinkOverlayStyles,
  linkButtonTileImageContainerStyles,
  getLinkButtonTileRootStyles,
} from '../../styles/link-button-tile-styles';

const getGradientBackground = (isCompact: BreakpointCustomizable<boolean>, isTopAligned: boolean): JssStyle => {
  return isCompact && isTopAligned ? gradientToBottomStyle : gradientToTopStyle;
};

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkButtonTileAspectRatio>,
  size: BreakpointCustomizable<LinkButtonTileSize>,
  weight: BreakpointCustomizable<LinkButtonTileWeight>,
  align: LinkTileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean
): string => {
  const isTopAligned = align === 'top';
  return getCss({
    '@global': {
      ...getLinkButtonTileHostAndSlottedStyles(),
      ...getLinkButtonTilePStyles(size, weight),
    },
    root: getLinkButtonTileRootStyles(aspectRatio),
    'image-container': linkButtonTileImageContainerStyles,
    content: {
      position: 'absolute',
      ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
      left: 0,
      right: 0,
      display: 'grid',
      justifyItems: 'start',
      borderRadius: borderRadiusMedium,
      padding:
        align === 'bottom'
          ? `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`
          : `${spacingFluidMedium} ${spacingFluidMedium} ${spacingFluidLarge}`,

      gap: spacingStaticMedium,
      ...mergeDeep(
        hasGradient &&
          buildResponsiveStyles(compact, (isCompact: boolean) => getGradientBackground(isCompact, isTopAligned)),
        buildResponsiveStyles(compact, (isCompact: boolean) =>
          isCompact
            ? {
                alignItems: 'center',
                gridTemplateColumns: 'auto 24px',
                gridTemplateRows: 'auto',
                ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
              }
            : { gridTemplateRows: 'auto auto', gridTemplateColumns: 'auto' }
        )
      ),
      '@media (forced-colors: active)': {
        background: 'rgba(0,0,0,0.7)',
      },
    },
    'link-pure': buildResponsiveStyles(compact, (isCompact: boolean) => ({
      display: isCompact ? 'inline-block' : 'none',
    })),
    link: {
      minHeight: '54px', // prevent content shift
      ...buildResponsiveStyles(compact, (isCompact: boolean) => ({ display: isCompact ? 'none' : 'inline-block' })),
    },
    // is used for expanded click-area only
    'link-overlay': linkButtonTileLinkOverlayStyles,
  });
};
