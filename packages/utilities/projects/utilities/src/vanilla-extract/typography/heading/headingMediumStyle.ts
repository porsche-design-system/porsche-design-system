import { _headingFontPartA, _headingFontPartB } from './headingShared';
import { fontSizeHeadingMedium } from '../../font';

export const headingMediumStyle = {
  font: `${_headingFontPartA}${fontSizeHeadingMedium}${_headingFontPartB}`,
} as const;
