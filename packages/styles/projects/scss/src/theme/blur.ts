import { blurFrosted } from '@porsche-design-system/tokens';
import type { ScssRaw, ScssVariable } from '../types';

/**
 * Blur theme variable. The deprecated `pds-frosted-glass` mixin (plumbing) lives alongside below.
 */
export const blur = [
  {
    name: '$blur-frosted',
    value: blurFrosted,
    description: 'Holds a blur value for a **frosted** effect when combined with a semi-transparent color.',
    group: 'blur',
  },
] satisfies ScssVariable[];

/**
 * Deprecated `pds-frosted-glass` mixin. Plumbing: still emitted, but not a documented `scssMeta` entry.
 * @deprecated Use the documented `$blur-frosted` variable instead.
 */
export const blurDeprecatedMixin: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-frosted-glass {
  backdrop-filter: ${blurFrosted};
  -webkit-backdrop-filter: ${blurFrosted};
}`,
};
