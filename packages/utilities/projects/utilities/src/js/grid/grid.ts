import { gridGap } from './gridGap';
import { gridMaxWidth, gridMinWidth } from './gridWidth';
import { gridSafeZone } from './gridSafeZone';

// TODO: add named columns (one-third, half, …) + reduce columns on mobile viewport
export const grid = {
  display: 'grid',
  gridGap,
  gridTemplateColumns: `[grid-start] minmax(0, calc(${gridSafeZone} - ${gridGap})) [content-start] repeat(12, minmax(0, 1fr)) [content-end] minmax(0, calc(${gridSafeZone} - ${gridGap})) [grid-end]`,
  minWidth: gridMinWidth,
  maxWidth: gridMaxWidth,
  margin: 0,
  padding: `0 calc((100% - ${gridMaxWidth}) / 2)`,
  boxSizing: 'content-box',
} as const;
