import { getMediaQueryMax, getMediaQueryMin, getMediaQueryMinMax } from '../src/mediaQuery/';
import type { VanillaExtractMeta } from './meta.types';

export const mediaQueryMeta: VanillaExtractMeta = {
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
