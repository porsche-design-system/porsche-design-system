import type { ScssMixin, ScssRaw } from '../types';

/**
 * Single source of truth for the documented `prose-heading-*` / `prose-text-*` mixins. Each `raw`
 * body delegates to the private `-prose-heading` / `-prose-text` helpers (plumbing) and keeps its
 * namespaced `font.` references — the `_heading.scss` / `_text.scss` composition descriptors declare
 * the matching `@use` headers. The helpers and the deprecated `pds-heading-*` / `pds-text-*` /
 * `pds-display-*` aliases (plumbing) live alongside below.
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

/**
 * The private `-prose-heading` helper: the shared body the documented `prose-heading-*` mixins
 * delegate to. Plumbing — emitted before the documented mixins (Sass needs it defined first), but
 * not a documented `scssMeta` entry.
 */
export const proseHeadingHelper: ScssRaw = {
  raw: `@mixin -prose-heading($size, $weight) {
  @include font.cjk-font-family;
  font: $weight $size / font.$leading-normal font.$font-porsche-next;
  color: color.$color-primary;
}`,
};

/** The private `-prose-text` helper the documented `prose-text-*` mixins delegate to. Plumbing. */
export const proseTextHelper: ScssRaw = {
  raw: `@mixin -prose-text($size) {
  @include font.cjk-font-family;
  font: font.$font-weight-normal $size / font.$leading-normal font.$font-porsche-next;
  color: color.$color-primary;
}`,
};

/**
 * The deprecated `pds-heading-*` aliases routed through the documented prose mixins. Plumbing.
 * @deprecated Use the documented `prose-heading-*` mixins instead.
 */
export const headingDeprecatedAliases: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-heading-xx-large {
  @include prose-heading-2xl();
}
/* alias (deprecated) */
@mixin pds-heading-x-large {
  @include prose-heading-xl();
}
/* alias (deprecated) */
@mixin pds-heading-large {
  @include prose-heading-lg();
}
/* alias (deprecated) */
@mixin pds-heading-medium {
  @include prose-heading-md();
}
/* alias (deprecated) */
@mixin pds-heading-small {
  @include prose-heading-sm();
}`,
};

/**
 * The deprecated `pds-text-*` aliases routed through the documented prose mixins. Plumbing.
 * @deprecated Use the documented `prose-text-*` mixins instead.
 */
export const textDeprecatedAliases: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-text-x-large {
  @include prose-text-xl();
}
/* alias (deprecated) */
@mixin pds-text-large {
  @include prose-text-lg();
}
/* alias (deprecated) */
@mixin pds-text-medium {
  @include prose-text-md();
}
/* alias (deprecated) */
@mixin pds-text-small {
  @include prose-text-sm();
}
/* alias (deprecated) */
@mixin pds-text-x-small {
  @include prose-text-xs();
}
/* alias (deprecated) */
@mixin pds-text-xx-small {
  @include prose-text-2xs();
}`,
};

/**
 * The deprecated `pds-display-*` aliases routed through the heading prose mixins (the `_display.scss`
 * descriptor declares the `@use 'heading'` header). Plumbing — the whole `_display.scss` partial is
 * plumbing; there are no documented display entries.
 * @deprecated Use the documented `prose-heading-3xl` / `prose-heading-4xl` / `prose-heading-5xl`
 * mixins instead.
 */
export const displayDeprecatedAliases: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-display-large {
  @include heading.prose-heading-5xl;
}
/* alias (deprecated) */
@mixin pds-display-medium {
  @include heading.prose-heading-4xl;
}
/* alias (deprecated) */
@mixin pds-display-small {
  @include heading.prose-heading-3xl;
}`,
};
