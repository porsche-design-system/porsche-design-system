import * as fs from 'fs';
import * as path from 'path';

const cleanupLoader = () => {
  const srcFilePath = './dist/esm/loader.js';
  const srcFile = path.normalize(srcFilePath);
  const srcContent = fs.readFileSync(srcFile, 'utf8');

  const [, lazyImport] = new RegExp(/(import.*?bootstrapLazy.*?);/).exec(srcContent) ?? [];
  const [, globalScriptsImport] = new RegExp(/(import.*?globalScripts.*?);/).exec(srcContent) ?? [];
  const [, lazyData] = new RegExp(/bootstrapLazy\(\[(.*)],/).exec(srcContent) ?? [];

  const directory = path.resolve(srcFilePath, '..');
  const [fileName] = fs.readdirSync(directory).filter((el) => !!el.match(/^ssr-handling-[\d\w]*.js$/));
  const filePath = path.resolve(directory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const [, browserImport] = new RegExp(/export.*\{.*(\w) };/).exec(fileContent) ?? [];

  const isBrowserImport = `import { ${browserImport} as isBrowser } from './${fileName}'`;

  const content = `${lazyImport};
${globalScriptsImport};
${isBrowserImport};

export const defineCustomElements = (options) => {
  if (!isBrowser()) {
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
