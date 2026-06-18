import { getFontScss } from '../src/font';
import { getGradientScss } from '../src/gradient';

// Legacy per-domain generators awaiting migration onto the meta-driven composition layer
// (`src/scss`). `_border.scss`, `_blur.scss`, `_breakpoint.scss`, `_shadow.scss`, `_spacing.scss`,
// `_motion.scss` and `_color.scss` have moved there; the rest follow in later slices.
export const fileMap = {
  '_font.scss': getFontScss,
  '_gradient.scss': getGradientScss,
};
