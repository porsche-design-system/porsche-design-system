import {
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
} from '@porsche-design-system/tokens';
import { getMediaQueryMax, getMediaQueryMin, getMediaQueryMinMax } from './helpers';

export const mediaQueryMeta = {
  breakpoint: {
    name: 'breakpoint',
    value: {
      base: 0,
      xs: breakpointXs,
      s: breakpointSm,
      m: breakpointMd,
      l: breakpointLg,
      xl: breakpointXl,
      xxl: breakpoint2Xl,
    } as const,
    description: 'Object containing all breakpoint values.',
  },
  breakpoints: {
    name: 'breakpoints',
    value: ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const,
    description: 'Array containing all breakpoint keys.',
  },
  breakpointBase: { name: 'breakpointBase', value: 0, description: 'Holds the `base` breakpoint value.' },
  breakpointXS: { name: 'breakpointXS', value: breakpointXs, description: 'Holds the `xs` breakpoint value.' },
  breakpointS: { name: 'breakpointS', value: breakpointSm, description: 'Holds the `s` breakpoint value.' },
  breakpointM: { name: 'breakpointM', value: breakpointMd, description: 'Holds the `m` breakpoint value.' },
  breakpointL: { name: 'breakpointL', value: breakpointLg, description: 'Holds the `l` breakpoint value.' },
  breakpointXL: { name: 'breakpointXL', value: breakpointXl, description: 'Holds the `xl` breakpoint value.' },
  breakpointXXL: { name: 'breakpointXXL', value: breakpoint2Xl, description: 'Holds the `2xl` breakpoint value.' },
  getMediaQueryMax: {
    name: 'getMediaQueryMax',
    description: 'Returns a **max-width** media query string for the specified breakpoint.',
    value: getMediaQueryMax,
  },
  getMediaQueryMin: {
    name: 'getMediaQueryMin',
    description: 'Returns a **min-width** media query string for the specified breakpoint.',
    value: getMediaQueryMin,
  },
  getMediaQueryMinMax: {
    name: 'getMediaQueryMinMax',
    description: 'Returns a **min-width and max-width** media query string for the specified breakpoints.',
    value: getMediaQueryMinMax,
  },
} as const;
