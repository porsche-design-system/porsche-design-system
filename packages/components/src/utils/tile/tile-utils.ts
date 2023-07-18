import { THEMES } from '../theme';

export const TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type TileAspectRatio = (typeof TILE_ASPECT_RATIOS)[number];

export const TILE_SIZES = ['default', 'inherit'] as const;
export type TileSize = (typeof TILE_SIZES)[number];

export const TILE_WEIGHTS = ['regular', 'semi-bold'] as const;
export type TileWeight = (typeof TILE_WEIGHTS)[number];

export type TileBackground = (typeof THEMES)[number];

export const TILE_ALIGNS = ['top', 'bottom'] as const;
export type TileAlign = (typeof TILE_ALIGNS)[number];
