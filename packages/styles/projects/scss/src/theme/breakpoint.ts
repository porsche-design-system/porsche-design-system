import {
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
} from '@porsche-design-system/tokens';
import { scssIdentifier } from '../deprecation';
import type { ScssCatalog } from '../types';

/** The documented responsive breakpoint scale. */
const breakpoints = {
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
};

/** Breakpoint declarations, keyed by size (e.g. `breakpoint.md`), plus the deprecated `$pds-breakpoint-*` aliases. */
export const breakpoint = {
  ...breakpoints,
  base: {
    name: '$pds-breakpoint-base',
    value: 0,
    description: 'Holds the **base** responsive breakpoint. The current scale starts at **x-small**.',
    deprecation: {},
  },
  aliasXs: {
    name: '$pds-breakpoint-xs',
    value: breakpointXs,
    description: 'Holds the **x-small** responsive breakpoint.',
    deprecation: { replacement: scssIdentifier(breakpoints.xs) },
  },
  aliasS: {
    name: '$pds-breakpoint-s',
    value: breakpointSm,
    description: 'Holds the **small** responsive breakpoint.',
    deprecation: { replacement: scssIdentifier(breakpoints.sm) },
  },
  aliasM: {
    name: '$pds-breakpoint-m',
    value: breakpointMd,
    description: 'Holds the **medium** responsive breakpoint.',
    deprecation: { replacement: scssIdentifier(breakpoints.md) },
  },
  aliasL: {
    name: '$pds-breakpoint-l',
    value: breakpointLg,
    description: 'Holds the **large** responsive breakpoint.',
    deprecation: { replacement: scssIdentifier(breakpoints.lg) },
  },
  aliasXl: {
    name: '$pds-breakpoint-xl',
    value: breakpointXl,
    description: 'Holds the **x-large** responsive breakpoint.',
    deprecation: { replacement: scssIdentifier(breakpoints.xl) },
  },
  aliasXxl: {
    name: '$pds-breakpoint-xxl',
    value: breakpoint2Xl,
    description: 'Holds the **2x-large** responsive breakpoint.',
    deprecation: { replacement: scssIdentifier(breakpoints['2xl']) },
  },
} satisfies ScssCatalog;
