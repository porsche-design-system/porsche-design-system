import { blurFrosted } from '@porsche-design-system/tokens';
import type { ScssVariable } from '../types';

/**
 * Blur theme variable. The deprecated `pds-frosted-glass` mixin is plumbing — it lives in the
 * composition layer, not here.
 */
export const blur = [
  {
    name: '$blur-frosted',
    value: blurFrosted,
    description: 'Holds a blur value for a **frosted** effect when combined with a semi-transparent color.',
    group: 'blur',
  },
] satisfies ScssVariable[];
