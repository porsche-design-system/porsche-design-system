import type { GridGutter, GridGutterType } from '../grid/grid-utils';
import type { GridItemOffset, GridItemOffsetType, GridItemSize, GridItemSizeType } from './grid-item-utils';
import { buildResponsiveStyle, getCss, mergeDeep } from '../../../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../../../styles';

const gridItemWidths = [
  0, 8.333333, 16.666667, 25, 33.333333, 41.666667, 50, 58.333333, 66.666667, 75, 83.333333, 91.666667, 100,
];

export const getComponentCss = (size: GridItemSize, offset: GridItemOffset, gutter: GridGutter): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        boxSizing: 'border-box',
        ...mergeDeep(
          buildResponsiveStyle(size, (sizeResponsive: GridItemSizeType) => ({
            width: `${gridItemWidths[sizeResponsive]}%`,
            minWidth: `${gridItemWidths[sizeResponsive]}%`,
          })),
          buildResponsiveStyle(offset, (offsetResponsive: GridItemOffsetType) => ({
            marginLeft: `${gridItemWidths[offsetResponsive]}%`,
          })),
          buildResponsiveStyle(gutter, (gutterResponsive: GridGutterType) => {
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
