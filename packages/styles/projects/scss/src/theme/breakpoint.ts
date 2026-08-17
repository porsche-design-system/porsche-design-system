import {
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
} from '@porsche-design-system/tokens';
import { scssIdentifier } from '../deprecation';
import type { DeprecatedScssVariable, ScssMeta } from '../types';

/** The responsive breakpoint scale, keyed by size (e.g. `breakpoint.md`). */
export const breakpoint = {
  xs: {
    name: '$breakpoint-xs',
    value: breakpointXs,
    description: 'Holds the **x-small** responsive breakpoint.',
  },
  sm: {
    name: '$breakpoint-sm',
    value: breakpointSm,
    description: 'Holds the **small** responsive breakpoint.',
  },
  md: {
    name: '$breakpoint-md',
    value: breakpointMd,
    description: 'Holds the **medium** responsive breakpoint.',
  },
  lg: {
    name: '$breakpoint-lg',
    value: breakpointLg,
    description: 'Holds the **large** responsive breakpoint.',
  },
  xl: {
    name: '$breakpoint-xl',
    value: breakpointXl,
    description: 'Holds the **x-large** responsive breakpoint.',
  },
  '2xl': {
    name: '$breakpoint-2xl',
    value: breakpoint2Xl,
    description: 'Holds the **2x-large** responsive breakpoint.',
  },
} satisfies ScssMeta['breakpoint'];

/**
 * Deprecated `$pds-breakpoint-*` aliases. `$pds-breakpoint-base` has no modern equivalent — the
 * current scale starts at `xs`.
 */
export const breakpointDeprecations = {
  base: {
    name: '$pds-breakpoint-base',
    value: 0,
    deprecation: {},
  },
  xs: {
    name: '$pds-breakpoint-xs',
    value: breakpointXs,
    deprecation: { replacement: scssIdentifier(breakpoint.xs) },
  },
  s: {
    name: '$pds-breakpoint-s',
    value: breakpointSm,
    deprecation: { replacement: scssIdentifier(breakpoint.sm) },
  },
  m: {
    name: '$pds-breakpoint-m',
    value: breakpointMd,
    deprecation: { replacement: scssIdentifier(breakpoint.md) },
  },
  l: {
    name: '$pds-breakpoint-l',
    value: breakpointLg,
    deprecation: { replacement: scssIdentifier(breakpoint.lg) },
  },
  xl: {
    name: '$pds-breakpoint-xl',
    value: breakpointXl,
    deprecation: { replacement: scssIdentifier(breakpoint.xl) },
  },
  xxl: {
    name: '$pds-breakpoint-xxl',
    value: breakpoint2Xl,
    deprecation: { replacement: scssIdentifier(breakpoint['2xl']) },
  },
} satisfies Record<string, DeprecatedScssVariable>;
