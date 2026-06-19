import { blurFrosted } from '@porsche-design-system/tokens';
import type { ScssMeta, ScssRaw } from '../types';

/** Blur theme variable, keyed by variant (e.g. `blur.frosted`). */
export const blur = {
  frosted: {
    name: '$blur-frosted',
    value: blurFrosted,
    description: 'Holds a blur value for a **frosted** effect when combined with a semi-transparent color.',
    group: 'blur',
  },
} satisfies ScssMeta['blur'];

/**
 * Deprecated `pds-frosted-glass` mixin (plumbing).
 * @deprecated Use the documented `$blur-frosted` variable.
 */
export const blurDeprecatedMixin: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-frosted-glass {
  backdrop-filter: ${blurFrosted};
  -webkit-backdrop-filter: ${blurFrosted};
}`,
};
