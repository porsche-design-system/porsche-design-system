import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSizeTextXLarge } from '../../font';

export const textXLarge = {
  font: `${textFontPartA}${fontSizeTextXLarge}${textFontPartB}`,
  ...fontHyphenation,
};
