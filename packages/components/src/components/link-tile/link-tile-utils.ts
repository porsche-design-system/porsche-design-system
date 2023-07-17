import { TILE_WEIGHTS, AllowedTypes, TILE_SIZES, TILE_ASPECT_RATIOS, TILE_ALIGNS, THEMES } from '../../utils';
import type { TileAlign, TileAspectRatio, TileSize, TileBackground } from '../../utils';
import type { LinkTarget } from '../../utils/link-button/link-target';
import type { LinkAriaAttribute } from '../link/link-utils';
import type { PropTypes } from '../../utils/validation/validateProps';
import { ButtonTile } from '../button-tile/button-tile';
import { LinkTile } from './link-tile';

/** @deprecated */
export type LinkTileWeightDeprecated = 'semibold';

export type LinkTileTarget = LinkTarget;
export type LinkTileAriaAttribute = LinkAriaAttribute;
export type LinkTileAspectRatio = TileAspectRatio;
export type LinkTileSize = TileSize;
export type LinkTileBackground = TileBackground;
export type LinkTileAlign = TileAlign;
export const LINK_TILE_WEIGHTS = [...TILE_WEIGHTS, 'semibold'] as const;
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
