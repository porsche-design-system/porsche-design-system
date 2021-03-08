import { mediaQuery } from '@porsche-design-system/utilities';
import type { Styles } from '../../../../utils';
import { attachCss, buildResponsiveJss, getCss } from '../../../../utils';
import type { BreakpointCustomizable } from '../../../../types';
import { paddingBase, paddingM, paddingS } from '../grid/grid-utils';

const GRID_ITEM_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
type GridItemSizeType = typeof GRID_ITEM_SIZES[number];
export type GridItemSize = BreakpointCustomizable<GridItemSizeType>;

const GRID_ITEM_OFFSETS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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

const getSizeStyles = (size: GridItemSizeType): Styles => ({
  width: `${gridItemWidths[size]}% !important`,
});

const getOffsetStyles = (offset: GridItemOffsetType): Styles =>
  offset === 0
    ? {}
    : {
        marginLeft: `${gridItemWidths[offset]}% !important`,
      };

const getJss = (size: GridItemSize, offset: GridItemOffset): Styles => {
  const jss = buildResponsiveJss(size, getSizeStyles);

  for (const [key, styles] of Object.entries(buildResponsiveJss(offset, getOffsetStyles))) {
    jss[key] = Object.assign({}, jss[key], styles);
  }

  return jss;
};

export const addCss = (host: HTMLElement, size: GridItemSize, offset: GridItemOffset): void => {
  const dynamicCss = getCss(getJss(size, offset));
  attachCss(host, baseCss + dynamicCss);
};
