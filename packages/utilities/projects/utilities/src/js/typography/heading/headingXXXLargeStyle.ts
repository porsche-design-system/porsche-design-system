import { _headingFontPartA, _headingFontPartB } from './headingShared';
import { fontSizeDisplaySmall } from '../../font';

export const headingXXXLargeStyle = {
  font: `${_headingFontPartA}${fontSizeDisplaySmall}${_headingFontPartB}`,
} as const;
