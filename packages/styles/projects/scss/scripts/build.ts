import fs from 'node:fs';
import * as prettier from 'prettier';
import { renderScssFile, scssFileMeta } from '../src/scss';

export const buildScssStyles = async () => {
  const targetPath = './dist';

  fs.rmSync(targetPath, { force: true, recursive: true });
  fs.mkdirSync(targetPath, { recursive: true });

  // The build runs entirely off the meta-driven composition layer: every partial plus the
  // `_index.scss` `@forward` index is an ordered file descriptor in `scssFileMeta`.
  for (const fileMeta of scssFileMeta) {
    const formatted = await prettier.format(renderScssFile(fileMeta), { parser: 'scss' });
    fs.writeFileSync(`${targetPath}/${fileMeta.file}`, formatted);
    console.log(`Built ${fileMeta.file}`);
  }

  console.log('Built all SCSS styles');
};

buildScssStyles();
