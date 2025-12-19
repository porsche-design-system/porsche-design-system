import {
  AllowedTypes,
  type LinkAriaAttribute,
  type LinkTarget,
  TILE_ALIGNS,
  TILE_ASPECT_RATIOS,
  TILE_SIZES,
  type TILE_WEIGHTS,
  type TileAlign,
  type TileAspectRatio,
  type TileSize,
} from '../../utils';
import type { PropTypes } from '../../utils/validation/validateProps';
import type { ButtonTile } from '../button-tile/button-tile';
import type { LinkTile } from './link-tile';

export type LinkTileTarget = LinkTarget;
export type LinkTileAriaAttribute = LinkAriaAttribute;
export type LinkTileAspectRatio = TileAspectRatio;
export type LinkTileSize = TileSize;
export type LinkTileAlign = TileAlign;
export type LinkTileWeight = (typeof TILE_WEIGHTS)[number];

type CommonButtonAndLinkTileProps = {
  [K in keyof PropTypes<typeof ButtonTile> & keyof PropTypes<typeof LinkTile>]:
    | PropTypes<typeof ButtonTile>[K]
    | PropTypes<typeof LinkTile>[K];
};

export const sharedTilePropTypes: Omit<CommonButtonAndLinkTileProps, 'aria' | 'weight'> = {
  size: AllowedTypes.breakpoint<TileSize>(TILE_SIZES),
  aspectRatio: AllowedTypes.breakpoint<TileAspectRatio>(TILE_ASPECT_RATIOS),
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  align: AllowedTypes.oneOf<TileAlign>(TILE_ALIGNS),
  gradient: AllowedTypes.boolean,
  compact: AllowedTypes.breakpoint('boolean'),
};
