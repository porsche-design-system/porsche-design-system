import { _gridSafeZoneS, _gridSafeZoneXXL, _gridWidthMax } from './gridShared';
import { gridGap } from './gridGap';

type GridWidth = 'narrow' | 'basic' | 'extended' | 'wide' | 'full';

const columnMap: { [key in Exclude<GridWidth, 'full' | 'wide'>]: number } = {
  narrow: 4,
  basic: 2,
  extended: 1,
};

const gridColumnWidthS = `calc((100vw - ${_gridSafeZoneS} * 2 - ${gridGap} * 15) / 16)`;
const gridColumnWidthXXL = `calc((min(100vw, ${_gridWidthMax}) - ${_gridSafeZoneXXL} * 2 - ${gridGap} * 15) / 16)`;

export const _gridPadding = `max(0px, 50vw - ${_gridWidthMax} / 2)`;
export const _getGridOffsetS = (width: Exclude<GridWidth, 'full' | 'wide'>): string =>
  `calc(${_gridSafeZoneS} + (${gridGap} + ${gridColumnWidthS}) * ${columnMap[width]})`;
export const _getGridOffsetXXL = (width: Exclude<GridWidth, 'full' | 'wide'>): string =>
  `calc(${_gridPadding} + ${_gridSafeZoneXXL} + (${gridGap} + ${gridColumnWidthXXL}) * ${columnMap[width]})`;
