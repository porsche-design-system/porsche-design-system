import { gridWidthMax } from './gridWidthMax';
import { gridSafeZoneXXL } from './gridSafeZoneXXL';
import { gridGap } from './gridGap';

export const gridColumnWidthXXL = `calc((min(100%, ${gridWidthMax}) - ${gridSafeZoneXXL} * 2 - ${gridGap} * 15) / 16)`;
