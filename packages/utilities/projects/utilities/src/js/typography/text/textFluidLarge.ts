import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textFluidLarge = {
  font: `${textFontPartA}${fontSize.fluid.textLarge}${textFontPartB}`,
  ...fontHyphenation,
};
