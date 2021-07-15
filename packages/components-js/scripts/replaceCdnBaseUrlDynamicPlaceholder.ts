import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { CDN_BASE_URL_DYNAMIC } from '../../../cdn.config';
import { npmDistTmpSubPath } from '../projects/components-wrapper/environment';

const packageDir = path.resolve(__dirname, '..');

const readAndWriteFile = (targetFile: string): void => {
  const oldContent = fs.readFileSync(targetFile, 'utf8');
  const newContent = oldContent.replace(
    '"%%%CDN_BASE_URL_DYNAMIC%%%',
    `${CDN_BASE_URL_DYNAMIC.replace(/\s/g, '') // strip spaces
      .replace('typeof', 'typeof ')}+"` // recover space after typeof
  );
  fs.writeFileSync(targetFile, newContent);
  console.log(`Updated: ${targetFile.replace(packageDir, '.')}`);
};

const replaceCdnBaseUrlDynamicPlaceholder = () => {
  const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
  const packageDir = path.resolve(path.dirname(componentsJsFilePath), '../..');
  const tmpFilePath = path.resolve(packageDir, npmDistTmpSubPath, 'index.js');

  readAndWriteFile(componentsJsFilePath); // core loader
  readAndWriteFile(tmpFilePath); // tmp core loader
  readAndWriteFile(path.resolve(packageDir, globby.sync('./dist/components/porsche-design-system.v*')[0])); // core on cdn

  console.log(`Replaced: "%%%CDN_BASE_URL_DYNAMIC%%%" –> "${CDN_BASE_URL_DYNAMIC}"`);
};

replaceCdnBaseUrlDynamicPlaceholder();
