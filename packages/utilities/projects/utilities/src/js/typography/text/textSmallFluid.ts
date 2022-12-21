import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textSmallFluid = {
  font: `${textFontPartA}${fontSize.fluid.textSmall}${textFontPartB}`,
  ...fontHyphenation,
};
