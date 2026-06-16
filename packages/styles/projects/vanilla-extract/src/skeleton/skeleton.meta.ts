import type { Meta } from '../meta.types';
import { getSkeletonStyle, skeletonKeyframes } from './helpers';

export const skeletonMeta: Meta = {
  skeletonKeyframes: {
    name: 'skeletonKeyframes',
    value: skeletonKeyframes,
    description: 'Holds the **keyframes** to be used with the `keyframes` vanilla-extract function.',
  },
  getSkeletonStyle: {
    name: 'getSkeletonStyle',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    value: getSkeletonStyle,
  },
} as const;
