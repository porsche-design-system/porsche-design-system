import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleMd } from '../font';

/** Applies the **medium** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. */
export const proseTextMdStyle = {
  font: `${fontWeightNormal} ${typescaleMd} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
