import fs from 'node:fs';
import * as prettier from 'prettier';
import { getTailwindcssTheme, tailwindCssMeta } from '../src';

export const buildTailwindcssTheme = async () => {
  const targetPath = './dist';
  const targetFile = tailwindCssMeta.file;
  const theme = await prettier.format(getTailwindcssTheme(), { parser: 'css' });

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, theme);

  console.log(`Built Tailwind CSS theme`);
};

buildTailwindcssTheme();
