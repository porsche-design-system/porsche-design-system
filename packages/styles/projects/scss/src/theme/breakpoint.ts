import {
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
} from '@porsche-design-system/tokens';
import type { ScssMeta, ScssRaw } from '../types';

/** The responsive breakpoint scale, keyed by size (e.g. `breakpoint.md`). */
export const breakpoint = {
  xs: {
    name: '$breakpoint-xs',
    value: breakpointXs,
    description: 'Holds the **x-small** responsive breakpoint.',
    group: 'breakpoint',
  },
  sm: {
    name: '$breakpoint-sm',
    value: breakpointSm,
    description: 'Holds the **small** responsive breakpoint.',
    group: 'breakpoint',
  },
  md: {
    name: '$breakpoint-md',
    value: breakpointMd,
    description: 'Holds the **medium** responsive breakpoint.',
    group: 'breakpoint',
  },
  lg: {
    name: '$breakpoint-lg',
    value: breakpointLg,
    description: 'Holds the **large** responsive breakpoint.',
    group: 'breakpoint',
  },
  xl: {
    name: '$breakpoint-xl',
    value: breakpointXl,
    description: 'Holds the **x-large** responsive breakpoint.',
    group: 'breakpoint',
  },
  '2xl': {
    name: '$breakpoint-2xl',
    value: breakpoint2Xl,
    description: 'Holds the **2x-large** responsive breakpoint.',
    group: 'breakpoint',
  },
} satisfies ScssMeta['breakpoint'];

/**
 * Deprecated `$pds-breakpoint-*` aliases (plumbing).
 * @deprecated Use the documented `$breakpoint-*` variables.
 */
export const breakpointDeprecatedAliases: ScssRaw = {
  raw: `$pds-breakpoint-base: 0; /* alias (deprecated) */
$pds-breakpoint-xs: ${breakpointXs}; /* alias (deprecated) */
$pds-breakpoint-s: ${breakpointSm}; /* alias (deprecated) */
$pds-breakpoint-m: ${breakpointMd}; /* alias (deprecated) */
$pds-breakpoint-l: ${breakpointLg}; /* alias (deprecated) */
$pds-breakpoint-xl: ${breakpointXl}; /* alias (deprecated) */
$pds-breakpoint-xxl: ${breakpoint2Xl}; /* alias (deprecated) */`,
};
