import {
  breakpoint as breakpointObject,
  breakpointBase,
  breakpointL,
  breakpointM,
  breakpointS,
  breakpoints,
  breakpointXL,
  breakpointXS,
  breakpointXXL,
} from '../../src/mediaQuery/';
import type { VanillaExtractMeta } from '../types';

export const breakpoint = {
  xs: { name: 'breakpointXS', description: 'Holds the `xs` breakpoint value.', value: breakpointXS },
  sm: { name: 'breakpointS', description: 'Holds the `sm` breakpoint value.', value: breakpointS },
  md: { name: 'breakpointM', description: 'Holds the `md` breakpoint value.', value: breakpointM },
  lg: { name: 'breakpointL', description: 'Holds the `lg` breakpoint value.', value: breakpointL },
  xl: { name: 'breakpointXL', description: 'Holds the `xl` breakpoint value.', value: breakpointXL },
  '2xl': { name: 'breakpointXXL', description: 'Holds the `2xl` breakpoint value.', value: breakpointXXL },
  // vanilla-extract-specific aggregates with no scss counterpart, kept keyed by export name.
  breakpoint: {
    name: 'breakpoint',
    description: 'Object containing all breakpoint values.',
    styles: breakpointObject,
  },
  breakpoints: {
    name: 'breakpoints',
    description: 'Array containing all breakpoint keys.',
    styles: breakpoints,
  },
  breakpointBase: { name: 'breakpointBase', description: 'Holds the `base` breakpoint value.', value: breakpointBase },
} satisfies VanillaExtractMeta['breakpoint'];
