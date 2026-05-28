import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, getCJKFontFamilyStyle, leadingNormal, typescale2Xs } from '../font';

export const proseText2XsStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightNormal} ${typescale2Xs} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
