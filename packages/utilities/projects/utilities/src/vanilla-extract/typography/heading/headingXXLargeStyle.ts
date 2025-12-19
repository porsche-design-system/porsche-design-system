import { _headingFontPartA, _headingFontPartB } from './headingShared';
import { fontSizeHeadingXXLarge } from '../../font';

export const headingXXLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingXXLarge}${_headingFontPartB}`,
} as const;
