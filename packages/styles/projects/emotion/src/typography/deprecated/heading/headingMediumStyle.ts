import { fontSizeHeadingMedium } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated Use {@link proseHeadingMd} instead. This API will be removed with the next major release. */
export const headingMediumStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingMedium}${_headingFontPartB}`,
} as const;
