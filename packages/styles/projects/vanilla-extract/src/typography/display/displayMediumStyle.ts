import { _displayFontPartA, _displayFontPartB } from './displayShared';
import { fontSizeDisplayMedium } from '../../font';

export const displayMediumStyle = {
  font: `${_displayFontPartA}${fontSizeDisplayMedium}${_displayFontPartB}`,
} as const;
