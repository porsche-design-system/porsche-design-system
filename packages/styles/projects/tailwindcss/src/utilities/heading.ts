import { color } from '../theme/color';
import { font } from '../theme/font';
import { prefix } from '../prefix';
import type { TailwindUtility } from '../types';

// Documented Tailwind heading utilities — the `prose-heading-*` font shorthands
// for each typescale size. Sizes 2xs/xs/sm use the semibold weight, the larger
// sizes use the normal weight.
export const headingUtilities: TailwindUtility[] = [
  {
    comment: 'Typography: Heading',
    selector: '@utility prose-heading-2xs',
    class: '.prose-heading-2xs',
    description: 'Applies the heading style in size 2xs.',
    raw: `  font: ${prefix(font.weight.semibold.property)} ${prefix(font.size['2xs'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-xs',
    class: '.prose-heading-xs',
    description: 'Applies the heading style in size xs.',
    raw: `  font: ${prefix(font.weight.semibold.property)} ${prefix(font.size.xs.property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-sm',
    class: '.prose-heading-sm',
    description: 'Applies the heading style in size sm.',
    raw: `  font: ${prefix(font.weight.semibold.property)} ${prefix(font.size.sm.property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-md',
    class: '.prose-heading-md',
    description: 'Applies the heading style in size md.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size.md.property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-lg',
    class: '.prose-heading-lg',
    description: 'Applies the heading style in size lg.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size.lg.property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-xl',
    class: '.prose-heading-xl',
    description: 'Applies the heading style in size xl.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size.xl.property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-2xl',
    class: '.prose-heading-2xl',
    description: 'Applies the heading style in size 2xl.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['2xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-3xl',
    class: '.prose-heading-3xl',
    description: 'Applies the heading style in size 3xl.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['3xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-4xl',
    class: '.prose-heading-4xl',
    description: 'Applies the heading style in size 4xl.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['4xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-heading-5xl',
    class: '.prose-heading-5xl',
    description: 'Applies the heading style in size 5xl.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['5xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
];
