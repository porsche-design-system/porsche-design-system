import type { GetStylesFunction, JssStyle } from '../../../../utils';
import {
  addImportantToEachRule,
  attachCss,
  buildHostStyles,
  buildResponsiveHostStyles,
  getCachedComponentCss,
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

const getDirectionStyles: GetStylesFunction = (flexDirection: GridDirectionType): JssStyle => ({ flexDirection });

const getWrapStyles: GetStylesFunction = (flexWrap: GridWrapType): JssStyle => ({ flexWrap });

const getGutterStyles: GetStylesFunction = (gutter: GridGutterType): JssStyle => {
  if (!GRID_GUTTERS.includes(gutter)) {
    throw new Error(`Gutter 'size="${gutter}"' has to be a value of: ${GRID_GUTTERS.join(', ')}`);
  }
  const gutterRem = `-${pxToRemWithUnit(gutter / 2)}`;

  return {
    marginLeft: gutterRem,
    marginRight: gutterRem,
  };
};

export const getComponentCss = (direction: GridDirection, wrap: GridWrap, gutter: GridGutter): string => {
  return getCss(
    addImportantToEachRule(
      mergeDeep(
        buildHostStyles({
          display: 'flex',
          flex: 'auto',
          width: 'auto',
        }),
        buildResponsiveHostStyles(direction, getDirectionStyles),
        buildResponsiveHostStyles(wrap, getWrapStyles),
        buildResponsiveHostStyles(gutter, getGutterStyles)
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
  attachCss(host, getCachedComponentCss(host, getComponentCss, direction, wrap, gutter));
};
