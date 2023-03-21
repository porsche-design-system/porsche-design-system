import { gridSafeZoneS } from './gridSafeZoneS';
import { gridGap } from './gridGap';

export const gridColumnWidthS = `calc((100% - ${gridSafeZoneS} * 2 - ${gridGap} * 15) / 16)`;
