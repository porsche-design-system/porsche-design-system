import type { Meta } from '../meta.types';
import { getMediaQueryMax, getMediaQueryMin, getMediaQueryMinMax } from './helpers';

export const mediaQueryMeta: Meta = {
  breakpoint: {
    name: 'breakpoint',
    value: { base: 0, xs: 480, s: 760, m: 1000, l: 1300, xl: 1760, xxl: 1920 } as const,
    description: 'Object containing all breakpoint values.',
  },
  breakpoints: {
    name: 'breakpoints',
    value: ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const,
    description: 'Array containing all breakpoint keys.',
    handWritten: true,
  },
  breakpointBase: { name: 'breakpointBase', value: 0, description: 'Holds the `base` breakpoint value.' },
  breakpointXS: { name: 'breakpointXS', value: 480, description: 'Holds the `xs` breakpoint value.' },
  breakpointS: { name: 'breakpointS', value: 760, description: 'Holds the `sm` breakpoint value.' },
  breakpointM: { name: 'breakpointM', value: 1000, description: 'Holds the `md` breakpoint value.' },
  breakpointL: { name: 'breakpointL', value: 1300, description: 'Holds the `lg` breakpoint value.' },
  breakpointXL: { name: 'breakpointXL', value: 1760, description: 'Holds the `xl` breakpoint value.' },
  breakpointXXL: { name: 'breakpointXXL', value: 1920, description: 'Holds the `2xl` breakpoint value.' },
  getMediaQueryMax: {
    name: 'getMediaQueryMax',
    description: 'Applies a **max** media query with the specified breakpoint.',
    value: getMediaQueryMax,
  },
  getMediaQueryMin: {
    name: 'getMediaQueryMin',
    description: 'Applies a **min** media query with the specified breakpoint.',
    value: getMediaQueryMin,
  },
  getMediaQueryMinMax: {
    name: 'getMediaQueryMinMax',
    description: 'Applies a **min-max** media query with the specified breakpoints.',
    value: getMediaQueryMinMax,
  },
} as const;
