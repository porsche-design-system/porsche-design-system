import type { ScssMixin } from '../types';

/**
 * Single source of truth for the documented `prose-heading-*` / `prose-text-*` mixins. Each `raw`
 * body delegates to the private `-prose-heading` / `-prose-text` helpers (plumbing) and keeps its
 * namespaced `font.` references — the `_heading.scss` / `_text.scss` composition descriptors declare
 * the matching `@use` headers. The helpers and the deprecated `pds-heading-*` / `pds-text-*` /
 * `pds-display-*` aliases live in the composition layer, not here.
 */

// Type scale suffix + label + heading weight, in render order (largest → smallest).
const sizes = [
  { suffix: '5xl', label: '5x-large', weight: 'normal' },
  { suffix: '4xl', label: '4x-large', weight: 'normal' },
  { suffix: '3xl', label: '3x-large', weight: 'normal' },
  { suffix: '2xl', label: '2x-large', weight: 'normal' },
  { suffix: 'xl', label: 'x-large', weight: 'normal' },
  { suffix: 'lg', label: 'large', weight: 'normal' },
  { suffix: 'md', label: 'medium', weight: 'normal' },
  { suffix: 'sm', label: 'small', weight: 'semibold' },
  { suffix: 'xs', label: 'x-small', weight: 'semibold' },
  { suffix: '2xs', label: '2x-small', weight: 'semibold' },
] as const;

/** The documented heading variants, applied primarily to heading tags. */
export const heading = sizes.map(({ suffix, label, weight }) => ({
  name: `prose-heading-${suffix}`,
  description: `Applies the **${label}** heading typography variant primarily to \`<h1>\`, \`<h2>\`, \`<h3>\`, \`<h4>\`, \`<h5>\`, \`<h6>\` tags.`,
  raw: `  @include -prose-heading(font.$typescale-${suffix}, font.$font-weight-${weight});`,
})) satisfies ScssMixin[];

/** The documented text variants, applied primarily to flow-content tags. */
export const text = sizes.map(({ suffix, label }) => ({
  name: `prose-text-${suffix}`,
  description: `Applies the **${label}** text typography variant primarily to \`<p>\`, \`<ul>\`, \`<ol>\`, \`<blockquote>\` tags.`,
  raw: `  @include -prose-text(font.$typescale-${suffix});`,
})) satisfies ScssMixin[];

/** No documented display mixins — the `pds-display-*` aliases are deprecated plumbing. */
export const display = [] satisfies ScssMixin[];

/** Typography mixins grouped like the storefront API tables and the tailwind taxonomy. */
export const typography = { heading, text, display };
