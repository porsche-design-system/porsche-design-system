import * as fs from 'fs';
import * as path from 'path';
import { version } from '../package.json';

// unfortunately, stencil does not replace the ROLLUP_REPLACE_VERSION placeholder in the transpiled collection/components-ready.js
// that's why we do it here manually
const cleanupComponentsReady = () => {
  const srcFilePath = './dist/collection/components-ready.js';
  const srcFile = path.normalize(srcFilePath);
  const srcContent = fs.readFileSync(srcFile, 'utf8');

  const content = srcContent.replace(/ROLLUP_REPLACE_VERSION/g, `"${version}"`);

  fs.writeFileSync(srcFile, content);

  console.log(`Replaced 'ROLLUP_REPLACE_VERSION' with '"${version}"' in '${srcFilePath}'`);
};

cleanupComponentsReady();
