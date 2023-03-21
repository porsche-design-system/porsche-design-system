import type { TileAlign, TileAspectRatio, TileSize, TileWeight } from '../../utils';
import { getCss } from '../../utils';
import { getTileStyles } from '../../styles/tile-styles';
import { getInsetJssStyle } from '../../styles';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import {
  getButtonLinkTileContentStyles,
  getButtonLinkTilePStyles,
  getButtonLinkTileSharedStyles,
} from '../../styles/link-button-tile-styles';
import type { LinkTileWeight } from './link-tile-utils';

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<TileAspectRatio>,
  size: BreakpointCustomizable<TileSize>,
  weight: BreakpointCustomizable<TileWeight | LinkTileWeight>,
  align: TileAlign,
  compact: BreakpointCustomizable<boolean>,
  hasGradient: boolean
): string => {
  return getCss({
    ...getTileStyles({
      aspectRatio,
      additionalGlobalStyles: getButtonLinkTilePStyles(size, weight),
      additionalContentStyles: getButtonLinkTileContentStyles(align, hasGradient, compact),
    }),
    // is used for expanded click-area only
    'link-overlay': {
      position: 'fixed',
      ...getInsetJssStyle(0),
      outline: 0,
    },
    ...getButtonLinkTileSharedStyles(compact),
  });
};
