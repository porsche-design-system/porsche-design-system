import { scssIdentifier } from '../deprecation';
import type { ScssCatalog, ScssRaw } from '../types';

/** The documented `media-query-*` mixins: look a breakpoint key up in `$pds-breakpoints`, guard with `@error` and wrap `@content`. */
const mediaQueries = [
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
];

// The `$pds-breakpoints` lookup map the mixins consult (plumbing). Emitted before them — Sass needs it first.
// Its deprecated keys stay plumbing rather than catalog entries: they are map keys, not declarations.
export const breakpointsMap: ScssRaw = {
  raw: `$pds-breakpoints: (
  'xs': breakpoint.$breakpoint-xs,
  'sm': breakpoint.$breakpoint-sm,
  'md': breakpoint.$breakpoint-md,
  'lg': breakpoint.$breakpoint-lg,
  'xl': breakpoint.$breakpoint-xl,
  '2xl': breakpoint.$breakpoint-2xl,
  // @deprecated
  'base': breakpoint.$pds-breakpoint-base,
  // @deprecated Use 'sm' instead.
  's': breakpoint.$breakpoint-sm,
  // @deprecated Use 'md' instead.
  'm': breakpoint.$breakpoint-md,
  // @deprecated Use 'lg' instead.
  'l': breakpoint.$breakpoint-lg,
  // @deprecated Use '2xl' instead.
  'xxl': breakpoint.$breakpoint-2xl,
);`,
};

/** Media query declarations: the documented `media-query-*` mixins plus their deprecated `pds-media-query-*` aliases. */
export const mediaQuery = [
  ...mediaQueries,
  {
    name: 'pds-media-query-min',
    signature: '($min: null)',
    description: 'Applies a **min** media query with the specified breakpoint.',
    raw: `  @include ${mediaQueries[0].name}($min) {
    @content;
  }`,
    deprecation: { replacement: scssIdentifier(mediaQueries[0]) },
  },
  {
    name: 'pds-media-query-max',
    signature: '($max: null)',
    description: 'Applies a **max** media query with the specified breakpoint.',
    raw: `  @include ${mediaQueries[1].name}($max) {
    @content;
  }`,
    deprecation: { replacement: scssIdentifier(mediaQueries[1]) },
  },
  {
    name: 'pds-media-query-min-max',
    signature: '($min: null, $max: null)',
    description: 'Applies a **min-max** media query with the specified breakpoints.',
    raw: `  @include ${mediaQueries[2].name}($min, $max) {
    @content;
  }`,
    deprecation: { replacement: scssIdentifier(mediaQueries[2]) },
  },
] satisfies ScssCatalog;
