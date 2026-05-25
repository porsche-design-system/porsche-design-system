import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleLg } from '../font';

/** Applies the **large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. */
export const proseTextLgStyle = {
  font: `${fontWeightNormal} ${typescaleLg} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
