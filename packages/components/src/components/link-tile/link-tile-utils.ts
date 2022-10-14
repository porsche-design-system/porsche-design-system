export const TILE_LINK_WEIGHTS = ['regular', 'semibold', 'bold'] as const;
export type TileLinkWeight = typeof TILE_LINK_WEIGHTS[number];

export const TILE_LINK_ALIGN = ['top', 'bottom'] as const;
export type TileLinkAlign = typeof TILE_LINK_ALIGN[number];

export const LINK_TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type LinkTileAspectRatio = typeof LINK_TILE_ASPECT_RATIOS[number];
