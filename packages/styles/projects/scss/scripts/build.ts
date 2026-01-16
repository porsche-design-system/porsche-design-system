import fs from 'node:fs';
import * as prettier from 'prettier';
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

const fileMap = {
  '_border.scss': getBorderScss(),
  '_breakpoint.scss': getBreakpointScss(),
  '_theme.scss': getThemeScss(),
  '_font.scss': getFontScss(),
  '_text.scss': getTextScss(),
  '_heading.scss': getHeadingScss(),
  '_display.scss': getDisplayScss(),
  '_spacing.scss': getSpacingScss(),
  '_motion.scss': getMotionScss(),
  '_gradient.scss': getGradientScss(),
  '_frosted-glass.scss': getFrostedGlassScss(),
  '_drop-shadow.scss': getDropShadowScss(),
};

export const buildScssStyles = async () => {
  const targetPath = './dist';

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });

  for (const [fileName, content] of Object.entries(fileMap)) {
    const formatted = await prettier.format(content, { parser: 'scss' });
    fs.writeFileSync(`${targetPath}/${fileName}`, formatted);
    console.log(`Built ${fileName}`);
  }

  console.log('Built all SCSS styles');
};

buildScssStyles();
