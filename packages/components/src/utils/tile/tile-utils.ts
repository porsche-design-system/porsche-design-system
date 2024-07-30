import { THEMES } from '../theme';

/** @deprecated */
export const TILE_ASPECT_RATIOS_DEPRECATED = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export const TILE_ASPECT_RATIOS = ['1/1', '4/3', '3/4', '16/9', '9/16', ...TILE_ASPECT_RATIOS_DEPRECATED] as const;
export type TileAspectRatio = (typeof TILE_ASPECT_RATIOS)[number];

/** @deprecated */
export const TILE_SIZES_DEPRECATED = ['default'] as const;
export const TILE_SIZES = ['medium', 'large', 'inherit', ...TILE_SIZES_DEPRECATED] as const;
export type TileSize = (typeof TILE_SIZES)[number];

export const TILE_WEIGHTS = ['regular', 'semi-bold'] as const;
export type TileWeight = (typeof TILE_WEIGHTS)[number];

export type TileBackground = (typeof THEMES)[number];

export const TILE_ALIGNS = ['top', 'bottom'] as const;
export type TileAlign = (typeof TILE_ALIGNS)[number];
