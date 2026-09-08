import type { LinkTarget } from '../../utils';

export type LinkTileProductTarget = LinkTarget;
export type LinkTileProductLikeEventDetail = {
  liked: boolean;
};

export const TILE_PRODUCT_ASPECT_RATIOS = ['3/4', '9/16'] as const;
export type LinkTileProductAspectRatio = (typeof TILE_PRODUCT_ASPECT_RATIOS)[number];

export const headerSlot = 'header';
export const anchorSlot = 'anchor';
