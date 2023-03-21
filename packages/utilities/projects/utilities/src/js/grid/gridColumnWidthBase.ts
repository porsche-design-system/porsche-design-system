import { gridSafeZoneBase } from './gridSafeZoneBase';
import { gridGap } from './gridGap';
import { gridWidthMin } from './gridWidthMin';

export const gridColumnWidthBase = `calc((max(100%, ${gridWidthMin}) - ${gridSafeZoneBase} * 2 - ${gridGap} * 5) / 6)`;
