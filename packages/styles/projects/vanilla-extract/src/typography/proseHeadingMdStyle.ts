import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, getCJKFontFamilyStyle, leadingNormal, typescaleMd } from '../font';

export const proseHeadingMdStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightNormal} ${typescaleMd} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
