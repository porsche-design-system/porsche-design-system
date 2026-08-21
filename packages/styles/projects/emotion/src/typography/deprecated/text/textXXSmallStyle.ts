import { fontSizeTextXXSmall } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated Use {@link proseText2Xs} instead. This API will be removed with the next major release. */
export const textXXSmallStyle = {
  font: `${_textFontPartA}${fontSizeTextXXSmall}${_textFontPartB}`,
} as const;
