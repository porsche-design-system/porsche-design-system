import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightSemibold, getCJKFontFamilyStyle, leadingNormal, typescale2Xs } from '../font';

export const proseHeading2XsStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightSemibold} ${typescale2Xs} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
