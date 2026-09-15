import { fontSizeTextLarge } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated Use {@link proseTextLgStyle} instead. This API will be removed with the next major release. */
export const textLargeStyle = {
  font: `${_textFontPartA}${fontSizeTextLarge}${_textFontPartB}`,
} as const;
