import { color } from '../theme/color';
import { prefix } from '../prefix';
import type { TailwindUtility } from '../types';
import { typography } from '../theme/typography';

// Documented Tailwind display utilities — the `prose-display-*` font shorthands.
// Each display size maps to a larger typescale than its name suggests.
export const displayUtilities: TailwindUtility[] = [
  {
    comment: 'Typography: Display',
    selector: '@utility prose-display-sm',
    class: '.prose-display-sm',
    description: 'Applies the display style in size sm.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(typography.text['3xl'].property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-display-md',
    class: '.prose-display-md',
    description: 'Applies the display style in size md.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(typography.text['4xl'].property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-display-lg',
    class: '.prose-display-lg',
    description: 'Applies the display style in size lg.',
    raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(typography.text['5xl'].property)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
];
