import type { ScssMixin } from '../types';

/**
 * Single source of truth for the documented `skeleton()` mixin. The `raw` body keeps its namespaced
 * cross-references (`border.`, `color.`, `motion.`) — the `_skeleton.scss` composition descriptor
 * declares the matching `@use` headers. The deprecated `pds-skeleton` variant is plumbing — it lives
 * in the composition layer, not here.
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
