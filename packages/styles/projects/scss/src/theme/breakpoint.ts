import {
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
} from '@porsche-design-system/tokens';
import type { ScssVariable } from '../types';

/**
 * Breakpoint theme variables (the responsive breakpoint scale). The deprecated `$pds-breakpoint-*`
 * aliases are plumbing — they live in the composition layer, not here.
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
