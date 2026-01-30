import { fontHyphenationStyle, fontSizeTextXSmall } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseTextXs instead. */
export const textXSmallStyle = {
  font: `${_textFontPartA}${fontSizeTextXSmall}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
