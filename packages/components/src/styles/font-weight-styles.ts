import type { TextWeight } from '../types';
import { fontWeight } from '@porsche-design-system/utilities-v2';

export const getFontWeight = (weight: TextWeight): number => {
  return fontWeight[weight === 'semibold' ? 'semiBold' : weight];
};
