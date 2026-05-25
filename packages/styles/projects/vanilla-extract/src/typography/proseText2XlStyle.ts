import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescale2Xl } from '../font';

/** Applies the **2x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. */
export const proseText2XlStyle = {
  font: `${fontWeightNormal} ${typescale2Xl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
