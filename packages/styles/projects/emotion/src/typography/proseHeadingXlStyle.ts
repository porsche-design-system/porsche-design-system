import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, getCJKFontFamilyStyle, leadingNormal, typescaleXl } from '../font';

export const proseHeadingXlStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightNormal} ${typescaleXl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
