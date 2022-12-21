import { fontHyphenation, fontSize } from '../../font';
import { textFontPartA, textFontPartB } from './textShared';

export const textXLargeFluid = {
  font: `${textFontPartA}${fontSize.fluid.textXLarge}${textFontPartB}`,
  ...fontHyphenation,
};
