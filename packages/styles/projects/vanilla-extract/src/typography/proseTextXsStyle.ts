import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, getCJKFontFamilyStyle, leadingNormal, typescaleXs } from '../font';

export const proseTextXsStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightNormal} ${typescaleXs} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
