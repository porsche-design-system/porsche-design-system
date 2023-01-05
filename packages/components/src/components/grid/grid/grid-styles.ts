import type { JssStyle } from 'jss';
import type { GridDirection, GridGutter, GridWrap } from './grid-utils';
import type { GetJssStyleFunction } from '../../../utils';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';

const getGutterJssStyle: GetJssStyleFunction = (gutter: GridGutter): JssStyle => {
  const gutterRem = `-${pxToRemWithUnit(gutter / 2)}`;

  return {
    marginLeft: gutterRem,
    marginRight: gutterRem,
  };
};

export const getComponentCss = (
  direction: BreakpointCustomizable<GridDirection>,
  wrap: BreakpointCustomizable<GridWrap>,
  gutter: BreakpointCustomizable<GridGutter>
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'flex',
        flex: 'auto',
        width: 'auto',
        ...mergeDeep(
          buildResponsiveStyles(direction, (flexDirection: GridDirection) => ({ flexDirection })),
          buildResponsiveStyles(wrap, (flexWrap: GridWrap) => ({ flexWrap })),
          buildResponsiveStyles(gutter, getGutterJssStyle)
        ),
      }),
    },
  });
};
