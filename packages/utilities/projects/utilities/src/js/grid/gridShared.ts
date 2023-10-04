export const _cssVariableGridExtendedSpanOneHalf = '--pds-grid-extended-span-one-half';
export const _cssVariableGridBasicSpanOneHalf = '--pds-grid-basic-span-one-half';
export const _cssVariableGridBasicSpanOneThird = '--pds-grid-basic-span-one-third';
export const _cssVariableGridBasicSpanTwoThirds = '--pds-grid-basic-span-two-thirds';
export const _cssVariableGridNarrowSpanOneHalf = '--pds-grid-narrow-span-one-half';
export const _cssVariableGridSafeZone = '--pds-internal-grid-safe-zone';
export const _cssVariableGridOuterColumn = '--pds-internal-grid-outer-column';
export const _cssVariableGridMargin = '--pds-internal-grid-margin';

export const _gridWidthMin = '320px';
export const _gridWidthMax = '2560px';

// fluid sizing calculated by https://fluidtypography.com/#app-get-started
export const _gridSafeZoneBase = 'max(22px, 10.625vw - 12px)'; // viewport-width range = 320 - 760px / size range = 22 - 68.75px
export const _gridSafeZoneS = 'calc(5vw - 16px)'; // viewport-width range = 760 - 1920px / size range = 22(22.75) - 80(79.71)px
export const _gridSafeZoneXXL = 'min(50vw - 880px, 400px)'; // viewport-width range = 1920 - 2560px / size range = 80(79.71)px - 400(399.71)px
