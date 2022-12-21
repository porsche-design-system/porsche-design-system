import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textSmallStatic = {
  font: `${textFontPartA}${fontSize.static.textSmall}${textFontPartB}`,
  ...fontHyphenation,
};
