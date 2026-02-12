import fs from 'node:fs';
import * as prettier from 'prettier';
import { fileMap } from './fileMap';

export const buildScssStyles = async () => {
  const targetPath = './dist';

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });

  for (const [fileName, buildScss] of Object.entries(fileMap)) {
    const formatted = await prettier.format(buildScss(), { parser: 'scss' });
    fs.writeFileSync(`${targetPath}/${fileName}`, formatted);
    console.log(`Built ${fileName}`);
  }

  console.log('Built all SCSS styles');
};

buildScssStyles();
