import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textFluidXSmall = {
  font: `${textFontPartA}${fontSize.fluid.textXSmall}${textFontPartB}`,
  ...fontHyphenation,
};
