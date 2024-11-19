import {
  type LinkAriaAttribute,
  type TileAlign,
  type TileAspectRatio,
  type TileBackground,
  type TileSize,
  type LinkTarget,
  AllowedTypes,
  THEMES,
  TILE_ALIGNS,
  TILE_ASPECT_RATIOS,
  TILE_SIZES,
  TILE_WEIGHTS,
} from '../../utils';
import type { PropTypes } from '../../utils/validation/validateProps';
import type { ButtonTile } from '../button-tile/button-tile';
import type { LinkTile } from './link-tile';

export type LinkTileTarget = LinkTarget;
export type LinkTileAriaAttribute = LinkAriaAttribute;
export type LinkTileAspectRatio = TileAspectRatio;
export type LinkTileSize = TileSize;
export type LinkTileBackground = TileBackground;
export type LinkTileAlign = TileAlign;
/** @deprecated */
export const LINK_TILE_WEIGHTS_DEPRECATED = ['semibold'] as const;
export const LINK_TILE_WEIGHTS = [...TILE_WEIGHTS, ...LINK_TILE_WEIGHTS_DEPRECATED] as const;
export type LinkTileWeight = (typeof LINK_TILE_WEIGHTS)[number];

type CommonButtonAndLinkTileProps = {
  [K in keyof PropTypes<typeof ButtonTile> & keyof PropTypes<typeof LinkTile>]:
    | PropTypes<typeof ButtonTile>[K]
    | PropTypes<typeof LinkTile>[K];
};

export const sharedTilePropTypes: Omit<CommonButtonAndLinkTileProps, 'aria' | 'weight'> = {
  size: AllowedTypes.breakpoint<TileSize>(TILE_SIZES),
  background: AllowedTypes.oneOf<TileBackground>(THEMES),
  aspectRatio: AllowedTypes.breakpoint<TileAspectRatio>(TILE_ASPECT_RATIOS),
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  align: AllowedTypes.oneOf<TileAlign>(TILE_ALIGNS),
  gradient: AllowedTypes.boolean,
  compact: AllowedTypes.breakpoint('boolean'),
};
