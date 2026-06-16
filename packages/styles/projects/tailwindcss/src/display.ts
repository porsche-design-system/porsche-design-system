import { color } from './color';
import { prefix } from './shared';
import type { TailwindUtility } from './types';
import { typography } from './typography';

// Documented Tailwind display utilities — the `prose-display-*` font shorthands.
// Each display size maps to a larger typescale than its name suggests.
export const displayUtilities: TailwindUtility[] = [
  {
    comment: 'Typography: Display',
    selector: '@utility prose-display-sm',
    class: '.prose-display-sm',
    description: 'Applies the display style in size sm.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-3xl')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-display-md',
    class: '.prose-display-md',
    description: 'Applies the display style in size md.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-4xl')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-display-lg',
    class: '.prose-display-lg',
    description: 'Applies the display style in size lg.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix('--text-5xl')} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
];
