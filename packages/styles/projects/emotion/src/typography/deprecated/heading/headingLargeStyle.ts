import { fontSizeHeadingLarge } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated Use {@link proseHeadingLgStyle} instead. This API will be removed with the next major release. */
export const headingLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingLarge}${_headingFontPartB}`,
} as const;
