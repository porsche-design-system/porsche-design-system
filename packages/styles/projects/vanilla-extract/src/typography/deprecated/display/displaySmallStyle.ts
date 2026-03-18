import { typescale3Xl } from '../../../font';
import { _displayFontPartA, _displayFontPartB } from './displayShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeading3XlStyle instead. */
export const displaySmallStyle = {
  font: `${_displayFontPartA}${typescale3Xl}${_displayFontPartB}`,
} as const;
