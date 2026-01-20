import { getBorderScss } from '../src/border';
import { getBreakpointScss } from '../src/breakpoint';
import { getDisplayScss } from '../src/display';
import { getDropShadowScss } from '../src/drop-shadow';
import { getFontScss } from '../src/font';
import { getFrostedGlassScss } from '../src/frosted-glass';
import { getGradientScss } from '../src/gradient';
import { getHeadingScss } from '../src/heading';
import { getMotionScss } from '../src/motion';
import { getSpacingScss } from '../src/spacing';
import { getTextScss } from '../src/text';
import { getThemeScss } from '../src/theme';

export const fileMap = {
  '_border.scss': getBorderScss,
  '_breakpoint.scss': getBreakpointScss,
  '_theme.scss': getThemeScss,
  '_font.scss': getFontScss,
  '_text.scss': getTextScss,
  '_heading.scss': getHeadingScss,
  '_display.scss': getDisplayScss,
  '_spacing.scss': getSpacingScss,
  '_motion.scss': getMotionScss,
  '_gradient.scss': getGradientScss,
  '_frosted-glass.scss': getFrostedGlassScss,
  '_drop-shadow.scss': getDropShadowScss,
};
