import type { JssStyle } from 'jss';
import type {
  GridDirection,
  GridDirectionType,
  GridGutter,
  GridGutterType,
  GridWrap,
  GridWrapType,
} from './grid-utils';
import type { GetStyleFunction } from '../../../../utils';
import { buildResponsiveHostStyles, getCss, mergeDeep, throwIfValueIsInvalid } from '../../../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../../../styles';
import { GRID_GUTTERS } from './grid-utils';

const getDirectionStyle: GetStyleFunction = (flexDirection: GridDirectionType): JssStyle => ({ flexDirection });

const getWrapStyle: GetStyleFunction = (flexWrap: GridWrapType): JssStyle => ({ flexWrap });

const getGutterStyle: GetStyleFunction = (gutter: GridGutterType): JssStyle => {
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
        buildResponsiveHostStyles(direction, getDirectionStyle),
        buildResponsiveHostStyles(wrap, getWrapStyle),
        buildResponsiveHostStyles(gutter, getGutterStyle)
      )
    )
  );
};
