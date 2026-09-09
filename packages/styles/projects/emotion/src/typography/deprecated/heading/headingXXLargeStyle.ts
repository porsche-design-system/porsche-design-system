import { fontSizeHeadingXXLarge } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated Use {@link proseHeading2XlStyle} instead. This API will be removed with the next major release. */
export const headingXXLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingXXLarge}${_headingFontPartB}`,
} as const;
