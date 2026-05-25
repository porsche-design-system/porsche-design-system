import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescale3Xl } from '../font';

/** Applies the **3x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. */
export const proseHeading3XlStyle = {
  font: `${fontWeightNormal} ${typescale3Xl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
