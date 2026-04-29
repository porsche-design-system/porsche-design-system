import { typescale5Xl } from '../../../font';
import { _displayFontPartA, _displayFontPartB } from './displayShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeading5XlStyle instead. */
export const displayLargeStyle = {
  font: `${_displayFontPartA}${typescale5Xl}${_displayFontPartB}`,
} as const;
