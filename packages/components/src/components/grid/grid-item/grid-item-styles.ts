import type { GridItemOffset, GridItemSize } from './grid-item-utils';
import type { BreakpointCustomizable } from '../../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../../utils';
import { addImportantToEachRule } from '../../../styles';
import { gridGap } from '@porsche-design-system/utilities-v2';

const gutter = `calc(${gridGap} / 2)`;
const gridItemWidths = [
  0, 8.333333, 16.666667, 25, 33.333333, 41.666667, 50, 58.333333, 66.666667, 75, 83.333333, 91.666667, 100,
];

export const getComponentCss = (
  size: BreakpointCustomizable<GridItemSize>,
  offset: BreakpointCustomizable<GridItemOffset>
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        paddingLeft: gutter,
        paddingRight: gutter,
        boxSizing: 'border-box',
        ...mergeDeep(
          buildResponsiveStyles(size, (sizeResponsive: GridItemSize) => ({
            width: `${gridItemWidths[sizeResponsive]}%`,
            minWidth: `${gridItemWidths[sizeResponsive]}%`,
          })),
          buildResponsiveStyles(offset, (offsetResponsive: GridItemOffset) => ({
            marginLeft: `${gridItemWidths[offsetResponsive]}%`,
          }))
        ),
      }),
    },
  });
};
