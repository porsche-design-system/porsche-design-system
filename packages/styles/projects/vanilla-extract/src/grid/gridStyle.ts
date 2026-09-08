import { getMediaQueryMin } from '../mediaQuery';
import { gridBasicColumnEnd } from './gridBasicColumnEnd';
import { gridBasicColumnStart } from './gridBasicColumnStart';
import { gridExtendedColumnEnd } from './gridExtendedColumnEnd';
import { gridExtendedColumnStart } from './gridExtendedColumnStart';
import { gridFullColumnEnd } from './gridFullColumnEnd';
import { gridFullColumnStart } from './gridFullColumnStart';
import { gridGap } from './gridGap';
import { gridNarrowColumnEnd } from './gridNarrowColumnEnd';
import { gridNarrowColumnStart } from './gridNarrowColumnStart';
import {
  _cssVariableGridBasicSpanOneHalf,
  _cssVariableGridBasicSpanOneThird,
  _cssVariableGridBasicSpanTwoThirds,
  _cssVariableGridExtendedSpanOneHalf,
  _cssVariableGridMargin,
  _cssVariableGridNarrowSpanOneHalf,
  _cssVariableGridOuterColumn,
  _cssVariableGridSafeZone,
  _cssVariableGridWidthMax,
  _cssVariableGridWidthMin,
  _gridSafeZoneBase,
  _gridSafeZoneS,
  _gridSafeZoneXXL,
  _gridWidthMax,
  _gridWidthMin,
} from './gridShared';
import { gridWideColumnEnd } from './gridWideColumnEnd';
import { gridWideColumnStart } from './gridWideColumnStart';

// _cssVariableGridOuterColumn is needed in case behaviour needs to be adjusted like when used in Flyout or Modal
const outerColumn = `minmax(0,var(${_cssVariableGridOuterColumn},calc(var(${_cssVariableGridSafeZone}) - ${gridGap})))`;
const column = 'minmax(0,1fr)';
const getColumns = (repeat: number): string => (repeat > 1 ? `repeat(${repeat}, ${column})` : column);
const getColumnSpan = (span: number): string => `span ${span}`;
const getGridTemplateColumns = (layout: 'mobile' | 'desktop'): string =>
  layout === 'mobile'
    ? `[${gridFullColumnStart}] ${outerColumn} [${gridWideColumnStart} ${gridExtendedColumnStart} ${gridBasicColumnStart} ${gridNarrowColumnStart}] ${getColumns(
        6
      )} [${gridNarrowColumnEnd} ${gridBasicColumnEnd} ${gridExtendedColumnEnd} ${gridWideColumnEnd}] ${outerColumn} [${gridFullColumnEnd}]`
    : `[${gridFullColumnStart}] ${outerColumn} [${gridWideColumnStart}] ${getColumns(
        1
      )} [${gridExtendedColumnStart}] ${getColumns(1)} [${gridBasicColumnStart}] ${getColumns(
        2
      )} [${gridNarrowColumnStart}] ${getColumns(8)} [${gridNarrowColumnEnd}] ${getColumns(
        2
      )} [${gridBasicColumnEnd}] ${getColumns(1)} [${gridExtendedColumnEnd}] ${getColumns(
        1
      )} [${gridWideColumnEnd}] ${outerColumn} [${gridFullColumnEnd}]`;

export const gridStyle = {
  [_cssVariableGridSafeZone]: _gridSafeZoneBase,
  [_cssVariableGridExtendedSpanOneHalf]: getColumnSpan(3),
  [_cssVariableGridBasicSpanOneHalf]: getColumnSpan(3),
  [_cssVariableGridBasicSpanOneThird]: getColumnSpan(2),
  [_cssVariableGridBasicSpanTwoThirds]: getColumnSpan(4),
  [_cssVariableGridNarrowSpanOneHalf]: getColumnSpan(3),
  display: 'grid',
  gridGap,
  gridTemplateColumns: getGridTemplateColumns('mobile'),
  // _cssVariableGridWidthMin, _cssVariableGridWidthMax and _cssVariableGridMargin is needed in case behaviour needs to be adjusted like when used in Flyout or Modal
  minWidth: `var(${_cssVariableGridWidthMin},${_gridWidthMin})`,
  maxWidth: `var(${_cssVariableGridWidthMax},${_gridWidthMax})`,
  margin: `0 var(${_cssVariableGridMargin},0)`,
  padding: `0 calc(50% - var(${_cssVariableGridMargin},0px) - ${_gridWidthMax} / 2)`,
  boxSizing: 'content-box',
  '@media': {
    [getMediaQueryMin('s')]: {
      display: 'grid', // Vanilla Extract type complains if only Custom properties are used within media query
      [_cssVariableGridSafeZone]: _gridSafeZoneS,
      [_cssVariableGridExtendedSpanOneHalf]: getColumnSpan(7),
      [_cssVariableGridBasicSpanOneHalf]: getColumnSpan(6),
      [_cssVariableGridBasicSpanOneThird]: getColumnSpan(4),
      [_cssVariableGridBasicSpanTwoThirds]: getColumnSpan(8),
      [_cssVariableGridNarrowSpanOneHalf]: getColumnSpan(4),
      gridTemplateColumns: getGridTemplateColumns('desktop'),
    },
    [getMediaQueryMin('xxl')]: {
      display: 'grid', // Vanilla Extract type complains if only Custom properties are used within media query
      [_cssVariableGridSafeZone]: _gridSafeZoneXXL,
    },
  },
} as const;
