import { _headingFontPartA, _headingFontPartB } from './headingShared';
import { fontSizeHeadingSmall } from '../../font';

export const headingSmallStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingSmall}${_headingFontPartB}`,
} as const;
