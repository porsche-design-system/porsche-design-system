import {
  borderRadiusLarge,
  gridBasicColumnEnd,
  gridBasicColumnStart,
  gridBasicSpanOneHalf,
  gridBasicSpanOneThird,
  gridBasicSpanTwoThirds,
  gridExtendedColumnEnd,
  gridExtendedColumnStart,
  gridExtendedSpanOneHalf,
  gridFullColumnEnd,
  gridFullColumnStart,
  gridNarrowColumnEnd,
  gridNarrowColumnStart,
  gridNarrowSpanOneHalf,
  gridStyle,
  gridWideColumnEnd,
  gridWideColumnStart,
  spacingFluidMedium,
  spacingFluidSmall,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractGridWrapper = style([
  gridStyle,
  textSmallStyle,
  {
    color: vars.primary,
    textAlign: 'center',
  },
]);

export const vanillaExtractSubgrid = style({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  rowGap: spacingFluidMedium,
});
export const vanillaExtractSubgridExtended = style([
  vanillaExtractSubgrid,
  { gridColumn: `${gridExtendedColumnStart} / ${gridExtendedColumnEnd}` },
]);
export const vanillaExtractSubgridBasic = style([
  vanillaExtractSubgrid,
  { gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}` },
]);
export const vanillaExtractSubgridNarrow = style([
  vanillaExtractSubgrid,
  { gridColumn: `${gridNarrowColumnStart} / ${gridNarrowColumnEnd}` },
]);

export const vanillaExtractPaddingSmall = style({ padding: spacingFluidSmall });
export const vanillaExtractBorderRadiusLargeStyle = style({ borderRadius: borderRadiusLarge });

// Main columns
export const vanillaExtractFull = style({
  gridColumn: `${gridFullColumnStart} / ${gridFullColumnEnd}`,
  background: 'rgba(0,0,255,.25)',
});
export const vanillaExtractWide = style({
  gridColumn: `${gridWideColumnStart} / ${gridWideColumnEnd}`,
  background: 'rgba(0,255,255,.25)',
});
export const vanillaExtractExtended = style({
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedColumnEnd}`,
  background: 'rgba(0,255,0,.25)',
});
export const vanillaExtractBasic = style({
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  background: 'rgba(255,0,255,.25)',
});
export const vanillaExtractNarrow = style({
  gridColumn: `${gridNarrowColumnStart} / ${gridNarrowColumnEnd}`,
  background: 'rgba(255,255,0,.25)',
});

// Extended subgrid
export const vanillaExtractExtendedHalfStart = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridExtendedColumnStart} / ${gridExtendedSpanOneHalf}`,
    background: 'rgba(0,255,0,.25)',
  },
]);
export const vanillaExtractExtendedHalfEnd = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridExtendedSpanOneHalf} / ${gridExtendedColumnEnd}`,
    background: 'rgba(0,255,0,.25)',
  },
]);

// Basic subgrid
export const vanillaExtractBasicHalfStart = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneHalf}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicHalfEnd = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicSpanOneHalf} / ${gridBasicColumnEnd}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicThirdStart = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneThird}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicThirdFollow = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicSpanOneThird}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicThirdEnd = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicSpanOneThird} / ${gridBasicColumnEnd}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicTwoThirdsStart = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanTwoThirds}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicTwoThirdsEnd = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicSpanTwoThirds} / ${gridBasicColumnEnd}`,
    background: 'rgba(255,0,255,.25)',
  },
]);

// Narrow subgrid
export const vanillaExtractNarrowHalfStart = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridNarrowColumnStart} / ${gridNarrowSpanOneHalf}`,
    background: 'rgba(255,255,0,.25)',
  },
]);
export const vanillaExtractNarrowHalfEnd = style([
  vanillaExtractBorderRadiusLargeStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridNarrowSpanOneHalf} / ${gridNarrowColumnEnd}`,
    background: 'rgba(255,255,0,.25)',
  },
]);
