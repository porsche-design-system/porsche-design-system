import { _textFontPartA, _textFontPartB } from './textShared';
import { fontHyphenationStyle, fontSizeTextMedium } from '../../font';

export const textMediumStyle = {
  font: `${_textFontPartA}${fontSizeTextMedium}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
