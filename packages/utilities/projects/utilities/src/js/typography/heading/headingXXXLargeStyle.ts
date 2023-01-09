import { _headingFontPartA, _headingFontPartB } from './headingShared';
import { fontSizeHeadingXXXLarge } from '../../font';

export const headingXXXLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingXXXLarge}${_headingFontPartB}`,
} as const;
