import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescale4Xl } from '../font';

/** Applies the **4x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. */
export const proseHeading4XlStyle = {
  font: `${fontWeightNormal} ${typescale4Xl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
