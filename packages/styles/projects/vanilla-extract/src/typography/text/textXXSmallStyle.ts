import { _textFontPartA, _textFontPartB } from './textShared';
import { fontHyphenationStyle, fontSizeTextXXSmall } from '../../font';

export const textXXSmallStyle = {
  font: `${_textFontPartA}${fontSizeTextXXSmall}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
