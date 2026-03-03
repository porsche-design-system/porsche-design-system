import { fontPorscheNext, fontWeightNormal, leadingNormal, typescale2Xs } from '@porsche-design-system/tokens';
import { fontHyphenationStyle } from '../font';

export const proseText2XsStyle = {
  font: `normal normal ${fontWeightNormal} ${typescale2Xs} / ${leadingNormal} ${fontPorscheNext}`,
  ...fontHyphenationStyle,
};
