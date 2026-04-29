import { fontSizeHeadingXLarge } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeadingXl instead. */
export const headingXLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingXLarge}${_headingFontPartB}`,
} as const;
