import type { Styles } from 'jss';
import type { Theme, TileAlign, TileAspectRatio, TileBackground, TileSize, TileWeight } from '../../utils';
import type { LinkTileWeight } from '../../components/link-tile/link-tile-utils';
import type { BreakpointCustomizable } from '../../types';
import { pxToRemWithUnit } from '../';
import {
  fontSizeTextMedium,
  gradientToBottomStyle,
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  textLargeStyle,
} from '@porsche-design-system/utilities-v2';
import { buildResponsiveStyles, mergeDeep } from '../../utils';
import { getFontWeight } from '../font-weight-styles';
import { getTileBaseStyles } from './tile-base-styles';
import { getThemedColors } from '../../styles';

const sizeMap: Record<TileSize, { fontSize: string }> = {
  inherit: { fontSize: 'inherit' },
  default: { fontSize: fontSizeTextMedium },
};

export const getButtonLinkTileStyles = (
  aspectRatio: BreakpointCustomizable<TileAspectRatio>,
  size: BreakpointCustomizable<TileSize>,
  weight: BreakpointCustomizable<TileWeight | LinkTileWeight>, // to get deprecated semibold typed
  background: BreakpointCustomizable<TileBackground>,
  align: TileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean,
  isDisabled?: boolean
): Styles => {
  const isTopAligned = align === 'top';

  return {
    ...mergeDeep(getTileBaseStyles(aspectRatio, isDisabled), {
      '@global': {
        p: {
          maxWidth: pxToRemWithUnit(550), // in this case rem unit makes sense to scale up available space
          margin: 0,
          ...textLargeStyle,
          ...mergeDeep(
            buildResponsiveStyles(size, (s: TileSize) => sizeMap[s]),
            buildResponsiveStyles(weight, (w: TileWeight | LinkTileWeight) => ({
              fontWeight: getFontWeight(w === 'semibold' ? 'semi-bold' : w), // mapping of the deprecated weight semibold
            }))
          ),
          ...buildResponsiveStyles(background, (b: Theme) =>
            b === 'dark'
              ? { color: getThemedColors('dark').primaryColor }
              : { color: getThemedColors('light').primaryColor }
          ),
        },
      },
      content: {
        display: 'grid', // TODO: flex via getTileBaseStyles
        ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
        padding: isTopAligned
          ? `${spacingFluidMedium} ${spacingFluidMedium} ${spacingFluidLarge}`
          : `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`,
        ...mergeDeep(
          hasGradient &&
            background === 'dark' &&
            buildResponsiveStyles(compact, (isCompact: boolean) =>
              isCompact && isTopAligned ? gradientToBottomStyle : gradientToTopStyle
            ),
          buildResponsiveStyles(compact, (isCompact: boolean) =>
            isCompact // TODO: use flex
              ? {
                  alignItems: 'center',
                  gridTemplateColumns: 'auto 24px',
                  gridTemplateRows: 'auto',
                  ...(isTopAligned ? { top: 0 } : { bottom: 0 }),
                }
              : {
                  gridTemplateRows: 'auto auto',
                  gridTemplateColumns: 'auto',
                }
          )
        ),
      },
      'link-or-button-pure': buildResponsiveStyles(compact, (isCompact: boolean) => ({
        display: isCompact ? 'inline-block' : 'none',
      })),
      'link-or-button': {
        minHeight: '54px', // prevent content shift
        ...buildResponsiveStyles(compact, (isCompact: boolean) => ({
          display: isCompact ? 'none' : 'inline-block',
        })),
      },
    }),
  };
};
