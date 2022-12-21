import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textMediumFluid = {
  font: `${textFontPartA}${fontSize.fluid.textMedium}${textFontPartB}`,
  ...fontHyphenation,
};
