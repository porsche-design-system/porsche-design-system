import { mediaQuery } from '@porsche-design-system/utilities';
import type { BreakpointCustomizable } from '../../../../types';
import type { GetStylesFunction, JssStyle } from '../../../../utils';
import { attachCss, buildResponsiveJss, getCss, mergeDeep } from '../../../../utils';
import { paddingBase, paddingM, paddingS } from '../grid/grid-utils';

export const GRID_ITEM_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type GridItemSizeType = typeof GRID_ITEM_SIZES[number];
export type GridItemSize = BreakpointCustomizable<GridItemSizeType>;

export const GRID_ITEM_OFFSETS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
type GridItemOffsetType = typeof GRID_ITEM_OFFSETS[number];
export type GridItemOffset = BreakpointCustomizable<GridItemOffsetType>;

const baseCss: string = getCss({
  ':host': {
    boxSizing: 'border-box !important',
    paddingLeft: paddingBase,
    paddingRight: paddingBase,
  },
  [mediaQuery('s')]: {
    ':host': {
      paddingLeft: paddingS,
      paddingRight: paddingS,
    },
  },
  [mediaQuery('m')]: {
    ':host': {
      paddingLeft: paddingM,
      paddingRight: paddingM,
    },
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
  width: `${gridItemWidths[size]}% !important`,
});

const getOffsetStyles: GetStylesFunction = (offset: GridItemOffsetType): JssStyle => ({
  marginLeft: `${gridItemWidths[offset]}% !important`,
});

export const getDynamicCss = (size: GridItemSize, offset: GridItemOffset): string => {
  return getCss(mergeDeep(buildResponsiveJss(size, getSizeStyles), buildResponsiveJss(offset, getOffsetStyles)));
};

export const addCss = (host: HTMLElement, size: GridItemSize, offset: GridItemOffset): void => {
  attachCss(host, baseCss + getDynamicCss(size, offset));
};
