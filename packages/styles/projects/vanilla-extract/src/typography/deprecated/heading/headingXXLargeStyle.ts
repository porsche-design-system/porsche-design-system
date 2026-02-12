import { fontSizeHeadingXXLarge } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeading2Xl instead. */
export const headingXXLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingXXLarge}${_headingFontPartB}`,
} as const;
