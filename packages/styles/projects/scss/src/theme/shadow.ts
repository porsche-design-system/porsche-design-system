import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import type { ScssMeta, ScssRaw } from '../types';

/** Shadow theme variables, keyed by size (e.g. `shadow.md`). */
export const shadow = {
  sm: {
    name: '$shadow-sm',
    value: shadowSm,
    description: 'Holds a **small** `shadow`.',
  },
  md: {
    name: '$shadow-md',
    value: shadowMd,
    description: 'Holds a **medium** `shadow`.',
  },
  lg: {
    name: '$shadow-lg',
    value: shadowLg,
    description: 'Holds a **large** `shadow`.',
  },
} satisfies ScssMeta['shadow'];

/**
 * Deprecated `pds-drop-shadow-*` mixins (plumbing).
 * @deprecated Use the documented `$shadow-*` variables.
 */
export const shadowDeprecatedMixins: ScssRaw = {
  raw: `/* alias (deprecated) */
@mixin pds-drop-shadow-high {
  box-shadow: ${shadowLg};
}

/* alias (deprecated) */
@mixin pds-drop-shadow-low {
  box-shadow: ${shadowSm};
}

/* alias (deprecated) */
@mixin pds-drop-shadow-medium {
  box-shadow: ${shadowMd};
}`,
};
