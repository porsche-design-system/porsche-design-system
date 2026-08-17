import { blurFrosted } from '@porsche-design-system/tokens';
import { scssIdentifier } from '../deprecation';
import type { DeprecatedScssMixin, ScssMeta } from '../types';

/** Blur theme variable, keyed by variant (e.g. `blur.frosted`). */
export const blur = {
  frosted: {
    name: '$blur-frosted',
    value: blurFrosted,
    description: 'Holds a blur value for a **frosted** effect when combined with a semi-transparent color.',
  },
} satisfies ScssMeta['blur'];

/** The deprecated `pds-frosted-glass` mixin. */
export const blurDeprecations = {
  frostedGlass: {
    name: 'pds-frosted-glass',
    raw: `  backdrop-filter: ${blurFrosted};
  -webkit-backdrop-filter: ${blurFrosted};`,
    deprecation: { replacement: scssIdentifier(blur.frosted) },
  },
} satisfies Record<string, DeprecatedScssMixin>;
