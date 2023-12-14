import type { TextWeight, TextWeightDeprecated } from '../types';
import { fontWeightRegular, fontWeightSemiBold, fontWeightBold } from '@porsche-design-system/utilities-v2';

const fontWeightMap: Record<Exclude<TextWeight, TextWeightDeprecated>, number> = {
  regular: fontWeightRegular,
  'semi-bold': fontWeightSemiBold,
  bold: fontWeightBold,
};

export const getFontWeight = (weight: Exclude<TextWeight, TextWeightDeprecated>): number => {
  return fontWeightMap[weight];
};
