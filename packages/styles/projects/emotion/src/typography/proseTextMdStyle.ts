import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, getCJKFontFamilyStyle, leadingNormal, typescaleMd } from '../font';

export const proseTextMdStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightNormal} ${typescaleMd} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
