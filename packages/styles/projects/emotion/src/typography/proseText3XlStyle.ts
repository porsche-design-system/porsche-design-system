import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescale3Xl } from '../font';

/** Applies the **3x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. */
export const proseText3XlStyle = {
  font: `${fontWeightNormal} ${typescale3Xl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
