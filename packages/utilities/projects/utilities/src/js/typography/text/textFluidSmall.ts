import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textFluidSmall = {
  font: `${textFontPartA}${fontSize.fluid.textSmall}${textFontPartB}`,
  ...fontHyphenation,
};
