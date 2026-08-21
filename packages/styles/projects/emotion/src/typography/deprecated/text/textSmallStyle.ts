import { fontSizeTextSmall } from '../../../font';
import { _textFontPartA, _textFontPartB } from './textShared';

/** @deprecated Use {@link proseTextSm} instead. This API will be removed with the next major release. */
export const textSmallStyle = {
  font: `${_textFontPartA}${fontSizeTextSmall}${_textFontPartB}`,
} as const;
