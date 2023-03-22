import type { BreakpointCustomizable } from '../utils/breakpoint-customizable';
import type { JssStyle, Styles } from 'jss';
import type { TileAlign, TileSize, TileWeight } from '../utils';
import { getThemedTypographyColor } from './text-icon-styles';
import { pxToRemWithUnit } from './';
import {
  fontSizeTextMedium,
  gradientToBottomStyle,
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  textLargeStyle,
} from '@porsche-design-system/utilities-v2';
import type { LinkTileWeight } from '../components/link-tile/link-tile-utils';
import { buildResponsiveStyles, mergeDeep } from '../utils';
import { getFontWeight } from './font-weight-styles';

const getGradientBackground = (isCompact: BreakpointCustomizable<boolean>, isTopAligned: boolean): JssStyle => {
  return isCompact && isTopAligned ? gradientToBottomStyle : gradientToTopStyle;
};

const sizeMap: Record<TileSize, { fontSize: string }> = {
  inherit: { fontSize: 'inherit' },
  default: { fontSize: fontSizeTextMedium },
};

export const getButtonLinkTilePStyles = (
  size: BreakpointCustomizable<TileSize>,
  weight: BreakpointCustomizable<TileWeight | LinkTileWeight>
): Styles => ({
  p: {
    color: getThemedTypographyColor('dark', 'primary'),
    maxWidth: pxToRemWithUnit(550), // in this case rem unit makes sense to scale up available space
    margin: 0,
    ...textLargeStyle,
    ...mergeDeep(
      buildResponsiveStyles(size, (s: TileSize) => sizeMap[s]),
      buildResponsiveStyles(weight, (w: TileWeight | LinkTileWeight) => ({
        fontWeight: getFontWeight(w === 'semibold' ? 'semi-bold' : w), // mapping of the deprecated weight semibold
      }))
    ),
  },
});

export const getButtonLinkTileAdditionalContentStyles = (
  align: TileAlign,
  hasGradient: boolean,
  compact: BreakpointCustomizable<boolean>
): JssStyle => {
  const isTopAligned = align === 'top';
  return {
    display: 'grid',
    ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
    padding:
      align === 'bottom'
        ? `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`
        : `${spacingFluidMedium} ${spacingFluidMedium} ${spacingFluidLarge}`,
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
  };
};

export const getButtonLinkTileSharedClassesStyles = (compact: BreakpointCustomizable<boolean>): Styles => ({
  'link-or-button-pure': buildResponsiveStyles(compact, (isCompact: boolean) => ({
    display: isCompact ? 'inline-block' : 'none',
  })),
  'link-or-button': {
    minHeight: '54px', // prevent content shift
    ...buildResponsiveStyles(compact, (isCompact: boolean) => ({ display: isCompact ? 'none' : 'inline-block' })),
  },
});
