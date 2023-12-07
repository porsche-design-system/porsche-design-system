import { LinkTarget } from '../../utils/link-button/link-target';
import { TileAspectRatio } from '../../utils';

export type LinkTileProductTarget = LinkTarget;
export type LinkTileProductLikeEvent = {
  liked: boolean;
};

export const TILE_PRODUCT_ASPECT_RATIOS = ['3:4', '9:16'] as const;
export type LinkTileProductAspectRatio = Extract<TileAspectRatio, (typeof TILE_PRODUCT_ASPECT_RATIOS)[number]>;

export const headerSlot = 'header';
