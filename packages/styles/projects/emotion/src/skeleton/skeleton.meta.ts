import type { Meta } from '../meta.types';
import { getSkeletonStyle } from './helpers';

export const skeletonMeta: Meta = {
  getSkeletonStyle: {
    name: 'getSkeletonStyle',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    value: getSkeletonStyle,
  },
} as const;
