import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import type { ScssRaw, ScssVariable } from '../types';

/**
 * Shadow theme variables. The deprecated `pds-drop-shadow-*` mixins (plumbing) live alongside below.
 */
export const shadow = [
  {
    name: '$shadow-sm',
    value: shadowSm,
    description: 'Holds a **small** `shadow`.',
    group: 'shadow',
  },
  {
    name: '$shadow-md',
    value: shadowMd,
    description: 'Holds a **medium** `shadow`.',
    group: 'shadow',
  },
  {
    name: '$shadow-lg',
    value: shadowLg,
    description: 'Holds a **large** `shadow`.',
    group: 'shadow',
  },
] satisfies ScssVariable[];

/**
 * Deprecated `pds-drop-shadow-*` mixins. Plumbing: still emitted, but not documented `scssMeta` entries.
 * @deprecated Use the documented `$shadow-*` variables instead.
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
