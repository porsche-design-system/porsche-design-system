import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';
import type { ScssVariable } from '../types';

/**
 * Shadow theme variables. The deprecated `pds-drop-shadow-*` mixins are plumbing — they live in the
 * composition layer, not here.
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
