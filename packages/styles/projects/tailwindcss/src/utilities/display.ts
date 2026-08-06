import { color } from '../theme/color';
import { font } from '../theme/font';
import { prefix } from '../prefix';
import type { TailwindUtility } from '../types';

// Documented Tailwind display utilities — the `prose-display-*` font shorthands.
// Each display size maps to a larger typescale than its name suggests.
export const displayUtilities: TailwindUtility[] = [
  {
    comment: 'Typography: Display',
    selector: '@utility prose-display-sm',
    class: '.prose-display-sm',
    description: 'Applies the display style in size sm.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['3xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-display-md',
    class: '.prose-display-md',
    description: 'Applies the display style in size md.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['4xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
  {
    selector: '@utility prose-display-lg',
    class: '.prose-display-lg',
    description: 'Applies the display style in size lg.',
    raw: `  font: ${prefix(font.weight.normal.property)} ${prefix(font.size['5xl'].property)} / ${prefix(font.lineHeight.normal.property)} ${prefix(font.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
  },
];
