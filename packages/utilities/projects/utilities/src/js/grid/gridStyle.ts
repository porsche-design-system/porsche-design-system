import { gridGap } from './gridGap';
import { gridWidth } from './gridWidth';
import { gridSafeZone } from './gridSafeZone';
import { getMediaQueryMin } from '../mediaQuery';

// TODO: add named columns (one-third, half, …) + reduce columns on mobile viewport
// TODO: add gridFullWidth, gridExtended, gridBasic (because subgrid does not exist)
const { min: minWidth, max: maxWidth } = gridWidth;

export const gridStyle = {
  '--pds-grid-span-one-half': 'span 3',
  '--pds-grid-span-one-third': 'span 2',
  '--pds-grid-span-two-thirds': 'span 4',
  '--pds-grid-span-one-quarter': 'span 1',
  '--pds-grid-span-three-quarters': 'span 5',
  display: 'grid',
  gridGap,
  gridTemplateColumns: `[fluid-start] minmax(0, calc(${gridSafeZone} - ${gridGap}))
    [extended-start basic-start] repeat(6, minmax(0, 1fr)) [basic-end extended-end]
  minmax(0, calc(${gridSafeZone} - ${gridGap})) [fluid-end]`,
  minWidth,
  maxWidth,
  margin: 0,
  padding: `0 calc((100% - ${maxWidth}) / 2)`,
  boxSizing: 'content-box',
  [getMediaQueryMin('s')]: {
    '--pds-grid-span-one-half': 'span 6',
    '--pds-grid-span-one-third': 'span 4',
    '--pds-grid-span-two-thirds': 'span 8',
    '--pds-grid-span-one-quarter': 'span 3',
    '--pds-grid-span-three-quarters': 'span 9',
    gridTemplateColumns: `[fluid-start] minmax(0, calc(${gridSafeZone} - ${gridGap}))
    [extended-start] minmax(0, 1fr)
        [basic-start] repeat(12, minmax(0, 1fr)) [basic-end]
    minmax(0, 1fr) [extended-end]
  minmax(0, calc(${gridSafeZone} - ${gridGap})) [fluid-end]`,
  },
} as const;
