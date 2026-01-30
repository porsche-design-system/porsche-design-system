import { fontHyphenationStyle, fontSizeTextXXSmall } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseText2Xs instead. */
export const textXXSmallStyle = {
  font: `${_textFontPartA}${fontSizeTextXXSmall}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
