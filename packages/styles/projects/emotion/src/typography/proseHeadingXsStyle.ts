import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightSemibold, getCJKFontFamilyStyle, leadingNormal, typescaleXs } from '../font';

/** Applies the **x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. */
export const proseHeadingXsStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightSemibold} ${typescaleXs} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
