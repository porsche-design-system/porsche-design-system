import { getSkeletonStyle } from '../../src/skeleton/';
import type { EmotionMeta } from '../types';

export const skeleton = {
  getSkeletonStyle: {
    name: 'getSkeletonStyle',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    styles: getSkeletonStyle,
  },
} satisfies EmotionMeta['skeleton'];
