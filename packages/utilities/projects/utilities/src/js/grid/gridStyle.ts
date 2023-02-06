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
} from './gridShared';

const _gridColumnSpan = 'span';
const _cssVariableInternalGridSafeZone = '--pds-internal-grid-safe-zone';

type Layout = 'mobile' | 'desktop';
const getColumns = (repeat: number): string => `repeat(${repeat}, minmax(0, 1fr))`;
const getOuterColumn = (): string => `minmax(0, calc(var(${_cssVariableInternalGridSafeZone}) - ${gridGap}))`;
const getGridTemplateColumns = (layout: Layout) =>
  layout === 'mobile'
    ? `[${gridFullColumnStart}] ${getOuterColumn()} [${gridExtendedColumnStart} ${gridBasicColumnStart} ${gridNarrowColumnStart}] ${getColumns(
        6
      )} [${gridNarrowColumnEnd} ${gridBasicColumnEnd} ${gridExtendedColumnEnd}] ${getOuterColumn()} [${gridFullColumnEnd}]`
    : `[${gridFullColumnStart}] ${getOuterColumn()} [${gridExtendedColumnStart}] ${getColumns(
        1
      )} [${gridBasicColumnStart}] ${getColumns(2)} [${gridNarrowColumnStart}] ${getColumns(
        8
      )} [${gridNarrowColumnEnd}] ${getColumns(2)} [${gridBasicColumnEnd}] ${getColumns(
        1
      )} [${gridExtendedColumnEnd}] ${getOuterColumn()} [${gridFullColumnEnd}]`;

export const gridStyle = {
  [_cssVariableInternalGridSafeZone]: gridSafeZoneBase,
  [_cssVariableGridExtendedSpanOneHalf]: `${_gridColumnSpan} 3`,
  [_cssVariableGridBasicSpanOneHalf]: `${_gridColumnSpan} 3`,
  [_cssVariableGridBasicSpanOneThird]: `${_gridColumnSpan} 2`,
  [_cssVariableGridBasicSpanTwoThirds]: `${_gridColumnSpan} 4`,
  [_cssVariableGridNarrowSpanOneHalf]: `${_gridColumnSpan} 3`,
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
    //  on the other hand, it's not necessary anymore as soon as CSS Subgrid is supported in all major browsers.
    //  In addition, it wouldn't work in case only utilities are used without getInitialStyles() partials.
    //  So maybe, keep it as is.
    [_cssVariableGridExtendedSpanOneHalf]: `${_gridColumnSpan} 7`,
    [_cssVariableGridBasicSpanOneHalf]: `${_gridColumnSpan} 6`,
    [_cssVariableGridBasicSpanOneThird]: `${_gridColumnSpan} 4`,
    [_cssVariableGridBasicSpanTwoThirds]: `${_gridColumnSpan} 8`,
    [_cssVariableGridNarrowSpanOneHalf]: `${_gridColumnSpan} 4`,
    gridTemplateColumns: getGridTemplateColumns('desktop'),
  },
  [getMediaQueryMin('xxl')]: {
    [_cssVariableInternalGridSafeZone]: gridSafeZoneXXL,
  },
} as const;
