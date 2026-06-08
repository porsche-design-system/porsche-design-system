import { getMediaQueryMax } from './getMediaQueryMax';
import { getMediaQueryMin } from './getMediaQueryMin';
import { getMediaQueryMinMax } from './getMediaQueryMinMax';
import type { Meta } from '../meta.types';

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
  },
  breakpointBase: { name: 'breakpointBase', value: 0, description: 'Holds the `base` breakpoint value.' },
  breakpointXS: { name: 'breakpointXS', value: 480, description: 'Holds the `xs` breakpoint value.' },
  breakpointS: { name: 'breakpointS', value: 760, description: 'Holds the `s` breakpoint value.' },
  breakpointM: { name: 'breakpointM', value: 1000, description: 'Holds the `m` breakpoint value.' },
  breakpointL: { name: 'breakpointL', value: 1300, description: 'Holds the `l` breakpoint value.' },
  breakpointXL: { name: 'breakpointXL', value: 1760, description: 'Holds the `xl` breakpoint value.' },
  breakpointXXL: { name: 'breakpointXXL', value: 1920, description: 'Holds the `2xl` breakpoint value.' },
  getMediaQueryMax: {
    name: 'getMediaQueryMax',
    description: "Returns a **max-width** media query string for the specified breakpoint.",
    value: getMediaQueryMax,
  },
  getMediaQueryMin: {
    name: 'getMediaQueryMin',
    description: "Returns a **min-width** media query string for the specified breakpoint.",
    value: getMediaQueryMin,
  },
  getMediaQueryMinMax: {
    name: 'getMediaQueryMinMax',
    description: "Returns a **min-width and max-width** media query string for the specified breakpoints.",
    value: getMediaQueryMinMax,
  },
} as const;
