import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textMediumStatic = {
  font: `${textFontPartA}${fontSize.static.textMedium}${textFontPartB}`,
  ...fontHyphenation,
};
