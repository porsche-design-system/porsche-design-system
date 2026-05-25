import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleMd } from '../font';

/** Applies the **medium** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. */
export const proseHeadingMdStyle = {
  font: `${fontWeightNormal} ${typescaleMd} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
