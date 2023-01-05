import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSizeTextXSmall } from '../../font';

export const textXSmall = {
  font: `${textFontPartA}${fontSizeTextXSmall}${textFontPartB}`,
  ...fontHyphenation,
};
