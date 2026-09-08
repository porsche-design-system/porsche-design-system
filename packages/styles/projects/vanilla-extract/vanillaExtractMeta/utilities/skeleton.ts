import { getSkeletonStyle, skeletonKeyframes } from '../../src/skeleton/';
import type { VanillaExtractMeta } from '../types';

export const skeleton = {
  getSkeletonStyle: {
    name: 'getSkeletonStyle',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    styles: getSkeletonStyle,
  },
  // vanilla-extract-specific export with no emotion/scss counterpart: the `keyframes` object passed
  // to vanilla-extract's `keyframes()`. Kept keyed by export name.
  skeletonKeyframes: {
    name: 'skeletonKeyframes',
    description: 'Holds the **keyframes** to be used with the `keyframes` vanilla-extract function.',
    styles: skeletonKeyframes,
  },
} satisfies VanillaExtractMeta['skeleton'];
