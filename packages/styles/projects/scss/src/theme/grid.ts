import type { ScssCatalog } from '../types';

// Static layout expressions (not tokens). The `-s` / `-xxl` offsets differ per area only by the
// column-count factor (extended 1, basic 2, narrow 4).
const offsetS = (factor: number): string =>
  `calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15)/16)) * ${factor})`;
const offsetXxl = (factor: number): string =>
  `calc(max(0px, 50vw - 2560px/2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15)/16)) * ${factor})`;

const offsetBase = 'max(22px, 10.625vw - 12px)';

/**
 * The grid token variables grouped by grid area, aligned with `EmotionMeta['grid']` /
 * `TailwindMeta['grid']` (the `template` layout mixin is added in `meta.ts` from `utilities/grid`).
 * Keys are in storefront order (gap, then each area narrow → full); the composition layer
 * (`scss/index.ts`) slices these leaves back into the per-partial `_grid-*.scss` files.
 */
export const grid = {
  gap: {
    name: '$pds-grid-gap',
    value: 'clamp(16px, 1.25vw + 12px, 36px)',
    description: 'Holds the grid **gap** the Porsche Grid.',
  },
  narrow: {
    start: {
      name: '$pds-grid-narrow-column-start',
      value: 'narrow-start',
      description: 'Holds the **start** position of the `narrow` area within the Porsche Grid.',
    },
    end: {
      name: '$pds-grid-narrow-column-end',
      value: 'narrow-end',
      description: 'Holds the **end** position of the `narrow` area within the Porsche Grid.',
    },
    span: {
      oneHalf: {
        name: '$pds-grid-narrow-span-one-half',
        value: 'var(--pds-grid-narrow-span-one-half)',
        description: 'Holds a **one third** span within the `narrow` area of the Porsche Grid.',
      },
    },
    offsetBase: {
      name: '$pds-grid-narrow-offset-base',
      value: offsetBase,
      description: 'Holds a **base** offset within the `narrow` area of the Porsche Grid.',
    },
    offsetS: {
      name: '$pds-grid-narrow-offset-s',
      value: offsetS(4),
      description: 'Holds a **small** offset within the `narrow` area of the Porsche Grid.',
    },
    offsetXXL: {
      name: '$pds-grid-narrow-offset-xxl',
      value: offsetXxl(4),
      description: 'Holds a **xxl** offset within the `narrow` area of the Porsche Grid.',
    },
  },
  basic: {
    start: {
      name: '$pds-grid-basic-column-start',
      value: 'basic-start',
      description: 'Holds the **start** position of the `basic` area within the Porsche Grid.',
    },
    end: {
      name: '$pds-grid-basic-column-end',
      value: 'basic-end',
      description: 'Holds the **end** position of the `basic` area within the Porsche Grid.',
    },
    span: {
      oneHalf: {
        name: '$pds-grid-basic-span-one-half',
        value: 'var(--pds-grid-basic-span-one-half)',
        description: 'Holds a **half** span within the `basic` area of the Porsche Grid.',
      },
      oneThird: {
        name: '$pds-grid-basic-span-one-third',
        value: 'var(--pds-grid-basic-span-one-third)',
        description: 'Holds a **one third** span within the `basic` area of the Porsche Grid.',
      },
      twoThirds: {
        name: '$pds-grid-basic-span-two-thirds',
        value: 'var(--pds-grid-basic-span-two-thirds)',
        description: 'Holds a **two thirds** span within the `basic` area of the Porsche Grid.',
      },
    },
    offsetBase: {
      name: '$pds-grid-basic-offset-base',
      value: offsetBase,
      description: 'Holds a **base** offset within the `base` area of the Porsche Grid.',
    },
    offsetS: {
      name: '$pds-grid-basic-offset-s',
      value: offsetS(2),
      description: 'Holds a **small** offset within the `base` area of the Porsche Grid.',
    },
    offsetXXL: {
      name: '$pds-grid-basic-offset-xxl',
      value: offsetXxl(2),
      description: 'Holds a **xxl** offset within the `base` area of the Porsche Grid.',
    },
  },
  extended: {
    start: {
      name: '$pds-grid-extended-column-start',
      value: 'extended-start',
      description: 'Holds the **start** position of the `extended` area within the Porsche Grid.',
    },
    end: {
      name: '$pds-grid-extended-column-end',
      value: 'extended-end',
      description: 'Holds the **end** position of the `extended` area within the Porsche Grid.',
    },
    span: {
      oneHalf: {
        name: '$pds-grid-extended-span-one-half',
        value: 'var(--pds-grid-extended-span-one-half)',
        description: 'Holds a **half** span within the `extended` area of the Porsche Grid.',
      },
    },
    offsetBase: {
      name: '$pds-grid-extended-offset-base',
      value: offsetBase,
      description: 'Holds a **base** offset within the `extended` area of the Porsche Grid.',
    },
    offsetS: {
      name: '$pds-grid-extended-offset-s',
      value: offsetS(1),
      description: 'Holds a **small** offset within the `extended` area of the Porsche Grid.',
    },
    offsetXXL: {
      name: '$pds-grid-extended-offset-xxl',
      value: offsetXxl(1),
      description: 'Holds a **xxl** offset within the `extended` area of the Porsche Grid.',
    },
  },
  wide: {
    start: {
      name: '$pds-grid-wide-column-start',
      value: 'wide-start',
      description: 'Holds the **start** position of the `wide` area within the Porsche Grid.',
    },
    end: {
      name: '$pds-grid-wide-column-end',
      value: 'wide-end',
      description: 'Holds the **end** position of the `wide` area within the Porsche Grid.',
    },
    offsetBase: {
      name: '$pds-grid-wide-offset-base',
      value: offsetBase,
      description: 'Holds a **base** offset within the `wide` area of the Porsche Grid.',
    },
    offsetS: {
      name: '$pds-grid-wide-offset-s',
      value: 'calc(5vw - 16px)',
      description: 'Holds a **small** offset within the `wide` area of the Porsche Grid.',
    },
    offsetXXL: {
      name: '$pds-grid-wide-offset-xxl',
      value: 'calc(max(0px, 50vw - 2560px/2) + min(50vw - 880px, 400px))',
      description: 'Holds a **xxl** offset within the `wide` area of the Porsche Grid.',
    },
  },
  full: {
    start: {
      name: '$pds-grid-full-column-start',
      value: 'full-start',
      description: 'Holds the **start** position of the `full` area within the Porsche Grid.',
    },
    end: {
      name: '$pds-grid-full-column-end',
      value: 'full-end',
      description: 'Holds the **end** position of the `full` area within the Porsche Grid.',
    },
    offset: {
      name: '$pds-grid-full-offset',
      value: 'max(0px, 50vw - 2560px/2)',
      description: 'Holds a **full** offset within the `full` area of the Porsche Grid.',
    },
  },
} satisfies ScssCatalog;
