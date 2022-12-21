import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textLargeStatic = {
  font: `${textFontPartA}${fontSize.static.textLarge}${textFontPartB}`,
  ...fontHyphenation,
};
