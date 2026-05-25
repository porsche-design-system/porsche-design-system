import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleSm } from '../font';

/** Applies the **small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. */
export const proseTextSmStyle = {
  font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
