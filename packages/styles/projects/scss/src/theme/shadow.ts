import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import { scssIdentifier } from '../deprecation';
import type { ScssCatalog } from '../types';

const sm = { name: '$shadow-sm', value: shadowSm, description: 'Holds a **small** `shadow`.' };
const md = { name: '$shadow-md', value: shadowMd, description: 'Holds a **medium** `shadow`.' };
const lg = { name: '$shadow-lg', value: shadowLg, description: 'Holds a **large** `shadow`.' };

/** Shadow declarations, keyed by size (e.g. `shadow.md`). */
export const shadow = {
  sm,
  md,
  lg,
  dropShadowLow: {
    name: 'pds-drop-shadow-low',
    raw: `  box-shadow: ${shadowSm};`,
    description: 'Applies a **small** `box-shadow`.',
    deprecation: { replacement: scssIdentifier(sm) },
  },
  dropShadowMedium: {
    name: 'pds-drop-shadow-medium',
    raw: `  box-shadow: ${shadowMd};`,
    description: 'Applies a **medium** `box-shadow`.',
    deprecation: { replacement: scssIdentifier(md) },
  },
  dropShadowHigh: {
    name: 'pds-drop-shadow-high',
    raw: `  box-shadow: ${shadowLg};`,
    description: 'Applies a **large** `box-shadow`.',
    deprecation: { replacement: scssIdentifier(lg) },
  },
} satisfies ScssCatalog;
