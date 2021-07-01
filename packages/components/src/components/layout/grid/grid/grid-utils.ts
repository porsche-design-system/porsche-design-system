import type { BreakpointCustomizable } from '../../../../types';
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

export const GRID_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
type GridDirectionType = typeof GRID_DIRECTIONS[number];
export type GridDirection = BreakpointCustomizable<GridDirectionType>;

export const GRID_WRAPS = ['nowrap', 'wrap'] as const;
type GridWrapType = typeof GRID_WRAPS[number];
export type GridWrap = BreakpointCustomizable<GridWrapType>;

export const GRID_GUTTERS = [16, 24, 36] as const;
export type GridGutterType = typeof GRID_GUTTERS[number];
export type GridGutter = BreakpointCustomizable<GridGutterType>;

const baseCss: string = getCss(
  buildHostStyles(
    addImportantToEachRule({
      display: 'flex',
      flex: 'auto',
      width: 'auto',
    })
  )
);

const getDirectionStyles: GetStylesFunction = (flexDirection: GridDirectionType): JssStyle =>
  addImportantToEachRule({ flexDirection });

const getWrapStyles: GetStylesFunction = (flexWrap: GridWrapType): JssStyle => addImportantToEachRule({ flexWrap });

const getGutterStyles: GetStylesFunction = (gutter: GridGutterType): JssStyle => {
  if (!GRID_GUTTERS.includes(gutter)) {
    throw new Error(`Gutter 'size="${gutter}"' has to be a value of: ${GRID_GUTTERS.join(', ')}`);
  }
  const gutterRem = addImportantToRule(`-${pxToRemWithUnit(gutter / 2)}`);

  return {
    marginLeft: gutterRem,
    marginRight: gutterRem,
  };
};

export const getDynamicCss = (direction: GridDirection, wrap: GridWrap, gutter: GridGutter): string => {
  return getCss(
    mergeDeep(
      buildResponsiveJss(direction, getDirectionStyles),
      buildResponsiveJss(wrap, getWrapStyles),
      buildResponsiveJss(gutter, getGutterStyles)
    )
  );
};

export const addCss = (host: HTMLElement, direction: GridDirection, wrap: GridWrap, gutter: GridGutter): void => {
  attachCss(host, baseCss + getDynamicCss(direction, wrap, gutter));
};
