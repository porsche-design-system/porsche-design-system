import { getSkeletonStyle, skeletonKeyframes } from './getSkeletonStyle';
import type { Meta } from '../meta.types';

export const skeletonMeta: Meta = {
  skeletonKeyframes: {
    name: 'skeletonKeyframes',
    value: skeletonKeyframes,
    description: "Holds the **keyframes** to be used with the `keyframes` vanilla-extract function.",
  },
  getSkeletonStyle: {
    name: 'getSkeletonStyle',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    value: getSkeletonStyle,
  },
} as const;
