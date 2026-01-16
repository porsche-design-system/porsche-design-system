import { _textFontPartA, _textFontPartB } from './textShared';
import { fontHyphenationStyle, fontSizeTextXSmall } from '../../font';

export const textXSmallStyle = {
  font: `${_textFontPartA}${fontSizeTextXSmall}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
