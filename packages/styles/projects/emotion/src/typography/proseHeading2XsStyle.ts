import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightSemibold, leadingNormal, typescale2Xs } from '../font';

/** Applies the **2x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. */
export const proseHeading2XsStyle = {
  font: `${fontWeightSemibold} ${typescale2Xs} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
