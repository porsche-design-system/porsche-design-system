import { color } from './color';
import { prefix } from './shared';
import type { TailwindUtility } from './types';
import { typography } from './typography';

// Documented Tailwind text utilities — the `prose-text-*` font shorthands for
// each typescale size.
export const textUtilities: TailwindUtility[] = [
  {
    comment: 'Typography: Text',
    selector: '@utility prose-text-2xs',
    class: '.prose-text-2xs',
    description: 'Applies the text style in size 2xs.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-2xs')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-xs',
    class: '.prose-text-xs',
    description: 'Applies the text style in size xs.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-xs')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-sm',
    class: '.prose-text-sm',
    description: 'Applies the text style in size sm.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-sm')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-md',
    class: '.prose-text-md',
    description: 'Applies the text style in size md.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-md')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-lg',
    class: '.prose-text-lg',
    description: 'Applies the text style in size lg.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-lg')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-xl',
    class: '.prose-text-xl',
    description: 'Applies the text style in size xl.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-xl')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-2xl',
    class: '.prose-text-2xl',
    description: 'Applies the text style in size 2xl.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-2xl')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-3xl',
    class: '.prose-text-3xl',
    description: 'Applies the text style in size 3xl.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-3xl')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-4xl',
    class: '.prose-text-4xl',
    description: 'Applies the text style in size 4xl.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-4xl')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-text-5xl',
    class: '.prose-text-5xl',
    description: 'Applies the text style in size 5xl.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-5xl')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
];
