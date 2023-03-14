import type { TextWeight } from '../types';
import { fontWeightRegular, fontWeightSemiBold, fontWeightBold } from '@porsche-design-system/utilities-v2';
import type { TextWeightDeprecated } from '../components/text/text-weight';

const fontWeightMap: Record<Exclude<TextWeight, TextWeightDeprecated>, number> = {
  regular: fontWeightRegular,
  'semi-bold': fontWeightSemiBold,
  bold: fontWeightBold,
};

export const getFontWeight = (weight: Exclude<TextWeight, TextWeightDeprecated>): number => {
  return fontWeightMap[weight];
};
