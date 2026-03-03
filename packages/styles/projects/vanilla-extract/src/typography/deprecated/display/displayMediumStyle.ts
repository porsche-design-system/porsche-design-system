import { fontSizeDisplayMedium } from '../../../font';
import { _displayFontPartA, _displayFontPartB } from './displayShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseDisplayMd instead. */
export const displayMediumStyle = {
  font: `${_displayFontPartA}${fontSizeDisplayMedium}${_displayFontPartB}`,
} as const;
