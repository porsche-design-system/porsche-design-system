import { fontSizeTextMedium } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated Use {@link proseTextMdStyle} instead. This API will be removed with the next major release. */
export const textMediumStyle = {
  font: `${_textFontPartA}${fontSizeTextMedium}${_textFontPartB}`,
} as const;
