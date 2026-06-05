import { color } from './color';
import { prefix } from './shared';
import type { TailwindUtility } from './types';
import { typography } from './typography';

// Documented Tailwind display utilities — the `prose-display-*` font shorthands.
// Each display size maps to a larger typescale than its name suggests.
export const displayUtilities: TailwindUtility[] = (
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
  raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(`--text-${scale}`)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
}));
