import { getMediaQueryMin } from '../mediaQuery';
import { gridGap } from './gridGap';
import { gridWidthMin } from './gridWidthMin';
import { gridWidthMax } from './gridWidthMax';
import { gridSafeZoneBase } from './gridSafeZoneBase';
import { gridSafeZoneXXL } from './gridSafeZoneXXL';

const span = 'span';
const cssVariableGridExtendedSpanOneHalf = '--pds-grid-extended-span-one-half';
const cssVariableGridBasicSpanOneHalf = '--pds-grid-basic-span-one-half';
const cssVariableGridBasicSpanOneThird = '--pds-grid-basic-span-one-third';
const cssVariableGridBasicSpanTwoThirds = '--pds-grid-basic-span-two-thirds';
const cssVariableGridNarrowSpanOneHalf = '--pds-grid-narrow-span-one-half';

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

export const gridFullColumnStart = 'full-start';
export const gridFullColumnEnd = 'full-end';
export const gridExtendedColumnStart = 'extended-start';
export const gridExtendedColumnEnd = 'extended-end';
export const gridBasicColumnStart = 'basic-start';
export const gridBasicColumnEnd = 'basic-end';
export const gridNarrowColumnStart = 'narrow-start';
export const gridNarrowColumnEnd = 'narrow-end';

export const gridExtendedSpanOneHalf = `var(${cssVariableGridExtendedSpanOneHalf}, ${span} 3)`;
export const gridBasicSpanOneHalf = `var(${cssVariableGridBasicSpanOneHalf}, ${span} 3)`;
export const gridBasicSpanOneThird = `var(${cssVariableGridBasicSpanOneThird}, ${span} 2)`;
export const gridBasicSpanTwoThirds = `var(${cssVariableGridBasicSpanTwoThirds}, ${span} 4)`;
export const gridNarrowSpanOneHalf = `var(${cssVariableGridNarrowSpanOneHalf}, ${span} 3)`;

// TODO: we should extend grid variants by gridExtendedStyle, gridBasicStyle, gridNarrowStyle
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
    // TODO: we should define those css variables in global scope by getInitialStyles() partial to reduce repetitive css declaration
    [cssVariableGridExtendedSpanOneHalf]: `${span} 7`,
    [cssVariableGridExtendedSpanOneHalf]: `${span} 7`,
    [cssVariableGridBasicSpanOneHalf]: `${span} 6`,
    [cssVariableGridBasicSpanOneThird]: `${span} 4`,
    [cssVariableGridBasicSpanTwoThirds]: `${span} 8`,
    [cssVariableGridNarrowSpanOneHalf]: `${span} 4`,
    gridTemplateColumns: getGridTemplateColumns('desktop'),
  },
  [getMediaQueryMin('xxl')]: {
    gridTemplateColumns: getGridTemplateColumns('max'),
  },
} as const;
