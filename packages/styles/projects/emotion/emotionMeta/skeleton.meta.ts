import { getSkeletonStyle } from '../src/skeleton/';
import type { EmotionMeta } from './meta.types';

export const skeletonMeta: EmotionMeta = {
  getSkeletonStyle: {
    name: 'getSkeletonStyle',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    value: getSkeletonStyle,
  },
} as const;
