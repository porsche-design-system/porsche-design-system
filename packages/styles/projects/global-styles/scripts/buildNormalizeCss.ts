import * as fs from 'node:fs';
import { fontFamily, fontLineHeight } from '@porsche-design-system/styles';

export const buildNormalizeCss = () => {
  // -webkit-text-size-adjust: stop iOS safari from adjusting font size when screen rotation is changing
  // language=CSS
  const normalizeStyles = `html, body {
  margin: 0;
  padding: 0;
  font-family: ${fontFamily};
  line-height: ${fontLineHeight};
  letter-spacing: normal;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
}`;

  const targetPath = './dist';
  const targetFile = 'normalize.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, normalizeStyles);
};

buildNormalizeCss();
