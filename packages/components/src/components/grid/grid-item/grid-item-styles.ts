import type { GridGutter } from '../grid/grid-utils';
import type { GridItemOffset, GridItemSize } from './grid-item-utils';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';

const gridItemWidths = [
  0, 8.333333, 16.666667, 25, 33.333333, 41.666667, 50, 58.333333, 66.666667, 75, 83.333333, 91.666667, 100,
];

export const getComponentCss = (
  size: BreakpointCustomizable<GridItemSize>,
  offset: BreakpointCustomizable<GridItemOffset>,
  gutter: BreakpointCustomizable<GridGutter>
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        boxSizing: 'border-box',
        ...mergeDeep(
          buildResponsiveStyles(size, (sizeResponsive: GridItemSize) => ({
            width: `${gridItemWidths[sizeResponsive]}%`,
            minWidth: `${gridItemWidths[sizeResponsive]}%`,
          })),
          buildResponsiveStyles(offset, (offsetResponsive: GridItemOffset) => ({
            marginLeft: `${gridItemWidths[offsetResponsive]}%`,
          })),
          buildResponsiveStyles(gutter, (gutterResponsive: GridGutter) => {
            const gutterRem = pxToRemWithUnit(gutterResponsive / 2);
            return {
              paddingLeft: gutterRem,
              paddingRight: gutterRem,
            };
          })
        ),
      }),
    },
  });
};
