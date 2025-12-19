import * as fs from 'node:fs';
import { normalizeStyles } from '@porsche-design-system/shared-styles';
import * as prettier from 'prettier';

export const buildNormalizeCss = async () => {
  const targetPath = './dist';
  const targetFile = 'normalize.css';
  const normalize = await prettier.format(normalizeStyles, { parser: 'css' });

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, normalize);

  console.log(`Built Normalize CSS`);
};

buildNormalizeCss();
