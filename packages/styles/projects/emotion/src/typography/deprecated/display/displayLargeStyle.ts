import { typescale5Xl } from '../../../font';
import { _displayFontPartA, _displayFontPartB } from './displayShared';

/** @deprecated Use {@link proseHeading5XlStyle} instead. This API will be removed with the next major release. */
export const displayLargeStyle = {
  font: `${_displayFontPartA}${typescale5Xl}${_displayFontPartB}`,
} as const;
