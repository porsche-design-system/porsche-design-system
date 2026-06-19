import type { ScssMixin, ScssRaw } from '../types';

/**
 * Single source of truth for the documented `media-query-*` mixins. Their `raw` bodies take a
 * breakpoint key, look it up in the file-local `$pds-breakpoints` map (plumbing, alongside below),
 * guard with `@error` and wrap `@content` — so the `_media-query.scss` descriptor declares the
 * `breakpoint` + `sass:map` `@use` headers. The deprecated `pds-media-query-*` variants (plumbing)
 * live alongside below too.
 */
export const mediaQuery = [
  {
    name: 'media-query-min',
    signature: '($min: null)',
    description: 'Applies a **min** media query with the specified breakpoint.',
    raw: `  @if map.has-key($pds-breakpoints, $min) {
    @media (min-width: #{map.get($pds-breakpoints, $min)}px) {
      @content;
    }
  } @else {
    @error "Passed #{$min} breakpoint is not available for used media-query-min() mixin.";
  }`,
  },
  {
    name: 'media-query-max',
    signature: '($max: null)',
    description: 'Applies a **max** media query with the specified breakpoint.',
    raw: `  @if map.has-key($pds-breakpoints, $max) {
    @media (max-width: #{map.get($pds-breakpoints, $max) - 1}px) {
      @content;
    }
  } @else {
    @error "Passed #{$max} breakpoint is not available for used media-query-max() mixin.";
  }`,
  },
  {
    name: 'media-query-min-max',
    signature: '($min: null, $max: null)',
    description: 'Applies a **min-max** media query with the specified breakpoints.',
    raw: `  @if map.has-key($pds-breakpoints, $min) and map.has-key($pds-breakpoints, $max) {
    @media (min-width: #{map.get($pds-breakpoints, $min)}px) and (max-width: #{map.get($pds-breakpoints, $max) - 1}px) {
      @content;
    }
  } @else {
    @error "Passed #{$min} and/or #{$max} breakpoint is not available for used media-query-min-max() mixin.";
  }`,
  },
] satisfies ScssMixin[];

// The `$pds-breakpoints` lookup map consumed by the documented media-query mixins above. Plumbing:
// emitted before them (Sass needs it first), not a documented `scssMeta` entry. It keeps its
// namespaced `breakpoint.` references — the `_media-query.scss` descriptor declares the `@use` header.
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

/**
 * The deprecated `pds-media-query-*` aliases delegating to the documented mixins. Plumbing.
 * @deprecated Use the documented `media-query-min()` / `media-query-max()` / `media-query-min-max()`
 * mixins instead.
 */
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
