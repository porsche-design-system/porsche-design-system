import type { ScssVariable } from '../types';

// The grid offsets are static layout expressions (not tokens). The `-s` and `-xxl` offsets share a
// shape across areas, differing only by the column-count factor (extended 1, basic 2, narrow 4).
const offsetS = (factor: number): string =>
  `calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15)/16)) * ${factor})`;
const offsetXxl = (factor: number): string =>
  `calc(max(0px, 50vw - 2560px/2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15)/16)) * ${factor})`;

const offsetBase = 'max(22px, 10.625vw - 12px)';

// Each group below maps 1:1 to a generated `_grid-*.scss` partial (consumed by identity in the
// composition layer); the flat `grid` export concatenates them in the storefront table order.

const gap = [
  {
    name: '$pds-grid-gap',
    value: 'clamp(16px, 1.25vw + 12px, 36px)',
    description: 'Holds the grid **gap** the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

const narrow = [
  {
    name: '$pds-grid-narrow-column-start',
    value: 'narrow-start',
    description: 'Holds the **start** position of the `narrow` area within the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-narrow-column-end',
    value: 'narrow-end',
    description: 'Holds the **end** position of the `narrow` area within the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-narrow-span-one-half',
    value: 'var(--pds-grid-narrow-span-one-half)',
    description: 'Holds a **one third** span within the `narrow` area of the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

const narrowOffset = [
  {
    name: '$pds-grid-narrow-offset-base',
    value: offsetBase,
    description: 'Holds a **base** offset within the `narrow` area of the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-narrow-offset-s',
    value: offsetS(4),
    description: 'Holds a **small** offset within the `narrow` area of the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-narrow-offset-xxl',
    value: offsetXxl(4),
    description: 'Holds a **xxl** offset within the `narrow` area of the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

const basic = [
  {
    name: '$pds-grid-basic-column-start',
    value: 'basic-start',
    description: 'Holds the **start** position of the `basic` area within the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-basic-column-end',
    value: 'basic-end',
    description: 'Holds the **end** position of the `basic` area within the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-basic-span-one-half',
    value: 'var(--pds-grid-basic-span-one-half)',
    description: 'Holds a **half** span within the `basic` area of the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-basic-span-one-third',
    value: 'var(--pds-grid-basic-span-one-third)',
    description: 'Holds a **one third** span within the `basic` area of the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-basic-span-two-thirds',
    value: 'var(--pds-grid-basic-span-two-thirds)',
    description: 'Holds a **two thirds** span within the `basic` area of the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

const basicOffset = [
  {
    name: '$pds-grid-basic-offset-base',
    value: offsetBase,
    description: 'Holds a **base** offset within the `base` area of the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-basic-offset-s',
    value: offsetS(2),
    description: 'Holds a **small** offset within the `base` area of the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-basic-offset-xxl',
    value: offsetXxl(2),
    description: 'Holds a **xxl** offset within the `base` area of the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

const extended = [
  {
    name: '$pds-grid-extended-column-start',
    value: 'extended-start',
    description: 'Holds the **start** position of the `extended` area within the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-extended-column-end',
    value: 'extended-end',
    description: 'Holds the **end** position of the `extended` area within the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-extended-span-one-half',
    value: 'var(--pds-grid-extended-span-one-half)',
    description: 'Holds a **half** span within the `extended` area of the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

const extendedOffset = [
  {
    name: '$pds-grid-extended-offset-base',
    value: offsetBase,
    description: 'Holds a **base** offset within the `extended` area of the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-extended-offset-s',
    value: offsetS(1),
    description: 'Holds a **small** offset within the `extended` area of the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-extended-offset-xxl',
    value: offsetXxl(1),
    description: 'Holds a **xxl** offset within the `extended` area of the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

const wide = [
  {
    name: '$pds-grid-wide-column-start',
    value: 'wide-start',
    description: 'Holds the **start** position of the `wide` area within the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-wide-column-end',
    value: 'wide-end',
    description: 'Holds the **end** position of the `wide` area within the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

const wideOffset = [
  {
    name: '$pds-grid-wide-offset-base',
    value: offsetBase,
    description: 'Holds a **base** offset within the `wide` area of the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-wide-offset-s',
    value: 'calc(5vw - 16px)',
    description: 'Holds a **small** offset within the `wide` area of the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-wide-offset-xxl',
    value: 'calc(max(0px, 50vw - 2560px/2) + min(50vw - 880px, 400px))',
    description: 'Holds a **xxl** offset within the `wide` area of the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

const full = [
  {
    name: '$pds-grid-full-column-start',
    value: 'full-start',
    description: 'Holds the **start** position of the `full` area within the Porsche Grid.',
    group: 'grid',
  },
  {
    name: '$pds-grid-full-column-end',
    value: 'full-end',
    description: 'Holds the **end** position of the `full` area within the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

const fullOffset = [
  {
    name: '$pds-grid-full-offset',
    value: 'max(0px, 50vw - 2560px/2)',
    description: 'Holds a **full** offset within the `full` area of the Porsche Grid.',
    group: 'grid',
  },
] satisfies ScssVariable[];

/** Per-partial groups consumed by identity in the composition layer (`scss/index.ts`). */
export const gridGroups = {
  gap,
  full,
  fullOffset,
  wide,
  wideOffset,
  extended,
  extendedOffset,
  basic,
  basicOffset,
  narrow,
  narrowOffset,
};

/**
 * The documented grid span/offset/column/gap variables — a flat list in the storefront table order
 * (gap, then each area narrow → full). The same objects are regrouped per-partial in `gridGroups`.
 * The `pds-grid` mixin (in `utilities.grid`) sets the custom properties the span variables read.
 */
export const grid = [
  ...gap,
  ...narrow,
  ...narrowOffset,
  ...basic,
  ...basicOffset,
  ...extended,
  ...extendedOffset,
  ...wide,
  ...wideOffset,
  ...full,
  ...fullOffset,
] satisfies ScssVariable[];
