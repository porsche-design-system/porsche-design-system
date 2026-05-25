import { colorPrimary } from '../color';
import { fontPorscheNext, fontWeightNormal, leadingNormal, typescale2Xs } from '../font';

/** Applies the **2x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. */
export const proseText2XsStyle = {
  font: `${fontWeightNormal} ${typescale2Xs} / ${leadingNormal} ${fontPorscheNext}`,
  color: colorPrimary,
};
