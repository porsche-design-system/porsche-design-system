import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescale5Xl } from '../font';

/** Applies the **5x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. */
export const proseText5XlStyle = {
  font: `${fontWeightNormal} ${typescale5Xl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
