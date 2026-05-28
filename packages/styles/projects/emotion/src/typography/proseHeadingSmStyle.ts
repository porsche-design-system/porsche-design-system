import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightSemibold, getCJKFontFamilyStyle, leadingNormal, typescaleSm } from '../font';

/** Applies the **small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. */
export const proseHeadingSmStyle = {
  ...getCJKFontFamilyStyle(),
  font: `${fontWeightSemibold} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
