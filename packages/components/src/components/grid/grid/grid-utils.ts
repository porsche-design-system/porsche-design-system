export const GRID_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
export type GridDirection = typeof GRID_DIRECTIONS[number];

export const GRID_WRAPS = ['nowrap', 'wrap'] as const;
export type GridWrap = typeof GRID_WRAPS[number];

export const GRID_GUTTERS = [16, 24, 36] as const;
export type GridGutter = typeof GRID_GUTTERS[number];

export const deprecatedGridComponentMessage =
  'Please use native CSS Grid (https://css-tricks.com/snippets/css/complete-guide-grid) instead in combination with the Porsche Grid utility based on CSS Grid.';
