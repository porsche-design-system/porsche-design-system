import { fontHyphenationStyle, fontSizeTextXLarge } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseTextXl instead. */
export const textXLargeStyle = {
  font: `${_textFontPartA}${fontSizeTextXLarge}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
