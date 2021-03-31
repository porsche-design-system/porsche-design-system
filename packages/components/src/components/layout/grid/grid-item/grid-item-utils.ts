import type { BreakpointCustomizable } from '../../../../types';
import type { GetStylesFunction, JssStyle } from '../../../../utils';
import { attachCss, buildResponsiveJss, getCss, mergeDeep, pxToRem } from '../../../../utils';
import type { GridGutter, GridGutterType } from '../grid/grid-utils';

export const GRID_ITEM_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type GridItemSizeType = typeof GRID_ITEM_SIZES[number];
export type GridItemSize = BreakpointCustomizable<GridItemSizeType>;

export const GRID_ITEM_OFFSETS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
type GridItemOffsetType = typeof GRID_ITEM_OFFSETS[number];
export type GridItemOffset = BreakpointCustomizable<GridItemOffsetType>;

const baseCss: string = getCss({
  ':host': {
    boxSizing: 'border-box !important',
  },
});

const gridItemWidths = [
  0,
  8.333333,
  16.666667,
  25,
  33.333333,
  41.666667,
  50,
  58.333333,
  66.666667,
  75,
  83.333333,
  91.666667,
  100,
];

const getSizeStyles: GetStylesFunction = (size: GridItemSizeType): JssStyle => ({
  minWidth: `${gridItemWidths[size]}% !important`,
});

const getOffsetStyles: GetStylesFunction = (offset: GridItemOffsetType): JssStyle => ({
  marginLeft: `${gridItemWidths[offset]}% !important`,
});

const getGutterStyles: GetStylesFunction = (gutter: GridGutterType): JssStyle => {
  const gutterRem = `${pxToRem(gutter) / 2}rem !important`;
  return {
    paddingLeft: gutterRem,
    paddingRight: gutterRem,
  };
};

export const getDynamicCss = (size: GridItemSize, offset: GridItemOffset, gutter: GridGutter): string => {
  return getCss(
    mergeDeep(
      buildResponsiveJss(size, getSizeStyles),
      buildResponsiveJss(offset, getOffsetStyles),
      buildResponsiveJss(gutter, getGutterStyles)
    )
  );
};

export const addCss = (host: HTMLElement, size: GridItemSize, offset: GridItemOffset, gutter: GridGutter): void => {
  attachCss(host, baseCss + getDynamicCss(size, offset, gutter));
};
