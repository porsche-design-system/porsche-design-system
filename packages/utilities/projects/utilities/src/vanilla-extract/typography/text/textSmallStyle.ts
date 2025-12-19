import { _textFontPartA, _textFontPartB } from './textShared';
import { fontHyphenationStyle, fontSizeTextSmall } from '../../font';

export const textSmallStyle = {
  font: `${_textFontPartA}${fontSizeTextSmall}${_textFontPartB}`,
  ...fontHyphenationStyle,
} as const;
