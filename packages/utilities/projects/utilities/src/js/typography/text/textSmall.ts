import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSizeTextSmall } from '../../font';

export const textSmall = {
  font: `${textFontPartA}${fontSizeTextSmall}${textFontPartB}`,
  ...fontHyphenation,
};
