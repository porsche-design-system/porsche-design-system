import { BreakpointCustomizable } from '../../../../types';

export const GRID_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
export type GridDirectionType = typeof GRID_DIRECTIONS[number];
export type GridDirection = BreakpointCustomizable<GridDirectionType>;

export const GRID_WRAPS = ['nowrap', 'wrap'] as const;
export type GridWrapType = typeof GRID_WRAPS[number];
export type GridWrap = BreakpointCustomizable<GridWrapType>;

export const GRID_GUTTERS = [16, 24, 36] as const;
export type GridGutterType = typeof GRID_GUTTERS[number];
export type GridGutter = BreakpointCustomizable<GridGutterType>;
