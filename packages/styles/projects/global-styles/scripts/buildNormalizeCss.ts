import * as fs from 'node:fs';
import { normalizeStyles } from '@porsche-design-system/shared-styles';

export const buildNormalizeCss = () => {
  const targetPath = './dist';
  const targetFile = 'normalize.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, normalizeStyles);

  console.log(`Built Normalize CSS`);
};

buildNormalizeCss();
