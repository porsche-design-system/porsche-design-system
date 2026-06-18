import {
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
} from '@porsche-design-system/tokens';
import type { TailwindThemeVariable } from '../types';

// Breakpoint — generates the responsive variant prefixes (e.g. `md:`).
export const breakpoint: TailwindThemeVariable[] = [
  {
    property: '--breakpoint-xs',
    value: `${breakpointXs}px`,
    classes: ['xs:*'],
    description: 'Defines the **x-small** responsive breakpoint.',
    group: 'breakpoint',
  },
  {
    property: '--breakpoint-sm',
    value: `${breakpointSm}px`,
    classes: ['sm:*'],
    description: 'Defines the **small** responsive breakpoint.',
    group: 'breakpoint',
  },
  {
    property: '--breakpoint-md',
    value: `${breakpointMd}px`,
    classes: ['md:*'],
    description: 'Defines the **medium** responsive breakpoint.',
    group: 'breakpoint',
  },
  {
    property: '--breakpoint-lg',
    value: `${breakpointLg}px`,
    classes: ['lg:*'],
    description: 'Defines the **large** responsive breakpoint.',
    group: 'breakpoint',
  },
  {
    property: '--breakpoint-xl',
    value: `${breakpointXl}px`,
    classes: ['xl:*'],
    description: 'Defines the **x-large** responsive breakpoint.',
    group: 'breakpoint',
  },
  {
    property: '--breakpoint-2xl',
    value: `${breakpoint2Xl}px`,
    classes: ['2xl:*'],
    description: 'Defines the **2x-large** responsive breakpoint.',
    group: 'breakpoint',
  },
];
