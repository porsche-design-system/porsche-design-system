import {
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
  proseTextSmStyle,
  radiusLg,
  spacingFluidMd,
  spacingFluidSm,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractGridWrapper = style([
  gridStyle,
  proseTextSmStyle,
  {
    color: vars.primary,
    textAlign: 'center',
  },
]);

export const vanillaExtractSubgrid = style({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  rowGap: spacingFluidMd,
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

export const vanillaExtractPaddingSmall = style({ padding: spacingFluidSm });
export const vanillaExtractRadiusLgStyle = style({ borderRadius: radiusLg });

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
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridExtendedColumnStart} / ${gridExtendedSpanOneHalf}`,
    background: 'rgba(0,255,0,.25)',
  },
]);
export const vanillaExtractExtendedHalfEnd = style([
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridExtendedSpanOneHalf} / ${gridExtendedColumnEnd}`,
    background: 'rgba(0,255,0,.25)',
  },
]);

// Basic subgrid
export const vanillaExtractBasicHalfStart = style([
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneHalf}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicHalfEnd = style([
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicSpanOneHalf} / ${gridBasicColumnEnd}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicThirdStart = style([
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneThird}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicThirdFollow = style([
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicSpanOneThird}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicThirdEnd = style([
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicSpanOneThird} / ${gridBasicColumnEnd}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicTwoThirdsStart = style([
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanTwoThirds}`,
    background: 'rgba(255,0,255,.25)',
  },
]);
export const vanillaExtractBasicTwoThirdsEnd = style([
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridBasicSpanTwoThirds} / ${gridBasicColumnEnd}`,
    background: 'rgba(255,0,255,.25)',
  },
]);

// Narrow subgrid
export const vanillaExtractNarrowHalfStart = style([
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridNarrowColumnStart} / ${gridNarrowSpanOneHalf}`,
    background: 'rgba(255,255,0,.25)',
  },
]);
export const vanillaExtractNarrowHalfEnd = style([
  vanillaExtractRadiusLgStyle,
  vanillaExtractPaddingSmall,
  {
    gridColumn: `${gridNarrowSpanOneHalf} / ${gridNarrowColumnEnd}`,
    background: 'rgba(255,255,0,.25)',
  },
]);
