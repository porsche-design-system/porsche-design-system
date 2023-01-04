import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textStaticMedium = {
  font: `${textFontPartA}${fontSize.static.textMedium}${textFontPartB}`,
  ...fontHyphenation,
};
