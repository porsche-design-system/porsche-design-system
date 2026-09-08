import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, getCJKFontFamilyStyle, leadingNormal, typescale2Xl } from '../font';

export const proseHeading2XlStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightNormal} ${typescale2Xl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
