import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightSemibold, getCJKFontFamilyStyle, leadingNormal, typescaleSm } from '../font';

export const proseHeadingSmStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightSemibold} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
