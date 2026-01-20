import { _headingFontPartA, _headingFontPartB } from './headingShared';
import { fontSizeHeadingLarge } from '../../font';

export const headingLargeStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingLarge}${_headingFontPartB}`,
} as const;
