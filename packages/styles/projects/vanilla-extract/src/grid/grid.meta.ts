import { spacingFluidMd } from '@porsche-design-system/tokens';
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
import type { Meta } from '../meta.types';

const gridGap = spacingFluidMd;

const fullStart = 'full-start';
const fullEnd = 'full-end';
const wideStart = 'wide-start';
const wideEnd = 'wide-end';
const extendedStart = 'extended-start';
const extendedEnd = 'extended-end';
const basicStart = 'basic-start';
const basicEnd = 'basic-end';
const narrowStart = 'narrow-start';
const narrowEnd = 'narrow-end';

const spanOneHalfMobile = `span 3`;
const spanOneHalfDesktopBasic = `span 6`;
const spanOneHalfDesktopExtended = `span 7`;
const spanOneHalfDesktopNarrow = `span 4`;
const spanOneThirdDesktop = `span 4`;
const spanTwoThirdsDesktop = `span 8`;

const gridBasicSpanOneHalf = `var(${_cssVariableGridBasicSpanOneHalf})`;
const gridBasicSpanOneThird = `var(${_cssVariableGridBasicSpanOneThird})`;
const gridBasicSpanTwoThirds = `var(${_cssVariableGridBasicSpanTwoThirds})`;
const gridExtendedSpanOneHalf = `var(${_cssVariableGridExtendedSpanOneHalf})`;
const gridNarrowSpanOneHalf = `var(${_cssVariableGridNarrowSpanOneHalf})`;

const gridColumnWidthS = `calc((100vw - ${_gridSafeZoneS} * 2 - ${gridGap} * 15) / 16)`;
const gridColumnWidthXXL = `calc((min(100vw, ${_gridWidthMax}) - ${_gridSafeZoneXXL} * 2 - ${gridGap} * 15) / 16)`;
const _gridPadding = `max(0px, 50vw - ${_gridWidthMax} / 2)`;
const getOffsetS = (n: number) => `calc(${_gridSafeZoneS} + (${gridGap} + ${gridColumnWidthS}) * ${n})`;
const getOffsetXXL = (n: number) =>
  `calc(${_gridPadding} + ${_gridSafeZoneXXL} + (${gridGap} + ${gridColumnWidthXXL}) * ${n})`;

const outerColumn = `minmax(0,var(${_cssVariableGridOuterColumn},calc(var(${_cssVariableGridSafeZone}) - ${gridGap})))`;
const col = 'minmax(0,1fr)';
const cols = (n: number) => (n > 1 ? `repeat(${n}, ${col})` : col);
const gridTemplateColumnsMobile = `[${fullStart}] ${outerColumn} [${wideStart} ${extendedStart} ${basicStart} ${narrowStart}] ${cols(6)} [${narrowEnd} ${basicEnd} ${extendedEnd} ${wideEnd}] ${outerColumn} [${fullEnd}]`;
const gridTemplateColumnsDesktop = `[${fullStart}] ${outerColumn} [${wideStart}] ${cols(1)} [${extendedStart}] ${cols(1)} [${basicStart}] ${cols(2)} [${narrowStart}] ${cols(8)} [${narrowEnd}] ${cols(2)} [${basicEnd}] ${cols(1)} [${extendedEnd}] ${cols(1)} [${wideEnd}] ${outerColumn} [${fullEnd}]`;

const mediaQueryMinS = '@media(min-width:760px)';
const mediaQueryMinXXL = '@media(min-width:1920px)';

const gridStyleValue = {
  [_cssVariableGridSafeZone]: _gridSafeZoneBase,
  [_cssVariableGridExtendedSpanOneHalf]: spanOneHalfMobile,
  [_cssVariableGridBasicSpanOneHalf]: spanOneHalfMobile,
  [_cssVariableGridBasicSpanOneThird]: 'span 2',
  [_cssVariableGridBasicSpanTwoThirds]: 'span 4',
  [_cssVariableGridNarrowSpanOneHalf]: spanOneHalfMobile,
  display: 'grid',
  gridGap,
  gridTemplateColumns: gridTemplateColumnsMobile,
  minWidth: `var(${_cssVariableGridWidthMin},${_gridWidthMin})`,
  maxWidth: `var(${_cssVariableGridWidthMax},${_gridWidthMax})`,
  margin: `0 var(${_cssVariableGridMargin},0)`,
  padding: `0 calc(50% - var(${_cssVariableGridMargin},0px) - ${_gridWidthMax} / 2)`,
  boxSizing: 'content-box',
  [mediaQueryMinS]: {
    [_cssVariableGridSafeZone]: _gridSafeZoneS,
    [_cssVariableGridExtendedSpanOneHalf]: spanOneHalfDesktopExtended,
    [_cssVariableGridBasicSpanOneHalf]: spanOneHalfDesktopBasic,
    [_cssVariableGridBasicSpanOneThird]: spanOneThirdDesktop,
    [_cssVariableGridBasicSpanTwoThirds]: spanTwoThirdsDesktop,
    [_cssVariableGridNarrowSpanOneHalf]: spanOneHalfDesktopNarrow,
    gridTemplateColumns: gridTemplateColumnsDesktop,
  },
  [mediaQueryMinXXL]: {
    [_cssVariableGridSafeZone]: _gridSafeZoneXXL,
  },
} as const;

export const gridMeta: Meta = {
  gridFull: {
    name: 'gridFull',
    value: { columnStart: fullStart, columnEnd: fullEnd } as const,
    description: 'Object containing all `full` grid styles.',
  },
  gridBasic: {
    name: 'gridBasic',
    value: {
      columnStart: basicStart,
      columnEnd: basicEnd,
      spanOneHalf: gridBasicSpanOneHalf,
      spanOneThird: gridBasicSpanOneThird,
      spanTwoThirds: gridBasicSpanTwoThirds,
    } as const,
    description: 'Object containing all `basic` grid styles.',
  },
  gridBasicColumnEnd: {
    name: 'gridBasicColumnEnd',
    value: basicEnd,
    description: 'Holds the **end** position of the `basic` area within the Porsche Grid.',
  },
  gridBasicColumnStart: {
    name: 'gridBasicColumnStart',
    value: basicStart,
    description: 'Holds the **start** position of the `basic` area within the Porsche Grid.',
  },
  gridBasicOffset: {
    name: 'gridBasicOffset',
    value: { base: _gridSafeZoneBase, s: getOffsetS(2), xxl: getOffsetXXL(2) } as const,
    description: 'Object containing all `basic` grid offset styles.',
    handWritten: true,
  },
  gridBasicOffsetBase: {
    name: 'gridBasicOffsetBase',
    value: _gridSafeZoneBase,
    description: 'Holds a **base** offset within the `basic` area of the Porsche Grid.',
  },
  gridBasicOffsetS: {
    name: 'gridBasicOffsetS',
    value: getOffsetS(2),
    description: 'Holds a **small** offset within the `basic` area of the Porsche Grid.',
    handWritten: true,
  },
  gridBasicOffsetXXL: {
    name: 'gridBasicOffsetXXL',
    value: getOffsetXXL(2),
    description: 'Holds a **xxl** offset within the `basic` area of the Porsche Grid.',
    handWritten: true,
  },
  gridBasicSpanOneHalf: {
    name: 'gridBasicSpanOneHalf',
    value: gridBasicSpanOneHalf,
    description: 'Holds a **half** span within the `basic` area of the Porsche Grid.',
  },
  gridBasicSpanOneThird: {
    name: 'gridBasicSpanOneThird',
    value: gridBasicSpanOneThird,
    description: 'Holds a **one third** span within the `basic` area of the Porsche Grid.',
  },
  gridBasicSpanTwoThirds: {
    name: 'gridBasicSpanTwoThirds',
    value: gridBasicSpanTwoThirds,
    description: 'Holds a **two thirds** span within the `basic` area of the Porsche Grid.',
  },
  gridExtended: {
    name: 'gridExtended',
    value: { columnStart: extendedStart, columnEnd: extendedEnd, spanOneHalf: gridExtendedSpanOneHalf } as const,
    description: 'Object containing all `extended` grid styles.',
  },
  gridExtendedColumnEnd: {
    name: 'gridExtendedColumnEnd',
    value: extendedEnd,
    description: 'Holds the **end** position of the `extended` area within the Porsche Grid.',
  },
  gridExtendedColumnStart: {
    name: 'gridExtendedColumnStart',
    value: extendedStart,
    description: 'Holds the **start** position of the `extended` area within the Porsche Grid.',
  },
  gridExtendedOffset: {
    name: 'gridExtendedOffset',
    value: { base: _gridSafeZoneBase, s: getOffsetS(1), xxl: getOffsetXXL(1) } as const,
    description: 'Object containing all `extended` grid offset styles.',
    handWritten: true,
  },
  gridExtendedOffsetBase: {
    name: 'gridExtendedOffsetBase',
    value: _gridSafeZoneBase,
    description: 'Holds a **base** offset within the `extended` area of the Porsche Grid.',
  },
  gridExtendedOffsetS: {
    name: 'gridExtendedOffsetS',
    value: getOffsetS(1),
    description: 'Holds a **small** offset within the `extended` area of the Porsche Grid.',
    handWritten: true,
  },
  gridExtendedOffsetXXL: {
    name: 'gridExtendedOffsetXXL',
    value: getOffsetXXL(1),
    description: 'Holds a **xxl** offset within the `extended` area of the Porsche Grid.',
    handWritten: true,
  },
  gridExtendedSpanOneHalf: {
    name: 'gridExtendedSpanOneHalf',
    value: gridExtendedSpanOneHalf,
    description: 'Holds a **half** span within the `extended` area of the Porsche Grid.',
  },
  gridFullColumnEnd: {
    name: 'gridFullColumnEnd',
    value: fullEnd,
    description: 'Holds the **end** position of the `full` area within the Porsche Grid.',
  },
  gridFullColumnStart: {
    name: 'gridFullColumnStart',
    value: fullStart,
    description: 'Holds the **start** position of the `full` area within the Porsche Grid.',
  },
  gridFullOffset: {
    name: 'gridFullOffset',
    value: _gridPadding,
    description: 'Holds a **full** offset within the `full` area of the Porsche Grid.',
  },
  gridGap: { name: 'gridGap', value: gridGap, description: 'Holds the grid **gap** of the Porsche Grid.' },
  gridNarrow: {
    name: 'gridNarrow',
    value: { columnStart: narrowStart, columnEnd: narrowEnd, spanOneHalf: gridNarrowSpanOneHalf } as const,
    description: 'Object containing all `narrow` grid styles.',
  },
  gridNarrowColumnEnd: {
    name: 'gridNarrowColumnEnd',
    value: narrowEnd,
    description: 'Holds the **end** position of the `narrow` area within the Porsche Grid.',
  },
  gridNarrowColumnStart: {
    name: 'gridNarrowColumnStart',
    value: narrowStart,
    description: 'Holds the **start** position of the `narrow` area within the Porsche Grid.',
  },
  gridNarrowOffset: {
    name: 'gridNarrowOffset',
    value: { base: _gridSafeZoneBase, s: getOffsetS(4), xxl: getOffsetXXL(4) } as const,
    description: 'Object containing all `narrow` grid offset styles.',
    handWritten: true,
  },
  gridNarrowOffsetBase: {
    name: 'gridNarrowOffsetBase',
    value: _gridSafeZoneBase,
    description: 'Holds a **base** offset within the `narrow` area of the Porsche Grid.',
  },
  gridNarrowOffsetS: {
    name: 'gridNarrowOffsetS',
    value: getOffsetS(4),
    description: 'Holds a **small** offset within the `narrow` area of the Porsche Grid.',
    handWritten: true,
  },
  gridNarrowOffsetXXL: {
    name: 'gridNarrowOffsetXXL',
    value: getOffsetXXL(4),
    description: 'Holds a **xxl** offset within the `narrow` area of the Porsche Grid.',
    handWritten: true,
  },
  gridNarrowSpanOneHalf: {
    name: 'gridNarrowSpanOneHalf',
    value: gridNarrowSpanOneHalf,
    description: 'Holds a **one half** span within the `narrow` area of the Porsche Grid.',
  },
  gridStyle: {
    name: 'gridStyle',
    value: gridStyleValue,
    description:
      'Applies the **Porsche Grid** layout system (must be applied once at the top level, span the full viewport width, and cannot be nested).',
    handWritten: true,
  },
  gridWide: {
    name: 'gridWide',
    value: { columnStart: wideStart, columnEnd: wideEnd } as const,
    description: 'Object containing all `wide` grid styles.',
  },
  gridWideColumnEnd: {
    name: 'gridWideColumnEnd',
    value: wideEnd,
    description: 'Holds the **end** position of the `wide` area within the Porsche Grid.',
  },
  gridWideColumnStart: {
    name: 'gridWideColumnStart',
    value: wideStart,
    description: 'Holds the **start** position of the `wide` area within the Porsche Grid.',
  },
  gridWideOffset: {
    name: 'gridWideOffset',
    value: { base: _gridSafeZoneBase, s: _gridSafeZoneS, xxl: `calc(${_gridPadding} + ${_gridSafeZoneXXL})` } as const,
    description: 'Object containing all `wide` grid offset styles.',
  },
  gridWideOffsetBase: {
    name: 'gridWideOffsetBase',
    value: _gridSafeZoneBase,
    description: 'Holds a **base** offset within the `wide` area of the Porsche Grid.',
  },
  gridWideOffsetS: {
    name: 'gridWideOffsetS',
    value: _gridSafeZoneS,
    description: 'Holds a **small** offset within the `wide` area of the Porsche Grid.',
  },
  gridWideOffsetXXL: {
    name: 'gridWideOffsetXXL',
    value: `calc(${_gridPadding} + ${_gridSafeZoneXXL})`,
    description: 'Holds a **xxl** offset within the `wide` area of the Porsche Grid.',
  },
} as const;
