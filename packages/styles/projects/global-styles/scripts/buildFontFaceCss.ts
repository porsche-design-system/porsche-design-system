import * as fs from 'node:fs';
import { getMinifiedPorscheNextFontFaceCss } from '@porsche-design-system/font-face/scripts/fontFaceStyles';

export const buildFontFaceCss = () => {
  const stylesCom = getMinifiedPorscheNextFontFaceCss({ cdn: 'com' });
  const stylesCn = getMinifiedPorscheNextFontFaceCss({ cdn: 'cn' });

  const targetPath = './dist';
  const targetPathCn = './dist/cn';
  const targetFile = 'font-face.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.mkdirSync(targetPathCn, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, stylesCom);
  fs.writeFileSync(`./${targetPathCn}/${targetFile}`, stylesCn);
};

buildFontFaceCss();
