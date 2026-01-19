import { _textFontPartA, _textFontPartB } from './textShared';
import { fontHyphenationStyle, fontSizeTextXLarge } from '../../font';

export const textXLargeStyle = {
  font: `${_textFontPartA}${fontSizeTextXLarge}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
