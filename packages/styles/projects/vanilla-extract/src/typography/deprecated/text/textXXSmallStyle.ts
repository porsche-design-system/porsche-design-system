import { fontSizeTextXXSmall } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated Use {@link proseText2XsStyle} instead. This API will be removed with the next major release. */
export const textXXSmallStyle = {
  font: `${_textFontPartA}${fontSizeTextXXSmall}${_textFontPartB}`,
} as const;
