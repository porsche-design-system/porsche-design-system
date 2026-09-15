import { typescale3Xl } from '../../../font';
import { _displayFontPartA, _displayFontPartB } from './displayShared';

/** @deprecated Use {@link proseHeading3XlStyle} instead. This API will be removed with the next major release. */
export const displaySmallStyle = {
  font: `${_displayFontPartA}${typescale3Xl}${_displayFontPartB}`,
} as const;
