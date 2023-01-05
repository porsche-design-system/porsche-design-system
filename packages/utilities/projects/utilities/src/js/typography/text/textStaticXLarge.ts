import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textStaticXLarge = {
  font: `${textFontPartA}${fontSize.static.textXLarge}${textFontPartB}`,
  ...fontHyphenation,
};
