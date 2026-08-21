import { blurFrosted } from '@porsche-design-system/tokens';
import { scssIdentifier } from '../deprecation';
import type { ScssCatalog } from '../types';

const frosted = {
  name: '$blur-frosted',
  value: blurFrosted,
  description: 'Holds a blur value for a **frosted** effect when combined with a semi-transparent color.',
};

/** Blur declarations, keyed by variant (e.g. `blur.frosted`). */
export const blur = {
  frosted,
  frostedGlass: {
    name: 'pds-frosted-glass',
    raw: `  backdrop-filter: ${blurFrosted};
  -webkit-backdrop-filter: ${blurFrosted};`,
    description: 'Applies a **frosted** effect through `backdrop-filter`.',
    deprecation: { replacement: scssIdentifier(frosted) },
  },
} satisfies ScssCatalog;
