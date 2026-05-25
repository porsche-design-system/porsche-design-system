import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightSemibold, leadingNormal, typescaleXs } from '../font';

/** Applies the **x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. */
export const proseHeadingXsStyle = {
  font: `${fontWeightSemibold} ${typescaleXs} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
