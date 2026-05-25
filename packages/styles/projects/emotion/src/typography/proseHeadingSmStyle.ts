import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightSemibold, leadingNormal, typescaleSm } from '../font';

/** Applies the **small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. */
export const proseHeadingSmStyle = {
  font: `${fontWeightSemibold} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
