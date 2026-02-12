import { fontSizeHeadingSmall } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeadingSm instead. */
export const headingSmallStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingSmall}${_headingFontPartB}`,
} as const;
