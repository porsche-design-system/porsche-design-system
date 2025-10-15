import * as fs from 'fs';
import * as path from 'path';

const cleanupLoader = () => {
  const srcFilePath = './dist/esm/loader.js';
  const srcFile = path.normalize(srcFilePath);
  const srcContent = fs.readFileSync(srcFile, 'utf8');

  const [, lazyImport] = /(import.*?bootstrapLazy.*?);/.exec(srcContent) || [];
  const [, globalScriptsImport] = /(import.*?globalScripts.*?);/.exec(srcContent) || [];
  const [, lazyData] = /bootstrapLazy\((JSON.parse\("\[.*]"\)),/.exec(srcContent) || [];

  if (!lazyData || !lazyImport || !globalScriptsImport) {
    throw new Error('Failed cleaning up Loader.\n');
  }

  const directory = path.resolve(srcFilePath, '..');
  // find the file that contains definition of isBrowser util
  const [fileName] = fs.readdirSync(directory).filter((el) => !!el.match(/^validateProps-[\d\w]*.js$/));
  const filePath = path.resolve(directory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // const [, hasWindowExport] = /export\s*{.*?hasWindow\s*as\s*([^,\s]+).*?};/.exec(fileContent) || [];

  // if (hasWindowExport === undefined) {
  //   throw new Error('hasWindowExport could not be extracted.');
  // }

  // const hasWindowImport = `import { ${hasWindowExport} as hasWindow } from './${fileName}'`;
  // ${hasWindowImport};

  const content = `${lazyImport};
${globalScriptsImport};

export const defineCustomElements = (options) => {
  if (!(typeof window !== 'undefined')) {
    return promiseResolve();
  }

  globalScripts();
  return bootstrapLazy(
    // prettier-ignore
    ${lazyData},
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
