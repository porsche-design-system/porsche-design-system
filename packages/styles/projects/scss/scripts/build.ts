import fs from 'node:fs';
import * as prettier from 'prettier';
import { renderScssFile, scssFileMeta } from '../src/scss';
import { fileMap } from './fileMap';

export const buildScssStyles = async () => {
  const targetPath = './dist';

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });

  // Meta-driven composition layer (migrated domains: border + the `_index.scss` `@forward` index).
  for (const fileMeta of scssFileMeta) {
    const formatted = await prettier.format(renderScssFile(fileMeta), { parser: 'scss' });
    fs.writeFileSync(`${targetPath}/${fileMeta.file}`, formatted);
    console.log(`Built ${fileMeta.file}`);
  }

  // Legacy per-domain generators (not yet migrated onto the meta pipeline).
  for (const [fileName, buildScss] of Object.entries(fileMap)) {
    const formatted = await prettier.format(buildScss(), { parser: 'scss' });
    fs.writeFileSync(`${targetPath}/${fileName}`, formatted);
    console.log(`Built ${fileName}`);
  }

  console.log('Built all SCSS styles');
};

buildScssStyles();
