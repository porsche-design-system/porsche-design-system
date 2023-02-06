import type { TextWeight } from '../types';
import { fontWeightRegular, fontWeightSemiBold, fontWeightBold } from '@porsche-design-system/utilities-v2';

// 'thin' is deprecated and will be mapped to 'regular'
// 'semibold' is deprecated and will be mapped to 'semi-bold'
const fontWeightMap: { [k in TextWeight]: number } = {
  thin: fontWeightRegular,
  regular: fontWeightRegular,
  semibold: fontWeightSemiBold,
  'semi-bold': fontWeightSemiBold,
  bold: fontWeightBold,
};

export const getFontWeight = (weight: TextWeight): number => {
  return fontWeightMap[weight];
};
