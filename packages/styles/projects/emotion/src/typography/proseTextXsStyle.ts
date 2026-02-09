import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleXs } from '@porsche-design-system/tokens';
import { fontHyphenationStyle } from '../font';

export const proseTextXsStyle = {
  font: `normal normal ${fontWeightNormal} ${typescaleXs} / ${leadingNormal} ${fontPorscheNext}`,
  ...fontHyphenationStyle,
};
