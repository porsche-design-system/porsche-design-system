import { _displayFontPartA, _displayFontPartB } from './displayShared';
import { fontSizeDisplaySmall } from '../../font';

export const displaySmallStyle = {
  font: `${_displayFontPartA}${fontSizeDisplaySmall}${_displayFontPartB}`,
} as const;
