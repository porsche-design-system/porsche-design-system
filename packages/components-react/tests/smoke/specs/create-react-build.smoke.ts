import fs from 'fs';
import path from 'path';
import { npmDistTmpSubPath } from '../../../../components-js/projects/components-wrapper/environment';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';

let reactMainChunkFileName;

fs.readdirSync('./build/static/js').forEach((fileName) => {
  if (fileName.match(/^main\..*\.chunk.js$/)) {
    reactMainChunkFileName = fileName;
  }
});
const reactMainChunkFileContent = fs.readFileSync(`build/static/js/${reactMainChunkFileName}`, 'utf8');

it('should contain initial-styles partial', () => {
  const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x));
  const tagNamesArrayAsString = '"' + tagNames.join('","') + '"';

  const regex = new RegExp(`\\[${tagNamesArrayAsString}\\].*join\\(","\\)\\+"{visibility:hidden}"`);

  expect(reactMainChunkFileContent).toMatch(regex);
});

it('should not contain loader-script partial', () => {
  const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
  const packageDir = path.resolve(path.dirname(componentsJsFilePath), '../..');
  const tmpFilePath = path.resolve(packageDir, npmDistTmpSubPath, 'index.js');
  const loaderScript = fs.readFileSync(tmpFilePath, 'utf8');

  expect(reactMainChunkFileContent).not.toContain(loaderScript);
});
