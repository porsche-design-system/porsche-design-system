import { fontSizeDisplaySmall } from '../../../font';
import { _displayFontPartA, _displayFontPartB } from './displayShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use proseDisplaySm instead. */
export const displaySmallStyle = {
  font: `${_displayFontPartA}${fontSizeDisplaySmall}${_displayFontPartB}`,
} as const;
