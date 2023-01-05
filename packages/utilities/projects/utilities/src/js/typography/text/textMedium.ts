import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSizeTextMedium } from '../../font';

export const textMedium = {
  font: `${textFontPartA}${fontSizeTextMedium}${textFontPartB}`,
  ...fontHyphenation,
};
