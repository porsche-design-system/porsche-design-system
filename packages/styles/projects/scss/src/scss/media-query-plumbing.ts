import type { ScssRaw } from '../types';

// Media-query plumbing: the `$pds-breakpoints` lookup map (consumed by the documented media-query
// mixins) and the deprecated `pds-media-query-*` aliases that delegate to them. Both still emitted,
// neither a documented `scssMeta` entry. The map keeps its namespaced `breakpoint.` references — the
// `_media-query.scss` descriptor declares the matching `@use` header.
export const breakpointsMap: ScssRaw = {
  raw: `$pds-breakpoints: (
  'xs': breakpoint.$breakpoint-xs,
  'sm': breakpoint.$breakpoint-sm,
  'md': breakpoint.$breakpoint-md,
  'lg': breakpoint.$breakpoint-lg,
  'xl': breakpoint.$breakpoint-xl,
  '2xl': breakpoint.$breakpoint-2xl,
  'base': breakpoint.$pds-breakpoint-base, /* (deprecated) */
  's': breakpoint.$breakpoint-sm, /* alias (deprecated) */
  'm': breakpoint.$breakpoint-md, /* alias (deprecated) */
  'l': breakpoint.$breakpoint-lg, /* alias (deprecated) */
  'xxl': breakpoint.$breakpoint-2xl, /* alias (deprecated) */
);`,
};

export const mediaQueryDeprecatedAliases: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-media-query-min($min: null) {
  @include media-query-min($min) {
    @content;
  }
}

/* alias (deprecated) */
@mixin pds-media-query-max($max: null) {
  @include media-query-max($max) {
    @content;
  }
}

/* alias (deprecated) */
@mixin pds-media-query-min-max($min: null, $max: null) {
  @include media-query-min-max($min, $max) {
    @content;
  }
}`,
};
