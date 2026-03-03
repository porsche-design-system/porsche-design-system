import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleSm } from '@porsche-design-system/tokens';
import { fontHyphenationStyle } from '../font';

export const proseTextSmStyle = {
  font: `normal normal ${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
  ...fontHyphenationStyle,
};
