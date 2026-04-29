import * as fs from 'node:fs';
import { fontPorscheNext, leadingNormal } from '@porsche-design-system/tokens';
import * as prettier from 'prettier';

// -webkit-text-size-adjust: stop iOS safari from adjusting font size when screen rotation is changing
// language=CSS
export const normalizeStyles = `html, body {
  margin: 0;
  padding: 0;
  font-family: ${fontPorscheNext};
  line-height: ${leadingNormal};
  letter-spacing: normal;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
}`;

export const buildNormalizeCss = async () => {
  const targetPath = './dist';
  const targetFile = 'normalize.css';
  const normalize = await prettier.format(normalizeStyles, { parser: 'css' });

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, normalize);

  console.log(`Built Normalize CSS`);
};

buildNormalizeCss();
