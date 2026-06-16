import type { Meta } from '..';
import { getSkeletonStyle, skeletonKeyframes } from '.';

export const skeletonMeta: Meta = {
  skeletonKeyframes: {
    name: 'skeletonKeyframes',
    description: 'Holds the **keyframes** to be used with the `keyframes` vanilla-extract function.',
    value: skeletonKeyframes,
  },
  getSkeletonStyle: {
    name: 'getSkeletonStyle',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    value: getSkeletonStyle,
  },
} as const;
