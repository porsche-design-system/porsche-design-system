import type {
  GridDirection,
  GridDirectionType,
  GridGutter,
  GridGutterType,
  GridWrap,
  GridWrapType,
} from './grid-utils';
import type { GetStylesFunction, JssStyle } from '../../../../utils';
import { buildResponsiveHostStyles, getCss, mergeDeep, throwIfValueIsInvalid } from '../../../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../../../styles/styles';
import { GRID_GUTTERS } from './grid-utils';

const getDirectionStyles: GetStylesFunction = (flexDirection: GridDirectionType): JssStyle => ({ flexDirection });

const getWrapStyles: GetStylesFunction = (flexWrap: GridWrapType): JssStyle => ({ flexWrap });

const getGutterStyles: GetStylesFunction = (gutter: GridGutterType): JssStyle => {
  throwIfValueIsInvalid(gutter, GRID_GUTTERS, 'gutter');
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
        {
          ':host': {
            display: 'flex',
            flex: 'auto',
            width: 'auto',
          },
        },
        buildResponsiveHostStyles(direction, getDirectionStyles),
        buildResponsiveHostStyles(wrap, getWrapStyles),
        buildResponsiveHostStyles(gutter, getGutterStyles)
      )
    )
  );
};
