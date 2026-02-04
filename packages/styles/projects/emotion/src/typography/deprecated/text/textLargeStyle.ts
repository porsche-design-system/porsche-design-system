import { fontHyphenationStyle, fontSizeTextLarge } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseTextLg instead. */
export const textLargeStyle = {
  font: `${_textFontPartA}${fontSizeTextLarge}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
