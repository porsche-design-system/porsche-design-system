import type { GetStylesFunction, JssStyle } from '../../../../utils';
import {
  addImportantToEachRule,
  attachComponentCss,
  buildHostStyles,
  buildResponsiveHostStyles,
  getCss,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../../utils';
import type { GridGutter, GridGutterType } from '../grid/grid-utils';
import type { GridItemOffset, GridItemOffsetType, GridItemSize, GridItemSizeType } from './grid-item-utils';

const gridItemWidths = [
  0, 8.333333, 16.666667, 25, 33.333333, 41.666667, 50, 58.333333, 66.666667, 75, 83.333333, 91.666667, 100,
];

const getSizeStyles: GetStylesFunction = (size: GridItemSizeType): JssStyle => ({
  width: `${gridItemWidths[size]}%`,
  minWidth: `${gridItemWidths[size]}%`,
});

const getOffsetStyles: GetStylesFunction = (offset: GridItemOffsetType): JssStyle => ({
  marginLeft: `${gridItemWidths[offset]}%`,
});

const getGutterStyles: GetStylesFunction = (gutter: GridGutterType): JssStyle => {
  const gutterRem = pxToRemWithUnit(gutter / 2);
  return {
    paddingLeft: gutterRem,
    paddingRight: gutterRem,
  };
};

export const getComponentCss = (size: GridItemSize, offset: GridItemOffset, gutter: GridGutter): string => {
  return getCss(
    addImportantToEachRule(
      mergeDeep(
        buildHostStyles({
          boxSizing: 'border-box',
        }),
        buildResponsiveHostStyles(size, getSizeStyles),
        buildResponsiveHostStyles(offset, getOffsetStyles),
        buildResponsiveHostStyles(gutter, getGutterStyles)
      )
    )
  );
};

export const addComponentCss = (
  host: HTMLElement,
  size: GridItemSize,
  offset: GridItemOffset,
  gutter: GridGutter
): void => {
  attachComponentCss(host, getComponentCss, size, offset, gutter);
};
