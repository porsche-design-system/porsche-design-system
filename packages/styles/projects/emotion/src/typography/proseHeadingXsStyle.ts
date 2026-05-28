import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightSemibold, getCJKFontFamilyStyle, leadingNormal, typescaleXs } from '../font';

export const proseHeadingXsStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightSemibold} ${typescaleXs} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
