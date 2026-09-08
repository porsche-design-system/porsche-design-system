import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, getCJKFontFamilyStyle, leadingNormal, typescale5Xl } from '../font';

export const proseHeading5XlStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightNormal} ${typescale5Xl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
