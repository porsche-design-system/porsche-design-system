import type { ScssMixin } from '../types';

/**
 * Single source of truth for the documented `focus-visible()` mixin. The `raw` body keeps its
 * namespaced `color.` reference — the `_focus.scss` composition descriptor declares the matching
 * `@use` headers. The deprecated `pds-focus` variant and its lookup maps are plumbing — they live in
 * the composition layer, not here.
 */
export const focus = [
  {
    name: 'focus-visible',
    signature: '($offset: 2px)',
    description: 'Applies a **focus-visible** style.',
    raw: `  &:focus-visible {
    outline: 2px solid color.$color-focus;
    outline-offset: $offset;
  }`,
  },
] satisfies ScssMixin[];
