import { getSkeletonStyle } from './helpers';
import type { Meta } from '../meta.types';

export const skeletonMeta: Meta = {
  getSkeletonStyle: {
    name: 'getSkeletonStyle',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    value: getSkeletonStyle,
  },
} as const;
