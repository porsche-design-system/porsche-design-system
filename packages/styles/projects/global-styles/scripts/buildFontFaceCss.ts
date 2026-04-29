import * as fs from 'node:fs';
import { getMinifiedPorscheNextFontFaceCss } from '@porsche-design-system/font-face/scripts/fontFaceStyles';

export const buildFontFaceCss = () => {
  const isDev = process.env.NODE_ENV === 'development';

  const stylesCom = getMinifiedPorscheNextFontFaceCss({ cdn: isDev ? 'localhost' : 'com' });
  const stylesCn = getMinifiedPorscheNextFontFaceCss({ cdn: isDev ? 'localhost' : 'cn' });

  const targetPath = './dist';
  const targetPathCn = './dist/cn';
  const targetFile = 'font-face.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.mkdirSync(targetPathCn, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, stylesCom);
  fs.writeFileSync(`./${targetPathCn}/${targetFile}`, stylesCn);

  console.log(`Built Font Face CSS in ${isDev ? 'development' : 'production'} mode`);
};

buildFontFaceCss();
