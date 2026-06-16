import type { Meta } from '../meta.types';
import {
  breakpoint,
  breakpointBase,
  breakpointL,
  breakpointM,
  breakpointS,
  breakpoints,
  breakpointXL,
  breakpointXS,
  breakpointXXL,
  getMediaQueryMax,
  getMediaQueryMin,
  getMediaQueryMinMax,
} from '.';

export const mediaQueryMeta: Meta = {
  breakpoint: {
    name: 'breakpoint',
    description: 'Object containing all breakpoint values.',
    value: breakpoint,
  },
  breakpoints: {
    name: 'breakpoints',
    description: 'Array containing all breakpoint keys.',
    value: breakpoints,
  },
  breakpointBase: { name: 'breakpointBase', description: 'Holds the `base` breakpoint value.', value: breakpointBase },
  breakpointXS: { name: 'breakpointXS', description: 'Holds the `xs` breakpoint value.', value: breakpointXS },
  breakpointS: { name: 'breakpointS', description: 'Holds the `sm` breakpoint value.', value: breakpointS },
  breakpointM: { name: 'breakpointM', description: 'Holds the `md` breakpoint value.', value: breakpointM },
  breakpointL: { name: 'breakpointL', description: 'Holds the `lg` breakpoint value.', value: breakpointL },
  breakpointXL: { name: 'breakpointXL', description: 'Holds the `xl` breakpoint value.', value: breakpointXL },
  breakpointXXL: { name: 'breakpointXXL', description: 'Holds the `2xl` breakpoint value.', value: breakpointXXL },
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
