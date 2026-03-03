import { fontHyphenationStyle, fontSizeTextSmall } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseTextSm instead. */
export const textSmallStyle = {
  font: `${_textFontPartA}${fontSizeTextSmall}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
