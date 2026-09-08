import * as fs from 'node:fs';
import * as path from 'node:path';
import { getMinifiedPorscheNextFontFaceCss } from '@porsche-design-system/font-face/scripts/fontFaceStyles';

export const buildFontFaceCss = () => {
  const isDev = process.env.NODE_ENV === 'development';

  const stylesCom = getMinifiedPorscheNextFontFaceCss(isDev ? { cdn: 'localhost' } : '.');
  const stylesCn = getMinifiedPorscheNextFontFaceCss(isDev ? { cdn: 'localhost' } : '..');

  const targetPath = './lib';
  const targetPathCn = './lib/cn';
  const targetFile = 'font-face.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.mkdirSync(targetPathCn, { recursive: true });
  fs.cpSync(path.resolve(__dirname, '../../../../assets/projects/fonts/dist/fonts'), `${targetPath}/fonts`, {
    recursive: true,
  });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, stylesCom);
  fs.writeFileSync(`./${targetPathCn}/${targetFile}`, stylesCn);

  console.log(`Built Font Face CSS in ${isDev ? 'development' : 'production'} mode`);
};

buildFontFaceCss();
