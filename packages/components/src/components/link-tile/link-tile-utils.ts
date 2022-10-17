export const LINK_TILE_WEIGHTS = ['regular', 'semibold', 'bold'] as const;
export type LinkTileWeight = typeof LINK_TILE_WEIGHTS[number];

export const LINK_TILE_ALIGN = ['top', 'bottom'] as const;
export type LinkTileAlign = typeof LINK_TILE_ALIGN[number];

export const LINK_TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type LinkTileAspectRatio = typeof LINK_TILE_ASPECT_RATIOS[number];
