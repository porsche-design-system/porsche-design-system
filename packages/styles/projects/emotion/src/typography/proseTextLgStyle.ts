import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleLg } from '@porsche-design-system/tokens';
import { fontHyphenationStyle } from '../font';

export const proseTextLgStyle = {
  font: `normal normal ${fontWeightNormal} ${typescaleLg} / ${leadingNormal} ${fontPorscheNext}`,
  ...fontHyphenationStyle,
};
