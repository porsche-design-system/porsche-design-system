import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import { scssIdentifier } from '../deprecation';
import type { DeprecatedScssMixin, ScssMeta } from '../types';

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

/** The deprecated `pds-drop-shadow-*` mixins, replaced by the documented `$shadow-*` variables. */
export const shadowDeprecations = {
  high: {
    name: 'pds-drop-shadow-high',
    raw: `  box-shadow: ${shadowLg};`,
    deprecation: { replacement: scssIdentifier(shadow.lg) },
  },
  low: {
    name: 'pds-drop-shadow-low',
    raw: `  box-shadow: ${shadowSm};`,
    deprecation: { replacement: scssIdentifier(shadow.sm) },
  },
  medium: {
    name: 'pds-drop-shadow-medium',
    raw: `  box-shadow: ${shadowMd};`,
    deprecation: { replacement: scssIdentifier(shadow.md) },
  },
} satisfies Record<string, DeprecatedScssMixin>;
