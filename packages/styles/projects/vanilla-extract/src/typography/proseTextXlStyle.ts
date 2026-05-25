import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleXl } from '../font';

/** Applies the **x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. */
export const proseTextXlStyle = {
  font: `${fontWeightNormal} ${typescaleXl} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
