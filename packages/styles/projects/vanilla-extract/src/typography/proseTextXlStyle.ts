import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleXl } from '@porsche-design-system/tokens';
import { fontHyphenationStyle } from '../font';

export const proseTextXlStyle = {
  font: `normal normal ${fontWeightNormal} ${typescaleXl} / ${leadingNormal} ${fontPorscheNext}`,
  ...fontHyphenationStyle,
};
