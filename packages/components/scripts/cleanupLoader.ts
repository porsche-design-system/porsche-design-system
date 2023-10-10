import * as fs from 'fs';
import * as path from 'path';

const cleanupLoader = () => {
  const srcFilePath = './dist/esm/loader.js';
  const srcFile = path.normalize(srcFilePath);
  const srcContent = fs.readFileSync(srcFile, 'utf8');

  const [, lazyImport] = /(import.*?bootstrapLazy.*?);/.exec(srcContent) || [];
  const [, globalScriptsImport] = /(import.*?globalScripts.*?);/.exec(srcContent) || [];
  const [, lazyData] = /bootstrapLazy\(JSON.parse\("\[(.*)]"\),/.exec(srcContent) || [];

  if (!lazyData) {
    throw new Error('Failed cleaning up Loader. Failed matching lazyData.\n');
  }

  const directory = path.resolve(srcFilePath, '..');
  // find the file that contains definition of isBrowser util
  const [fileName] = fs.readdirSync(directory).filter((el) => !!el.match(/^validateProps-[\d\w]*.js$/));
  const filePath = path.resolve(directory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const [, hasWindowExport] = /export {.*?hasWindow as ([a-zA-Z]+).*?};/.exec(fileContent) || [];

  if (hasWindowExport === undefined) {
    throw new Error('hasWindowExport could not be extracted.');
  }

  const hasWindowImport = `import { ${hasWindowExport} as hasWindow } from './${fileName}'`;

  const content = `${lazyImport};
${globalScriptsImport};
${hasWindowImport};

export const defineCustomElements = (options) => {
  if (!hasWindow) {
    return promiseResolve();
  }

  globalScripts();
  return bootstrapLazy(
    // prettier-ignore
    [${lazyData}],
    options
  );
};
`;

  const targetFilePath = './dist/esm/loader-cleaned.js';
  const targetFile = path.normalize(targetFilePath);
  fs.writeFileSync(targetFile, `/* Auto Generated File */\n${content}`);

  console.log(`Cleaned up ${srcFilePath} => ${targetFilePath}`);
};

cleanupLoader();
