import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleLg } from '../font';

/** Applies the **large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. */
export const proseHeadingLgStyle = {
  font: `${fontWeightNormal} ${typescaleLg} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
