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
import type {
  GridDirection,
  GridDirectionType,
  GridGutter,
  GridGutterType,
  GridWrap,
  GridWrapType,
} from './grid-utils';
import { GRID_GUTTERS } from './grid-utils';

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

export const getComponentCss = (direction: GridDirection, wrap: GridWrap, gutter: GridGutter): string => {
  return (
    baseCss +
    getCss(
      mergeDeep(
        buildResponsiveJss(direction, getDirectionStyles),
        buildResponsiveJss(wrap, getWrapStyles),
        buildResponsiveJss(gutter, getGutterStyles)
      )
    )
  );
};

export const addComponentCss = (
  host: HTMLElement,
  direction: GridDirection,
  wrap: GridWrap,
  gutter: GridGutter
): void => {
  attachCss(host, getComponentCss(direction, wrap, gutter));
};
