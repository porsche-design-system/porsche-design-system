import { fontSizeHeadingSmall } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated Use {@link proseHeadingSmStyle} instead. This API will be removed with the next major release. */
export const headingSmallStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingSmall}${_headingFontPartB}`,
} as const;
