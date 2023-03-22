import { gridGap } from './gridGap';

export const _cssVariableGridExtendedSpanOneHalf = '--pds-grid-extended-span-one-half';
export const _cssVariableGridBasicSpanOneHalf = '--pds-grid-basic-span-one-half';
export const _cssVariableGridBasicSpanOneThird = '--pds-grid-basic-span-one-third';
export const _cssVariableGridBasicSpanTwoThirds = '--pds-grid-basic-span-two-thirds';
export const _cssVariableGridNarrowSpanOneHalf = '--pds-grid-narrow-span-one-half';
export const _cssVariableGridSafeZone = '--pds-internal-grid-safe-zone';

// fluid sizing calculated by https://fluidtypography.com/#app-get-started
export const _gridSafeZoneBase = 'max(22px, 10.625vw - 12px)'; // viewport-width range = 320 - 760px / size range = 22 - 68.75px
export const _gridSafeZoneS = 'calc(5vw - 16px)'; // viewport-width range = 760 - 1920px / size range = 22(22.75) - 80(79.71)px
export const _gridSafeZoneXXL = 'min(50vw - 880px, 400px)'; // viewport-width range = 1920 - 2560px / size range = 80(79.71)px - 400(399.71)px

type GridWidth = 'narrow' | 'basic' | 'extended' | 'wide' | 'full';

const columnMap: { [key in Exclude<GridWidth, 'full' | 'wide'>]: number } = {
  narrow: 4,
  basic: 2,
  extended: 1,
};

export const _gridWidthMin = '320px';
export const _gridWidthMax = '2560px';

const gridColumnWidthS = `calc((100vw - ${_gridSafeZoneS} * 2 - ${gridGap} * 15) / 16)`;
const gridColumnWidthXXL = `calc((min(100vw, ${_gridWidthMax}) - ${_gridSafeZoneXXL} * 2 - ${gridGap} * 15) / 16)`;

export const _gridPadding = `max(0px, 50vw - ${_gridWidthMax} / 2)`;
export const _getOffsetHorizontalS = (width: Exclude<GridWidth, 'full' | 'wide'>): string =>
  `calc(${_gridSafeZoneS} + (${gridGap} + ${gridColumnWidthS}) * ${columnMap[width]})`;
export const _getOffsetHorizontalXXL = (width: Exclude<GridWidth, 'full' | 'wide'>): string =>
  `calc(${_gridPadding} + ${_gridSafeZoneXXL} + (${gridGap} + ${gridColumnWidthXXL}) * ${columnMap[width]})`;
