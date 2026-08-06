import { color } from '../theme/color';
import { font } from '../theme/font';
import { prefix } from '../prefix';
import type { TailwindUtility } from '../types';

// Documented Tailwind text utilities — the `prose-text-*` font shorthands for
// each typescale size.
export const textUtilities: TailwindUtility[] = [
  {
    comment: 'Typography: Text',
    selector: '@utility prose-text-2xs',
    class: '.prose-text-2xs',
    description: 'Applies the text style in size 2xs.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['2xs'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-xs',
    class: '.prose-text-xs',
    description: 'Applies the text style in size xs.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size.xs.property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-sm',
    class: '.prose-text-sm',
    description: 'Applies the text style in size sm.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size.sm.property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-md',
    class: '.prose-text-md',
    description: 'Applies the text style in size md.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size.md.property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-lg',
    class: '.prose-text-lg',
    description: 'Applies the text style in size lg.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size.lg.property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-xl',
    class: '.prose-text-xl',
    description: 'Applies the text style in size xl.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size.xl.property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-2xl',
    class: '.prose-text-2xl',
    description: 'Applies the text style in size 2xl.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['2xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-3xl',
    class: '.prose-text-3xl',
    description: 'Applies the text style in size 3xl.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['3xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-4xl',
    class: '.prose-text-4xl',
    description: 'Applies the text style in size 4xl.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['4xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-5xl',
    class: '.prose-text-5xl',
    description: 'Applies the text style in size 5xl.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['5xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
];
