import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescaleXs } from '../font';

/** Applies the **x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. */
export const proseTextXsStyle = {
  font: `${fontWeightNormal} ${typescaleXs} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
