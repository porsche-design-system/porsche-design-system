import type { ScssRaw } from '../types';

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

/** The deprecated `pds-heading-*` aliases routed through the documented prose mixins. Plumbing. */
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

/** The deprecated `pds-text-*` aliases routed through the documented prose mixins. Plumbing. */
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
