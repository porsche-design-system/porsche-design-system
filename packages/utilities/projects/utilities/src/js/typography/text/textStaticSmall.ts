import { textFontPartA, textFontPartB } from './textShared';
import { fontHyphenation, fontSize } from '../../font';

export const textStaticSmall = {
  font: `${textFontPartA}${fontSize.static.textSmall}${textFontPartB}`,
  ...fontHyphenation,
};
