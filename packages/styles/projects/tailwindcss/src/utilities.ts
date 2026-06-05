import { breakpoint2Xl, breakpointSm, gradientStopsFadeDark } from '@porsche-design-system/tokens';
import type { TailwindUtility } from './types';

// Documented Tailwind utilities — single source for the `@utility` blocks and the utility docs.
export const tailwindUtilities: TailwindUtility[] = [
  {
    comment: 'Gradient',
    selector: '@utility bg-fade-to-t',
    class: '.bg-fade-to-t',
    description: 'Applies a fade gradient towards the top.',
    raw: `  background-image: linear-gradient(to top, ${gradientStopsFadeDark});`,
  },
  {
    selector: '@utility bg-fade-to-r',
    class: '.bg-fade-to-r',
    description: 'Applies a fade gradient towards the right.',
    raw: `  background-image: linear-gradient(to right, ${gradientStopsFadeDark});`,
  },
  {
    selector: '@utility bg-fade-to-b',
    class: '.bg-fade-to-b',
    description: 'Applies a fade gradient towards the bottom.',
    raw: `  background-image: linear-gradient(to bottom, ${gradientStopsFadeDark});`,
  },
  {
    selector: '@utility bg-fade-to-l',
    class: '.bg-fade-to-l',
    description: 'Applies a fade gradient towards the left.',
    raw: `  background-image: linear-gradient(to left, ${gradientStopsFadeDark});`,
  },
  {
    comment: 'Grid',
    selector: '@utility grid-template',
    class: '.grid-template',
    description: 'Applies the responsive Porsche Grid template with named column areas.',
    raw: `  --pds-internal-grid-safe-zone: max(22px, 10.625vw - 12px);
  --_pds-grid-col: minmax(0, var(--pds-internal-grid-outer-column, calc(var(--pds-internal-grid-safe-zone) - --theme(--spacing-fluid-md))));
  display: grid;
  grid-template-columns: [full-start] var(--_pds-grid-col) [wide-start extended-start basic-start narrow-start] repeat(6, minmax(0, 1fr)) [narrow-end basic-end extended-end wide-end] var(--_pds-grid-col) [full-end];
  gap: --theme(--spacing-fluid-md);
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
  {
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
  {
    selector: '@utility col-start-narrow',
    class: '.col-start-narrow',
    description: 'Sets the start position of the narrow area within the Porsche Grid.',
    raw: `  --_pds-grid-one-half: 3;
  grid-column-start: narrow-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 4;
  }`,
  },
  {
    selector: '@utility col-end-narrow',
    class: '.col-end-narrow',
    description: 'Sets the end position of the narrow area within the Porsche Grid.',
    raw: `  --_pds-grid-one-half: 3;
  grid-column-end: narrow-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 4;
  }`,
  },
  {
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
  {
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
  {
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
  {
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
  {
    selector: '@utility col-start-extended',
    class: '.col-start-extended',
    description: 'Sets the start position of the extended area within the Porsche Grid.',
    raw: `  --_pds-grid-one-half: 3;
  grid-column-start: extended-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 7;
  }`,
  },
  {
    selector: '@utility col-end-extended',
    class: '.col-end-extended',
    description: 'Sets the end position of the extended area within the Porsche Grid.',
    raw: `  --_pds-grid-one-half: 3;
  grid-column-end: extended-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 7;
  }`,
  },
  {
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
  {
    selector: '@utility col-start-wide',
    class: '.col-start-wide',
    description: 'Sets the start position of the wide area within the Porsche Grid.',
    raw: `  --_pds-grid-one-half: 3;
  grid-column-start: wide-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 8;
  }`,
  },
  {
    selector: '@utility col-end-wide',
    class: '.col-end-wide',
    description: 'Sets the end position of the wide area within the Porsche Grid.',
    raw: `  --_pds-grid-one-half: 3;
  grid-column-end: wide-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 8;
  }`,
  },
  {
    comment: 'Grid: Area Full',
    selector: '@utility col-full',
    class: '.col-full',
    description: 'Applies the start/end position of the full area within the Porsche Grid.',
    raw: '  grid-column: full;',
  },
  {
    selector: '@utility col-start-full',
    class: '.col-start-full',
    description: 'Sets the start position of the full area within the Porsche Grid.',
    raw: '  grid-column-start: full-start;',
  },
  {
    selector: '@utility col-end-full',
    class: '.col-end-full',
    description: 'Sets the end position of the full area within the Porsche Grid.',
    raw: '  grid-column-end: full-end;',
  },
  {
    comment: 'Grid: Division',
    selector: '@utility col-span-one-half',
    class: '.col-span-one-half',
    description: 'Spans content across one half of the current Porsche Grid area.',
    raw: '  grid-column: span var(--_pds-grid-one-half, 1) / span var(--_pds-grid-one-half, 1);',
  },
  {
    selector: '@utility col-span-one-third',
    class: '.col-span-one-third',
    description: 'Spans content across one third of the current Porsche Grid area.',
    raw: '  grid-column: span var(--_pds-grid-one-third, 1) / span var(--_pds-grid-one-third, 1);',
  },
  {
    selector: '@utility col-span-two-thirds',
    class: '.col-span-two-thirds',
    description: 'Spans content across two thirds of the current Porsche Grid area.',
    raw: '  grid-column: span var(--_pds-grid-two-thirds, 1) / span var(--_pds-grid-two-thirds, 1);',
  },
  {
    comment: 'Skeleton',
    selector: '@utility skeleton',
    class: '.skeleton',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    raw: `  animation: --theme(--animate-skeleton);
  display: block;
  border-radius: --theme(--radius-sm);
  background-color: transparent;
  background-image: linear-gradient(to right, --theme(--color-frosted) 0%, --theme(--color-frosted-strong) 50%, --theme(--color-frosted) 100%);
  background-position: 0 0;
  background-size: 200% 100%;`,
  },
  ...['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].map<TailwindUtility>((size, index) => ({
    ...(index === 0 ? { comment: 'Typography: Text' } : {}),
    selector: `@utility prose-text-${size}`,
    class: `.prose-text-${size}`,
    description: `Applies the text style in size ${size}.`,
    raw: `  font: --theme(--font-weight-normal) --theme(--text-${size}) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);`,
  })),
  ...['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].map<TailwindUtility>((size, index) => ({
    ...(index === 0 ? { comment: 'Typography: Heading' } : {}),
    selector: `@utility prose-heading-${size}`,
    class: `.prose-heading-${size}`,
    description: `Applies the heading style in size ${size}.`,
    // Heading sizes 2xs/xs/sm use the semibold weight, the larger sizes use the normal weight.
    raw: `  font: --theme(--font-weight-${['2xs', 'xs', 'sm'].includes(size) ? 'semibold' : 'normal'}) --theme(--text-${size}) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);`,
  })),
  ...(
    [
      ['sm', '3xl'],
      ['md', '4xl'],
      ['lg', '5xl'],
    ] as const
  ).map<TailwindUtility>(([size, scale], index) => ({
    ...(index === 0 ? { comment: 'Typography: Display' } : {}),
    selector: `@utility prose-display-${size}`,
    class: `.prose-display-${size}`,
    description: `Applies the display style in size ${size}.`,
    raw: `  font: --theme(--font-weight-normal) --theme(--text-${scale}) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);`,
  })),
];
