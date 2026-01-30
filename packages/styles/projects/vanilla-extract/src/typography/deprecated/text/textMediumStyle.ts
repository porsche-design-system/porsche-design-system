import { fontHyphenationStyle, fontSizeTextMedium } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseTextMd instead. */
export const textMediumStyle = {
  font: `${_textFontPartA}${fontSizeTextMedium}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
