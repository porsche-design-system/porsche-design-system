import { fontSizeDisplayLarge } from '../../../font';
import { _displayFontPartA, _displayFontPartB } from './displayShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseDisplayLg instead. */
export const displayLargeStyle = {
  font: `${_displayFontPartA}${fontSizeDisplayLarge}${_displayFontPartB}`,
} as const;
