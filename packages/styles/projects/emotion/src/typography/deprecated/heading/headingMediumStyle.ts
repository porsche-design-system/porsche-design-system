import { fontSizeHeadingMedium } from '../../../font';
import { _headingFontPartA, _headingFontPartB } from './headingShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeadingMd instead. */
export const headingMediumStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingMedium}${_headingFontPartB}`,
} as const;
