import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescale2Xl } from '../font';

/** Applies the **2x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. */
export const proseHeading2XlStyle = {
  font: `${fontWeightNormal} ${typescale2Xl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
