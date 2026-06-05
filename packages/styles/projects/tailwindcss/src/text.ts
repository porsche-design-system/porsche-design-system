import { color } from './color';
import { prefix } from './shared';
import type { TailwindUtility } from './types';
import { typography } from './typography';

// Documented Tailwind text utilities — the `prose-text-*` font shorthands for
// each typescale size.
export const textUtilities: TailwindUtility[] = [
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
  ...(index === 0 ? { comment: 'Typography: Text' } : {}),
  selector: `@utility prose-text-${size}`,
  class: `.prose-text-${size}`,
  description: `Applies the text style in size ${size}.`,
  raw: `  font: ${prefix(typography.weight.normal.property)} ${prefix(`--text-${size}`)} / ${prefix(typography.lineHeight.normal.property)} ${prefix(typography.family.porscheNext.property)};
  color: ${prefix(color.foreground.primary.property)};`,
}));
