import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescale4Xl } from '../font';

/** Applies the **4x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. */
export const proseText4XlStyle = {
  font: `${fontWeightNormal} ${typescale4Xl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
