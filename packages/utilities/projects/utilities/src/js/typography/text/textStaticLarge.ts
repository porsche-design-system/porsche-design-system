import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textStaticLarge = {
  font: `${textFontPartA}${fontSize.static.textLarge}${textFontPartB}`,
  ...fontHyphenation,
};
