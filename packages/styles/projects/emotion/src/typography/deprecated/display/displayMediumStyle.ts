import { typescale4Xl } from '../../../font';
import { _displayFontPartA, _displayFontPartB } from './displayShared';

/** @deprecated Use {@link proseHeading4XlStyle} instead. This API will be removed with the next major release. */
export const displayMediumStyle = {
  font: `${_displayFontPartA}${typescale4Xl}${_displayFontPartB}`,
} as const;
