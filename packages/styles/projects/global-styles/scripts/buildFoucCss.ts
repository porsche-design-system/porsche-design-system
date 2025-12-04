import * as fs from 'node:fs';
import { foucStyles } from '@porsche-design-system/shared-styles';

export const buildFoucCss = () => {
  const targetPath = './dist';
  const targetFile = 'fouc.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, foucStyles);

  console.log(`Built FOUC CSS`);
};

buildFoucCss();
