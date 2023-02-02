export const GRID_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
export type GridDirection = typeof GRID_DIRECTIONS[number];

export const GRID_WRAPS = ['nowrap', 'wrap'] as const;
export type GridWrap = typeof GRID_WRAPS[number];

export const GRID_GUTTERS = [16, 24, 36] as const;
export type GridGutter = typeof GRID_GUTTERS[number];
