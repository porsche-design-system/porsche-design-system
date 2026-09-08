import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, getCJKFontFamilyStyle, leadingNormal, typescaleSm } from '../font';

export const proseTextSmStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
