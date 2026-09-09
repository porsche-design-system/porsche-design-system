import { fontSizeHeadingXLarge } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated Use {@link proseHeadingXlStyle} instead. This API will be removed with the next major release. */
export const headingXLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingXLarge}${_headingFontPartB}`,
} as const;
