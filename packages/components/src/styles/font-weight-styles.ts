import type { TextWeight } from '../types';
import { fontWeightRegular, fontWeightSemiBold, fontWeightBold } from '@porsche-design-system/utilities-v2';

const fontWeightMap: { [k in TextWeight]: number } = {
  thin: fontWeightRegular, // deprecated
  regular: fontWeightRegular,
  semibold: fontWeightSemiBold, // deprecated
  'semi-bold': fontWeightSemiBold,
  bold: fontWeightBold,
};

export const getFontWeight = (weight: TextWeight): number => {
  return fontWeightMap[weight];
};
