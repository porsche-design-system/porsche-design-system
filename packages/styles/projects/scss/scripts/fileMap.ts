import { getBlurScss } from '../src/blur';
import { getBorderScss } from '../src/border';
import { getBreakpointScss } from '../src/breakpoint';
import { getColorScss } from '../src/color';
import { getDisplayScss } from '../src/display';
import { getFontScss } from '../src/font';
import { getGradientScss } from '../src/gradient';
import { getHeadingScss } from '../src/heading';
import { getMotionScss } from '../src/motion';
import { getShadowScss } from '../src/shadow';
import { getSpacingScss } from '../src/spacing';
import { getTextScss } from '../src/text';

export const fileMap = {
  '_border.scss': getBorderScss,
  '_breakpoint.scss': getBreakpointScss,
  '_color.scss': getColorScss,
  '_font.scss': getFontScss,
  '_text.scss': getTextScss,
  '_heading.scss': getHeadingScss,
  '_display.scss': getDisplayScss,
  '_spacing.scss': getSpacingScss,
  '_motion.scss': getMotionScss,
  '_gradient.scss': getGradientScss,
  '_blur.scss': getBlurScss,
  '_shadow.scss': getShadowScss,
};
