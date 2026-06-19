import type { ScssMixin, ScssRaw } from '../types';

/** The documented `skeleton()` mixin. The `raw` body keeps its namespaced `border.` / `color.` / `motion.` cross-references. */
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
 * Deprecated theme-parameterized `pds-skeleton` variant (plumbing).
 * @deprecated Use the documented `skeleton()` mixin.
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
