import { _displayFontPartA, _displayFontPartB } from './displayShared';
import { fontSizeDisplayLarge } from '../../font';

export const displayLargeStyle = {
  font: `${_displayFontPartA}${fontSizeDisplayLarge}${_displayFontPartB}`,
} as const;
