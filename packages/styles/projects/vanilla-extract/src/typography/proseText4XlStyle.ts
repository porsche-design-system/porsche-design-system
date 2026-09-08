import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, getCJKFontFamilyStyle, leadingNormal, typescale4Xl } from '../font';

export const proseText4XlStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightNormal} ${typescale4Xl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
