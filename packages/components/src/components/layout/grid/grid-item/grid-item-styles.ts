import type { GetStylesFunction, JssStyle } from '../../../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  attachCss,
  buildHostStyles,
  buildResponsiveJss,
  getCss,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../../utils';
import type { GridGutter, GridGutterType } from '../grid/grid-utils';
import type { GridItemOffset, GridItemOffsetType, GridItemSize, GridItemSizeType } from './grid-item-utils';

const baseCss: string = getCss(
  buildHostStyles(
    addImportantToEachRule({
      boxSizing: 'border-box',
    })
  )
);

const gridItemWidths = [
  0, 8.333333, 16.666667, 25, 33.333333, 41.666667, 50, 58.333333, 66.666667, 75, 83.333333, 91.666667, 100,
];

const getSizeStyles: GetStylesFunction = (size: GridItemSizeType): JssStyle =>
  addImportantToEachRule({
    width: `${gridItemWidths[size]}%`,
    minWidth: `${gridItemWidths[size]}%`,
  });

const getOffsetStyles: GetStylesFunction = (offset: GridItemOffsetType): JssStyle =>
  addImportantToEachRule({ marginLeft: `${gridItemWidths[offset]}%` });

const getGutterStyles: GetStylesFunction = (gutter: GridGutterType): JssStyle => {
  const gutterRem = addImportantToRule(pxToRemWithUnit(gutter / 2));
  return {
    paddingLeft: gutterRem,
    paddingRight: gutterRem,
  };
};

export const getComponentCss = (size: GridItemSize, offset: GridItemOffset, gutter: GridGutter): string => {
  return (
    baseCss +
    getCss(
      mergeDeep(
        buildResponsiveJss(size, getSizeStyles),
        buildResponsiveJss(offset, getOffsetStyles),
        buildResponsiveJss(gutter, getGutterStyles)
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
  attachCss(host, getComponentCss(size, offset, gutter));
};
