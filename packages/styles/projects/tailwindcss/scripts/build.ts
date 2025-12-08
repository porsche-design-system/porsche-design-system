import fs from 'node:fs';
import * as prettier from 'prettier';
import { getTailwindcssTheme } from '../src';

export const buildTailwindcssTheme = async () => {
  const targetPath = './dist';
  const targetFile = 'index.css';
  const theme = await prettier.format(getTailwindcssTheme(), { parser: 'css' });

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, theme);

  console.log(`Built Tailwind CSS theme`);
};

buildTailwindcssTheme();
