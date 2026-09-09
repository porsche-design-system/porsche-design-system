import { breakpoint2Xl, breakpointSm } from '@porsche-design-system/tokens';
import { prefix } from '../prefix';
import { spacing } from '../theme/spacing';
import type { TailwindCatalog } from '../types';

// Documented Tailwind grid utilities — the responsive Porsche Grid template together with its named
// area, position, and division helpers. Grouped by grid area to match the aligned cross-solution meta
// tree (emotion / scss): `template` is the whole-grid layout; each area exposes its placement utility
// (`column`) and line utilities (`start`/`end`). Tailwind has no grid tokens, no per-area offsets, and
// its `span` division utilities are area-agnostic (they read the `--_pds-grid-*` custom property the
// area context sets), so they live at the top level rather than under an area.
export const grid = {
  template: {
    comment: 'Grid',
    selector: '@utility grid-template',
    class: '.grid-template',
    description: 'Applies the responsive Porsche Grid template with named column areas.',
    raw: `  --pds-internal-grid-safe-zone: max(22px, 10.625vw - 12px);
  --_pds-grid-col: minmax(0, var(--pds-internal-grid-outer-column, calc(var(--pds-internal-grid-safe-zone) - ${prefix(spacing.fluid.md.property)})));
  display: grid;
  grid-template-columns: [full-start] var(--_pds-grid-col) [wide-start extended-start basic-start narrow-start] repeat(6, minmax(0, 1fr)) [narrow-end basic-end extended-end wide-end] var(--_pds-grid-col) [full-end];
  gap: ${prefix(spacing.fluid.md.property)};
  min-width: var(--pds-internal-grid-width-min, 320px);
  max-width: var(--pds-internal-grid-width-max, 2560px);
  box-sizing: content-box;
  margin-inline: var(--pds-internal-grid-margin, 0);
  padding-inline: calc(50% - var(--pds-internal-grid-margin, 0px) - 2560px / 2);

  @media (width >= ${breakpointSm}px) {
    --pds-internal-grid-safe-zone: calc(5vw - 16px);
    grid-template-columns: [full-start] var(--_pds-grid-col) [wide-start] minmax(0, 1fr) [extended-start] minmax(0, 1fr) [basic-start] repeat(2, minmax(0, 1fr)) [narrow-start] repeat(8, minmax(0, 1fr)) [narrow-end] repeat(2, minmax(0, 1fr)) [basic-end] minmax(0, 1fr) [extended-end] minmax(0, 1fr) [wide-end] var(--_pds-grid-col) [full-end];
  }

  @media (width >= ${breakpoint2Xl}px) {
    --pds-internal-grid-safe-zone: min(50vw - 880px, 400px);
  }`,
  },
  narrow: {
    column: {
      comment: 'Grid: Area Narrow',
      selector: '@utility col-narrow',
      class: '.col-narrow',
      description: 'Places content across the narrow area of the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  grid-column: narrow;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 4;
  }`,
    },
    start: {
      selector: '@utility col-start-narrow',
      class: '.col-start-narrow',
      description: 'Sets the start position of the narrow area within the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  grid-column-start: narrow-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 4;
  }`,
    },
    end: {
      selector: '@utility col-end-narrow',
      class: '.col-end-narrow',
      description: 'Sets the end position of the narrow area within the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  grid-column-end: narrow-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 4;
  }`,
    },
  },
  basic: {
    column: {
      comment: 'Grid: Area Basic',
      selector: '@utility col-basic',
      class: '.col-basic',
      description: 'Places content across the basic area of the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  --_pds-grid-one-third: 2;
  --_pds-grid-two-thirds: 4;
  grid-column: basic;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 6;
    --_pds-grid-one-third: 4;
    --_pds-grid-two-thirds: 8;
  }`,
    },
    start: {
      selector: '@utility col-start-basic',
      class: '.col-start-basic',
      description: 'Sets the start position of the basic area within the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  --_pds-grid-one-third: 2;
  --_pds-grid-two-thirds: 4;
  grid-column-start: basic-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 6;
    --_pds-grid-one-third: 4;
    --_pds-grid-two-thirds: 8;
  }`,
    },
    end: {
      selector: '@utility col-end-basic',
      class: '.col-end-basic',
      description: 'Sets the end position of the basic area within the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  --_pds-grid-one-third: 2;
  --_pds-grid-two-thirds: 4;
  grid-column-end: basic-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 6;
    --_pds-grid-one-third: 4;
    --_pds-grid-two-thirds: 8;
  }`,
    },
  },
  extended: {
    column: {
      comment: 'Grid: Area Extended',
      selector: '@utility col-extended',
      class: '.col-extended',
      description: 'Places content across the extended area of the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  grid-column: extended;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 7;
  }`,
    },
    start: {
      selector: '@utility col-start-extended',
      class: '.col-start-extended',
      description: 'Sets the start position of the extended area within the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  grid-column-start: extended-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 7;
  }`,
    },
    end: {
      selector: '@utility col-end-extended',
      class: '.col-end-extended',
      description: 'Sets the end position of the extended area within the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  grid-column-end: extended-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 7;
  }`,
    },
  },
  wide: {
    column: {
      comment: 'Grid: Area Wide',
      selector: '@utility col-wide',
      class: '.col-wide',
      description: 'Places content across the wide area of the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  grid-column: wide;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 8;
  }`,
    },
    start: {
      selector: '@utility col-start-wide',
      class: '.col-start-wide',
      description: 'Sets the start position of the wide area within the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  grid-column-start: wide-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 8;
  }`,
    },
    end: {
      selector: '@utility col-end-wide',
      class: '.col-end-wide',
      description: 'Sets the end position of the wide area within the Porsche Grid.',
      raw: `  --_pds-grid-one-half: 3;
  grid-column-end: wide-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 8;
  }`,
    },
  },
  full: {
    column: {
      comment: 'Grid: Area Full',
      selector: '@utility col-full',
      class: '.col-full',
      description: 'Applies the start/end position of the full area within the Porsche Grid.',
      raw: '  grid-column: full;',
    },
    start: {
      selector: '@utility col-start-full',
      class: '.col-start-full',
      description: 'Sets the start position of the full area within the Porsche Grid.',
      raw: '  grid-column-start: full-start;',
    },
    end: {
      selector: '@utility col-end-full',
      class: '.col-end-full',
      description: 'Sets the end position of the full area within the Porsche Grid.',
      raw: '  grid-column-end: full-end;',
    },
  },
  span: {
    oneHalf: {
      comment: 'Grid: Division',
      selector: '@utility col-span-one-half',
      class: '.col-span-one-half',
      description: 'Spans content across one half of the current Porsche Grid area.',
      raw: '  grid-column: span var(--_pds-grid-one-half, 1) / span var(--_pds-grid-one-half, 1);',
    },
    oneThird: {
      selector: '@utility col-span-one-third',
      class: '.col-span-one-third',
      description: 'Spans content across one third of the current Porsche Grid area.',
      raw: '  grid-column: span var(--_pds-grid-one-third, 1) / span var(--_pds-grid-one-third, 1);',
    },
    twoThirds: {
      selector: '@utility col-span-two-thirds',
      class: '.col-span-two-thirds',
      description: 'Spans content across two thirds of the current Porsche Grid area.',
      raw: '  grid-column: span var(--_pds-grid-two-thirds, 1) / span var(--_pds-grid-two-thirds, 1);',
    },
  },
} satisfies TailwindCatalog;
