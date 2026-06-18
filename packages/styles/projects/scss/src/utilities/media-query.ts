import type { ScssMixin } from '../types';

/**
 * Single source of truth for the documented `media-query-*` mixins. Their `raw` bodies take a
 * breakpoint key, look it up in the file-local `$pds-breakpoints` map (plumbing in the composition
 * layer), guard with `@error` and wrap `@content` — so the `_media-query.scss` descriptor declares
 * the `breakpoint` + `sass:map` `@use` headers. The deprecated `pds-media-query-*` variants are
 * plumbing — they live in the composition layer, not here.
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
    @error "Passed #{$min} breakpoint is not available for used pds-media-query-min() mixin.";
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
    @error "Passed #{$max} breakpoint is not available for used pds-media-query-max() mixin.";
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
    @error "Passed #{$min} and/or #{$max} breakpoint is not available for used pds-media-query-min-max() mixin.";
  }`,
  },
] satisfies ScssMixin[];
