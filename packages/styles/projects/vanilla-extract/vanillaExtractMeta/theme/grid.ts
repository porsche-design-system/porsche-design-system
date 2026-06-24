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
import type { VanillaExtractMeta } from '../types';

// Grouped by grid area to match the aligned cross-solution meta tree (scss / tailwind). `template` is
// the whole-grid layout, `gap` a token; each area nests its placement utility (`column`), named line
// tokens (`start`/`end`), per-area `span`s, and offsets. The composed `offset` object stays a leaf
// (importable convenience export); its breakpoint variants are the `offset{Base,S,XXL}` siblings.
export const grid = {
  template: {
    name: 'gridStyle',
    description:
      'Applies the **Porsche Grid** layout system (must be applied once at the top level, span the full viewport width, and cannot be nested).',
    styles: gridStyle,
  },
  gap: { name: 'gridGap', description: 'Holds the grid **gap** of the Porsche Grid.', value: gridGap },
  narrow: {
    column: {
      name: 'gridNarrow',
      description: 'Object containing all `narrow` grid styles.',
      styles: gridNarrow,
    },
    start: {
      name: 'gridNarrowColumnStart',
      description: 'Holds the **start** position of the `narrow` area within the Porsche Grid.',
      value: gridNarrowColumnStart,
    },
    end: {
      name: 'gridNarrowColumnEnd',
      description: 'Holds the **end** position of the `narrow` area within the Porsche Grid.',
      value: gridNarrowColumnEnd,
    },
    span: {
      oneHalf: {
        name: 'gridNarrowSpanOneHalf',
        description: 'Holds a **one half** span within the `narrow` area of the Porsche Grid.',
        value: gridNarrowSpanOneHalf,
      },
    },
    offset: {
      name: 'gridNarrowOffset',
      description: 'Object containing all `narrow` grid offset styles.',
      styles: gridNarrowOffset,
    },
    offsetBase: {
      name: 'gridNarrowOffsetBase',
      description: 'Holds a **base** offset within the `narrow` area of the Porsche Grid.',
      value: gridNarrowOffsetBase,
    },
    offsetS: {
      name: 'gridNarrowOffsetS',
      description: 'Holds a **small** offset within the `narrow` area of the Porsche Grid.',
      value: gridNarrowOffsetS,
    },
    offsetXXL: {
      name: 'gridNarrowOffsetXXL',
      description: 'Holds a **xxl** offset within the `narrow` area of the Porsche Grid.',
      value: gridNarrowOffsetXXL,
    },
  },
  basic: {
    column: {
      name: 'gridBasic',
      description: 'Object containing all `basic` grid styles.',
      styles: gridBasic,
    },
    start: {
      name: 'gridBasicColumnStart',
      description: 'Holds the **start** position of the `basic` area within the Porsche Grid.',
      value: gridBasicColumnStart,
    },
    end: {
      name: 'gridBasicColumnEnd',
      description: 'Holds the **end** position of the `basic` area within the Porsche Grid.',
      value: gridBasicColumnEnd,
    },
    span: {
      oneHalf: {
        name: 'gridBasicSpanOneHalf',
        description: 'Holds a **half** span within the `basic` area of the Porsche Grid.',
        value: gridBasicSpanOneHalf,
      },
      oneThird: {
        name: 'gridBasicSpanOneThird',
        description: 'Holds a **one third** span within the `basic` area of the Porsche Grid.',
        value: gridBasicSpanOneThird,
      },
      twoThirds: {
        name: 'gridBasicSpanTwoThirds',
        description: 'Holds a **two thirds** span within the `basic` area of the Porsche Grid.',
        value: gridBasicSpanTwoThirds,
      },
    },
    offset: {
      name: 'gridBasicOffset',
      description: 'Object containing all `basic` grid offset styles.',
      styles: gridBasicOffset,
    },
    offsetBase: {
      name: 'gridBasicOffsetBase',
      description: 'Holds a **base** offset within the `basic` area of the Porsche Grid.',
      value: gridBasicOffsetBase,
    },
    offsetS: {
      name: 'gridBasicOffsetS',
      description: 'Holds a **small** offset within the `basic` area of the Porsche Grid.',
      value: gridBasicOffsetS,
    },
    offsetXXL: {
      name: 'gridBasicOffsetXXL',
      description: 'Holds a **xxl** offset within the `basic` area of the Porsche Grid.',
      value: gridBasicOffsetXXL,
    },
  },
  extended: {
    column: {
      name: 'gridExtended',
      description: 'Object containing all `extended` grid styles.',
      styles: gridExtended,
    },
    start: {
      name: 'gridExtendedColumnStart',
      description: 'Holds the **start** position of the `extended` area within the Porsche Grid.',
      value: gridExtendedColumnStart,
    },
    end: {
      name: 'gridExtendedColumnEnd',
      description: 'Holds the **end** position of the `extended` area within the Porsche Grid.',
      value: gridExtendedColumnEnd,
    },
    span: {
      oneHalf: {
        name: 'gridExtendedSpanOneHalf',
        description: 'Holds a **half** span within the `extended` area of the Porsche Grid.',
        value: gridExtendedSpanOneHalf,
      },
    },
    offset: {
      name: 'gridExtendedOffset',
      description: 'Object containing all `extended` grid offset styles.',
      styles: gridExtendedOffset,
    },
    offsetBase: {
      name: 'gridExtendedOffsetBase',
      description: 'Holds a **base** offset within the `extended` area of the Porsche Grid.',
      value: gridExtendedOffsetBase,
    },
    offsetS: {
      name: 'gridExtendedOffsetS',
      description: 'Holds a **small** offset within the `extended` area of the Porsche Grid.',
      value: gridExtendedOffsetS,
    },
    offsetXXL: {
      name: 'gridExtendedOffsetXXL',
      description: 'Holds a **xxl** offset within the `extended` area of the Porsche Grid.',
      value: gridExtendedOffsetXXL,
    },
  },
  wide: {
    column: {
      name: 'gridWide',
      description: 'Object containing all `wide` grid styles.',
      styles: gridWide,
    },
    start: {
      name: 'gridWideColumnStart',
      description: 'Holds the **start** position of the `wide` area within the Porsche Grid.',
      value: gridWideColumnStart,
    },
    end: {
      name: 'gridWideColumnEnd',
      description: 'Holds the **end** position of the `wide` area within the Porsche Grid.',
      value: gridWideColumnEnd,
    },
    offset: {
      name: 'gridWideOffset',
      description: 'Object containing all `wide` grid offset styles.',
      styles: gridWideOffset,
    },
    offsetBase: {
      name: 'gridWideOffsetBase',
      description: 'Holds a **base** offset within the `wide` area of the Porsche Grid.',
      value: gridWideOffsetBase,
    },
    offsetS: {
      name: 'gridWideOffsetS',
      description: 'Holds a **small** offset within the `wide` area of the Porsche Grid.',
      value: gridWideOffsetS,
    },
    offsetXXL: {
      name: 'gridWideOffsetXXL',
      description: 'Holds a **xxl** offset within the `wide` area of the Porsche Grid.',
      value: gridWideOffsetXXL,
    },
  },
  full: {
    column: {
      name: 'gridFull',
      description: 'Object containing all `full` grid styles.',
      styles: gridFull,
    },
    start: {
      name: 'gridFullColumnStart',
      description: 'Holds the **start** position of the `full` area within the Porsche Grid.',
      value: gridFullColumnStart,
    },
    end: {
      name: 'gridFullColumnEnd',
      description: 'Holds the **end** position of the `full` area within the Porsche Grid.',
      value: gridFullColumnEnd,
    },
    offset: {
      name: 'gridFullOffset',
      description: 'Holds a **full** offset within the `full` area of the Porsche Grid.',
      value: gridFullOffset,
    },
  },
} satisfies VanillaExtractMeta['grid'];
