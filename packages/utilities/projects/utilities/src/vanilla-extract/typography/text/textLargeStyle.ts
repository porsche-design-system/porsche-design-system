import { _textFontPartA, _textFontPartB } from './textShared';
import { fontHyphenationStyle, fontSizeTextLarge } from '../../font';

export const textLargeStyle = {
  font: `${_textFontPartA}${fontSizeTextLarge}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
