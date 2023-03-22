import type { TileAlign, TileAspectRatio, TileSize, TileWeight } from '../../utils';
import { getCss } from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import {
  getButtonLinkTileAdditionalContentStyles,
  getButtonLinkTilePStyles,
  getButtonLinkTileSharedClassesStyles,
} from '../../styles/link-button-tile-styles';
import { getTileStyles } from '../../styles/tile-styles';

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<TileAspectRatio>,
  size: BreakpointCustomizable<TileSize>,
  weight: BreakpointCustomizable<TileWeight>,
  align: TileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean,
  isDisabled: boolean,
  isDisabledOrLoading: boolean
): string => {
  return getCss({
    ...getTileStyles({
      aspectRatio,
      isDisabled,
      additionalHostStyles: { cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer' },
      additionalGlobalStyles: getButtonLinkTilePStyles(size, weight),
      additionalContentStyles: getButtonLinkTileAdditionalContentStyles(align, hasGradient, compact),
    }),
    ...getButtonLinkTileSharedClassesStyles(compact),
  });
};
