import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSizeTextLarge } from '../../font';

export const textLarge = {
  font: `${textFontPartA}${fontSizeTextLarge}${textFontPartB}`,
  ...fontHyphenation,
};
