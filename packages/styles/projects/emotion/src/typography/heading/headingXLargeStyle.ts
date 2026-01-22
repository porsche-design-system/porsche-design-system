import { _headingFontPartA, _headingFontPartB } from './headingShared';
import { fontSizeHeadingXLarge } from '../../font';

export const headingXLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingXLarge}${_headingFontPartB}`,
} as const;
