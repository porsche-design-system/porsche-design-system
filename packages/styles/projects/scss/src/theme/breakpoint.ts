import {
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
} from '@porsche-design-system/tokens';
import type { ScssRaw, ScssVariable } from '../types';

/**
 * Breakpoint theme variables (the responsive breakpoint scale). The deprecated `$pds-breakpoint-*`
 * aliases (plumbing) live alongside below.
 */
export const breakpoint = [
  {
    name: '$breakpoint-xs',
    value: breakpointXs,
    description: 'Holds the **x-small** responsive breakpoint.',
    group: 'breakpoint',
  },
  {
    name: '$breakpoint-sm',
    value: breakpointSm,
    description: 'Holds the **small** responsive breakpoint.',
    group: 'breakpoint',
  },
  {
    name: '$breakpoint-md',
    value: breakpointMd,
    description: 'Holds the **medium** responsive breakpoint.',
    group: 'breakpoint',
  },
  {
    name: '$breakpoint-lg',
    value: breakpointLg,
    description: 'Holds the **large** responsive breakpoint.',
    group: 'breakpoint',
  },
  {
    name: '$breakpoint-xl',
    value: breakpointXl,
    description: 'Holds the **x-large** responsive breakpoint.',
    group: 'breakpoint',
  },
  {
    name: '$breakpoint-2xl',
    value: breakpoint2Xl,
    description: 'Holds the **2x-large** responsive breakpoint.',
    group: 'breakpoint',
  },
] satisfies ScssVariable[];

/**
 * Deprecated `$pds-breakpoint-*` aliases. Plumbing: still emitted, but not a documented `scssMeta` entry.
 * @deprecated Use the documented `$breakpoint-*` variables instead.
 */
export const breakpointDeprecatedAliases: ScssRaw = {
  raw: [
    '$pds-breakpoint-base: 0; /* alias (deprecated) */',
    `$pds-breakpoint-xs: ${breakpointXs}; /* alias (deprecated) */`,
    `$pds-breakpoint-s: ${breakpointSm}; /* alias (deprecated) */`,
    `$pds-breakpoint-m: ${breakpointMd}; /* alias (deprecated) */`,
    `$pds-breakpoint-l: ${breakpointLg}; /* alias (deprecated) */`,
    `$pds-breakpoint-xl: ${breakpointXl}; /* alias (deprecated) */`,
    `$pds-breakpoint-xxl: ${breakpoint2Xl}; /* alias (deprecated) */`,
  ].join('\n'),
};
