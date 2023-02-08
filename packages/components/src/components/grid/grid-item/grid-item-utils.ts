export const GRID_ITEM_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type GridItemSize = typeof GRID_ITEM_SIZES[number];

export const GRID_ITEM_OFFSETS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export type GridItemOffset = typeof GRID_ITEM_OFFSETS[number];
