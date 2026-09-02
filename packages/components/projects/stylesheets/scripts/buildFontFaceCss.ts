import * as fs from 'node:fs';
import * as path from 'node:path';
import { getMinifiedPorscheNextFontFaceCss } from '@porsche-design-system/font-face/scripts/fontFaceStyles';

export const buildFontFaceCss = () => {
  const isDev = process.env.NODE_ENV === 'development';

  const stylesCom = getMinifiedPorscheNextFontFaceCss({ cdn: isDev ? 'localhost' : 'com' });
  const stylesCn = getMinifiedPorscheNextFontFaceCss({ cdn: isDev ? 'localhost' : 'cn' });

  // Resolved from this file so the output cannot follow the caller's working directory.
  const targetPath = path.resolve(__dirname, '..', 'lib');
  const targetPathCn = path.join(targetPath, 'cn');
  const targetFile = 'font-face.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.mkdirSync(targetPathCn, { recursive: true });
  fs.writeFileSync(path.join(targetPath, targetFile), stylesCom);
  fs.writeFileSync(path.join(targetPathCn, targetFile), stylesCn);

  console.log(`Built Font Face CSS in ${isDev ? 'development' : 'production'} mode`);
};

buildFontFaceCss();
