import { fontSizeTextXLarge } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated Use {@link proseTextXlStyle} instead. This API will be removed with the next major release. */
export const textXLargeStyle = {
  font: `${_textFontPartA}${fontSizeTextXLarge}${_textFontPartB}`,
} as const;
