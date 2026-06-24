import {
  gridBasic,
  gridBasicColumnEnd,
  gridBasicColumnStart,
  gridBasicOffset,
  gridBasicOffsetBase,
  gridBasicOffsetS,
  gridBasicOffsetXXL,
  gridBasicSpanOneHalf,
  gridBasicSpanOneThird,
  gridBasicSpanTwoThirds,
  gridExtended,
  gridExtendedColumnEnd,
  gridExtendedColumnStart,
  gridExtendedOffset,
  gridExtendedOffsetBase,
  gridExtendedOffsetS,
  gridExtendedOffsetXXL,
  gridExtendedSpanOneHalf,
  gridFull,
  gridFullColumnEnd,
  gridFullColumnStart,
  gridFullOffset,
  gridGap,
  gridNarrow,
  gridNarrowColumnEnd,
  gridNarrowColumnStart,
  gridNarrowOffset,
  gridNarrowOffsetBase,
  gridNarrowOffsetS,
  gridNarrowOffsetXXL,
  gridNarrowSpanOneHalf,
  gridStyle,
  gridWide,
  gridWideColumnEnd,
  gridWideColumnStart,
  gridWideOffset,
  gridWideOffsetBase,
  gridWideOffsetS,
  gridWideOffsetXXL,
} from '../../src/grid/';
import type { EmotionMeta } from '../types';

// `ScssMeta['grid']` splits across `theme/grid` (variables) and `utilities/grid` (mixins); emotion
// keeps grid as one flat domain (documented divergence), so it lives in a single `theme/grid` file.
export const grid = {
  gridFull: {
    name: 'gridFull',
    description: 'Object containing all `full` grid styles.',
    styles: gridFull,
  },
  gridBasic: {
    name: 'gridBasic',
    description: 'Object containing all `basic` grid styles.',
    styles: gridBasic,
  },
  gridBasicColumnEnd: {
    name: 'gridBasicColumnEnd',
    description: 'Holds the **end** position of the `basic` area within the Porsche Grid.',
    value: gridBasicColumnEnd,
  },
  gridBasicColumnStart: {
    name: 'gridBasicColumnStart',
    description: 'Holds the **start** position of the `basic` area within the Porsche Grid.',
    value: gridBasicColumnStart,
  },
  gridBasicOffset: {
    name: 'gridBasicOffset',
    description: 'Object containing all `basic` grid offset styles.',
    styles: gridBasicOffset,
  },
  gridBasicOffsetBase: {
    name: 'gridBasicOffsetBase',
    description: 'Holds a **base** offset within the `basic` area of the Porsche Grid.',
    value: gridBasicOffsetBase,
  },
  gridBasicOffsetS: {
    name: 'gridBasicOffsetS',
    description: 'Holds a **small** offset within the `basic` area of the Porsche Grid.',
    value: gridBasicOffsetS,
  },
  gridBasicOffsetXXL: {
    name: 'gridBasicOffsetXXL',
    description: 'Holds a **xxl** offset within the `basic` area of the Porsche Grid.',
    value: gridBasicOffsetXXL,
  },
  gridBasicSpanOneHalf: {
    name: 'gridBasicSpanOneHalf',
    description: 'Holds a **half** span within the `basic` area of the Porsche Grid.',
    value: gridBasicSpanOneHalf,
  },
  gridBasicSpanOneThird: {
    name: 'gridBasicSpanOneThird',
    description: 'Holds a **one third** span within the `basic` area of the Porsche Grid.',
    value: gridBasicSpanOneThird,
  },
  gridBasicSpanTwoThirds: {
    name: 'gridBasicSpanTwoThirds',
    description: 'Holds a **two thirds** span within the `basic` area of the Porsche Grid.',
    value: gridBasicSpanTwoThirds,
  },
  gridExtended: {
    name: 'gridExtended',
    description: 'Object containing all `extended` grid styles.',
    styles: gridExtended,
  },
  gridExtendedColumnEnd: {
    name: 'gridExtendedColumnEnd',
    description: 'Holds the **end** position of the `extended` area within the Porsche Grid.',
    value: gridExtendedColumnEnd,
  },
  gridExtendedColumnStart: {
    name: 'gridExtendedColumnStart',
    description: 'Holds the **start** position of the `extended` area within the Porsche Grid.',
    value: gridExtendedColumnStart,
  },
  gridExtendedOffset: {
    name: 'gridExtendedOffset',
    description: 'Object containing all `extended` grid offset styles.',
    styles: gridExtendedOffset,
  },
  gridExtendedOffsetBase: {
    name: 'gridExtendedOffsetBase',
    description: 'Holds a **base** offset within the `extended` area of the Porsche Grid.',
    value: gridExtendedOffsetBase,
  },
  gridExtendedOffsetS: {
    name: 'gridExtendedOffsetS',
    description: 'Holds a **small** offset within the `extended` area of the Porsche Grid.',
    value: gridExtendedOffsetS,
  },
  gridExtendedOffsetXXL: {
    name: 'gridExtendedOffsetXXL',
    description: 'Holds a **xxl** offset within the `extended` area of the Porsche Grid.',
    value: gridExtendedOffsetXXL,
  },
  gridExtendedSpanOneHalf: {
    name: 'gridExtendedSpanOneHalf',
    description: 'Holds a **half** span within the `extended` area of the Porsche Grid.',
    value: gridExtendedSpanOneHalf,
  },
  gridFullColumnEnd: {
    name: 'gridFullColumnEnd',
    description: 'Holds the **end** position of the `full` area within the Porsche Grid.',
    value: gridFullColumnEnd,
  },
  gridFullColumnStart: {
    name: 'gridFullColumnStart',
    description: 'Holds the **start** position of the `full` area within the Porsche Grid.',
    value: gridFullColumnStart,
  },
  gridFullOffset: {
    name: 'gridFullOffset',
    description: 'Holds a **full** offset within the `full` area of the Porsche Grid.',
    value: gridFullOffset,
  },
  gridGap: { name: 'gridGap', description: 'Holds the grid **gap** of the Porsche Grid.', value: gridGap },
  gridNarrow: {
    name: 'gridNarrow',
    description: 'Object containing all `narrow` grid styles.',
    styles: gridNarrow,
  },
  gridNarrowColumnEnd: {
    name: 'gridNarrowColumnEnd',
    description: 'Holds the **end** position of the `narrow` area within the Porsche Grid.',
    value: gridNarrowColumnEnd,
  },
  gridNarrowColumnStart: {
    name: 'gridNarrowColumnStart',
    description: 'Holds the **start** position of the `narrow` area within the Porsche Grid.',
    value: gridNarrowColumnStart,
  },
  gridNarrowOffset: {
    name: 'gridNarrowOffset',
    description: 'Object containing all `narrow` grid offset styles.',
    styles: gridNarrowOffset,
  },
  gridNarrowOffsetBase: {
    name: 'gridNarrowOffsetBase',
    description: 'Holds a **base** offset within the `narrow` area of the Porsche Grid.',
    value: gridNarrowOffsetBase,
  },
  gridNarrowOffsetS: {
    name: 'gridNarrowOffsetS',
    description: 'Holds a **small** offset within the `narrow` area of the Porsche Grid.',
    value: gridNarrowOffsetS,
  },
  gridNarrowOffsetXXL: {
    name: 'gridNarrowOffsetXXL',
    description: 'Holds a **xxl** offset within the `narrow` area of the Porsche Grid.',
    value: gridNarrowOffsetXXL,
  },
  gridNarrowSpanOneHalf: {
    name: 'gridNarrowSpanOneHalf',
    description: 'Holds a **one half** span within the `narrow` area of the Porsche Grid.',
    value: gridNarrowSpanOneHalf,
  },
  gridStyle: {
    name: 'gridStyle',
    description:
      'Applies the **Porsche Grid** layout system (must be applied once at the top level, span the full viewport width, and cannot be nested).',
    styles: gridStyle,
  },
  gridWide: {
    name: 'gridWide',
    description: 'Object containing all `wide` grid styles.',
    styles: gridWide,
  },
  gridWideColumnEnd: {
    name: 'gridWideColumnEnd',
    description: 'Holds the **end** position of the `wide` area within the Porsche Grid.',
    value: gridWideColumnEnd,
  },
  gridWideColumnStart: {
    name: 'gridWideColumnStart',
    description: 'Holds the **start** position of the `wide` area within the Porsche Grid.',
    value: gridWideColumnStart,
  },
  gridWideOffset: {
    name: 'gridWideOffset',
    description: 'Object containing all `wide` grid offset styles.',
    styles: gridWideOffset,
  },
  gridWideOffsetBase: {
    name: 'gridWideOffsetBase',
    description: 'Holds a **base** offset within the `wide` area of the Porsche Grid.',
    value: gridWideOffsetBase,
  },
  gridWideOffsetS: {
    name: 'gridWideOffsetS',
    description: 'Holds a **small** offset within the `wide` area of the Porsche Grid.',
    value: gridWideOffsetS,
  },
  gridWideOffsetXXL: {
    name: 'gridWideOffsetXXL',
    description: 'Holds a **xxl** offset within the `wide` area of the Porsche Grid.',
    value: gridWideOffsetXXL,
  },
} satisfies EmotionMeta['grid'];
