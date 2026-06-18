import { color } from '../theme/color';
import { prefix } from '../prefix';
import type { TailwindUtility } from '../types';
import { typography } from '../theme/typography';

// Documented Tailwind heading utilities — the `prose-heading-*` font shorthands
// for each typescale size. Sizes 2xs/xs/sm use the semibold weight, the larger
// sizes use the normal weight.
export const headingUtilities: TailwindUtility[] = [
  {
    comment: 'Typography: Heading',
    selector: '@utility prose-heading-2xs',
    class: '.prose-heading-2xs',
    description: 'Applies the heading style in size 2xs.',
    raw: `  font: ${prefix(typography.weight.semibold.property)} ${prefix(typography.text['2xs'].property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-xs',
    class: '.prose-heading-xs',
    description: 'Applies the heading style in size xs.',
    raw: `  font: ${prefix(typography.weight.semibold.property)} ${prefix(typography.text.xs.property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-sm',
    class: '.prose-heading-sm',
    description: 'Applies the heading style in size sm.',
    raw: `  font: ${prefix(typography.weight.semibold.property)} ${prefix(typography.text.sm.property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-md',
    class: '.prose-heading-md',
    description: 'Applies the heading style in size md.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(typography.text.md.property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-lg',
    class: '.prose-heading-lg',
    description: 'Applies the heading style in size lg.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(typography.text.lg.property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-xl',
    class: '.prose-heading-xl',
    description: 'Applies the heading style in size xl.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(typography.text.xl.property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-2xl',
    class: '.prose-heading-2xl',
    description: 'Applies the heading style in size 2xl.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(typography.text['2xl'].property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-3xl',
    class: '.prose-heading-3xl',
    description: 'Applies the heading style in size 3xl.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(typography.text['3xl'].property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-4xl',
    class: '.prose-heading-4xl',
    description: 'Applies the heading style in size 4xl.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(typography.text['4xl'].property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-5xl',
    class: '.prose-heading-5xl',
    description: 'Applies the heading style in size 5xl.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(typography.text['5xl'].property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
];
