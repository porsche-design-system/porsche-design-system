import { getMediaQueryMin } from '../mediaQuery';
import { gridGap } from './gridGap';
import { gridWidthMin } from './gridWidthMin';
import { gridWidthMax } from './gridWidthMax';
import { gridSafeZoneBase } from './gridSafeZoneBase';
import { gridSafeZoneXXL } from './gridSafeZoneXXL';
import { gridFullColumnStart } from './gridFullColumnStart';
import { gridExtendedColumnStart } from './gridExtendedColumnStart';
import { gridBasicColumnStart } from './gridBasicColumnStart';
import { gridNarrowColumnStart } from './gridNarrowColumnStart';
import { gridNarrowColumnEnd } from './gridNarrowColumnEnd';
import { gridBasicColumnEnd } from './gridBasicColumnEnd';
import { gridExtendedColumnEnd } from './gridExtendedColumnEnd';
import { gridFullColumnEnd } from './gridFullColumnEnd';
import {
  _cssVariableGridBasicSpanOneHalf,
  _cssVariableGridBasicSpanOneThird,
  _cssVariableGridBasicSpanTwoThirds,
  _cssVariableGridExtendedSpanOneHalf,
  _cssVariableGridNarrowSpanOneHalf,
  _gridColumnSpan,
} from './gridShared';

type Layout = 'mobile' | 'desktop' | 'max';
const getColumns = (repeat: number): string => `repeat(${repeat}, minmax(0, 1fr))`;
const getOuterColumn = (layout: Layout): string =>
  `minmax(0, calc(${layout === 'max' ? gridSafeZoneXXL : gridSafeZoneBase} - ${gridGap}))`;
const getGridTemplateColumns = (layout: Layout) =>
  layout === 'mobile'
    ? `[${gridFullColumnStart}] ${getOuterColumn(
        layout
      )} [${gridExtendedColumnStart} ${gridBasicColumnStart} ${gridNarrowColumnStart}] ${getColumns(
        6
      )} [${gridNarrowColumnEnd} ${gridBasicColumnEnd} ${gridExtendedColumnEnd}] ${getOuterColumn(
        layout
      )} [${gridFullColumnEnd}]`
    : `[${gridFullColumnStart}] ${getOuterColumn(layout)} [${gridExtendedColumnStart}] ${getColumns(
        1
      )} [${gridBasicColumnStart}] ${getColumns(2)} [${gridNarrowColumnStart}] ${getColumns(
        8
      )} [${gridNarrowColumnEnd}] ${getColumns(2)} [${gridBasicColumnEnd}] ${getColumns(
        1
      )} [${gridExtendedColumnEnd}] ${getOuterColumn(layout)} [${gridFullColumnEnd}]`;

// TODO: maybe we should extend grid variants by gridExtendedStyle, gridBasicStyle, gridNarrowStyle,
//  on the other hand, it's not necessary anymore as soon as CSS Subgrid is supported in all major browsers
export const gridStyle = {
  display: 'grid',
  gridGap,
  gridTemplateColumns: getGridTemplateColumns('mobile'),
  minWidth: gridWidthMin,
  maxWidth: gridWidthMax,
  margin: 0,
  padding: `0 max(0px, (100% - ${gridWidthMax}) / 2)`,
  boxSizing: 'content-box',
  [getMediaQueryMin('s')]: {
    // TODO: we should define those css variables in global scope by getInitialStyles() partial to reduce repetitive css declaration,
    //  on the other hand, it's not necessary anymore as soon as CSS Subgrid is supported in all major browsers
    [_cssVariableGridExtendedSpanOneHalf]: `${_gridColumnSpan} 7`,
    [_cssVariableGridExtendedSpanOneHalf]: `${_gridColumnSpan} 7`,
    [_cssVariableGridBasicSpanOneHalf]: `${_gridColumnSpan} 6`,
    [_cssVariableGridBasicSpanOneThird]: `${_gridColumnSpan} 4`,
    [_cssVariableGridBasicSpanTwoThirds]: `${_gridColumnSpan} 8`,
    [_cssVariableGridNarrowSpanOneHalf]: `${_gridColumnSpan} 4`,
    gridTemplateColumns: getGridTemplateColumns('desktop'),
  },
  // TODO: we can use internal css variable instead
  [getMediaQueryMin('xxl')]: {
    gridTemplateColumns: getGridTemplateColumns('max'),
  },
} as const;
