import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleMd } from '@porsche-design-system/tokens';
import { fontHyphenationStyle } from '../font';

export const proseTextMdStyle = {
  font: `normal normal ${fontWeightNormal} ${typescaleMd} / ${leadingNormal} ${fontPorscheNext}`,
  ...fontHyphenationStyle,
};
