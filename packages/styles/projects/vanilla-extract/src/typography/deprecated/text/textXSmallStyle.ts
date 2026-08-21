import { fontSizeTextXSmall } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated Use {@link proseTextXsStyle} instead. This API will be removed with the next major release. */
export const textXSmallStyle = {
  font: `${_textFontPartA}${fontSizeTextXSmall}${_textFontPartB}`,
} as const;
