import { color } from './color';
import { prefix } from './shared';
import type { TailwindUtility } from './types';
import { typography } from './typography';

// Documented Tailwind heading utilities — the `prose-heading-*` font shorthands
// for each typescale size.
export const headingUtilities: TailwindUtility[] = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
].map<TailwindUtility>((size, index) => ({
  ...(index === 0 ? { comment: 'Typography: Heading' } : {}),
  selector: `@utility prose-heading-${size}`,
  class: `.prose-heading-${size}`,
  description: `Applies the heading style in size ${size}.`,
  // Heading sizes 2xs/xs/sm use the semibold weight, the larger sizes use the normal weight.
  raw: `  font: ${['2xs', 'xs', 'sm'].includes(size) ? prefix(typography.weight.semibold.property) : prefix(typography.weight.normal.property)} ${prefix(`--text-${size}`)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
}));
