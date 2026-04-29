import { typescale4Xl } from '../../../font';
import { _displayFontPartA, _displayFontPartB } from './displayShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeading4XlStyle instead. */
export const displayMediumStyle = {
  font: `${_displayFontPartA}${typescale4Xl}${_displayFontPartB}`,
} as const;
