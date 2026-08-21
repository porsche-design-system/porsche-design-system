import { fontSizeHeadingLarge } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated Use {@link proseHeadingLg} instead. This API will be removed with the next major release. */
export const headingLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingLarge}${_headingFontPartB}`,
} as const;
