import { displayFontPartA, displayFontPartB } from './displayShared';
import { fontSize } from '../../font';

// TODO: do we really need a static variant for display?
export const displayStaticLarge = {
  font: `${displayFontPartA}${fontSize.static.displayLarge}${displayFontPartB}`,
};
