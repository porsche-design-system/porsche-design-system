import { fontSizeHeadingLarge } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeadingLg instead. */
export const headingLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingLarge}${_headingFontPartB}`,
} as const;
