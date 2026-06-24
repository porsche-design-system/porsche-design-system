import { getMediaQueryMax, getMediaQueryMin, getMediaQueryMinMax } from '../../src/mediaQuery/';
import type { VanillaExtractMeta } from '../types';

export const mediaQuery = {
  getMediaQueryMax: {
    name: 'getMediaQueryMax',
    description: 'Applies a **max** media query with the specified breakpoint.',
    styles: getMediaQueryMax,
  },
  getMediaQueryMin: {
    name: 'getMediaQueryMin',
    description: 'Applies a **min** media query with the specified breakpoint.',
    styles: getMediaQueryMin,
  },
  getMediaQueryMinMax: {
    name: 'getMediaQueryMinMax',
    description: 'Applies a **min-max** media query with the specified breakpoints.',
    styles: getMediaQueryMinMax,
  },
} satisfies VanillaExtractMeta['mediaQuery'];
