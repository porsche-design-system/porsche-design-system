export const LINK_BUTTON_TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type LinkButtonTileAspectRatio = typeof LINK_BUTTON_TILE_ASPECT_RATIOS[number];
