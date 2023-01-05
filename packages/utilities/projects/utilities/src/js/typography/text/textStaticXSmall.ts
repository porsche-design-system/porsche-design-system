import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textStaticXSmall = {
  font: `${textFontPartA}${fontSize.static.textXSmall}${textFontPartB}`,
  ...fontHyphenation,
};
