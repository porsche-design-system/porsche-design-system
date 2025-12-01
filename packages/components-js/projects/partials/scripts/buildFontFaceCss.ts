// TODO: Export this from assets package correctly
import { getMinifiedPorscheNextFontFaceCss } from '@porsche-design-system/assets/projects/font-face/scripts/fontFaceStyles';
import fs from 'fs';

export const buildFontFaceCss = (): string => {
  const stylesCom = getMinifiedPorscheNextFontFaceCss({ cdn: 'com' });
  const stylesCn = getMinifiedPorscheNextFontFaceCss({ cdn: 'cn' });

  const targetPath = './dist';
  const targetFileCom = 'font-face.css';
  const targetFileCn = 'font-face.cn.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFileCom}`, stylesCom);
  fs.writeFileSync(`./${targetPath}/${targetFileCn}`, stylesCn);
};

buildFontFaceCss();
