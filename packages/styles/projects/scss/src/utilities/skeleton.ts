import type { ScssMixin, ScssRaw } from '../types';

/**
 * Single source of truth for the documented `skeleton()` mixin. The `raw` body keeps its namespaced
 * cross-references (`border.`, `color.`, `motion.`) — the `_skeleton.scss` composition descriptor
 * declares the matching `@use` headers. The deprecated `pds-skeleton` variant (plumbing) lives
 * alongside below.
 */
export const skeleton = [
  {
    name: 'skeleton',
    signature: '()',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    raw: `  @keyframes skeleton {
    from {
      background-position-x: 100%;
    }
    to {
      background-position-x: -100%;
    }
  }

  display: block;
  border-radius: border.$radius-sm;
  background: transparent linear-gradient(to right, color.$color-frosted 0%, color.$color-frosted-strong 50%, color.$color-frosted 100%) 0 0 / 200% 100%;
  animation: skeleton motion.$duration-xl motion.$ease-in-out infinite;`,
  },
] satisfies ScssMixin[];

/**
 * `pds-skeleton` — the deprecated theme-parameterized variant wrapping the documented `skeleton()`
 * mixin. Plumbing: still emitted, but not a documented `scssMeta` entry.
 * @deprecated Use the documented `skeleton()` mixin instead.
 */
export const skeletonDeprecatedMixin: ScssRaw = {
  raw: `@mixin pds-skeleton($theme: 'light') {
  @include skeleton();
  @if ($theme == 'dark') {
    color-scheme: dark;
  } @else if ($theme == 'auto') {
    color-scheme: light dark;
  } @else {
    color-scheme: light;
  }
}`,
};
