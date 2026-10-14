import * as fs from 'fs';
import * as path from 'path';
import { sync as globbySync } from 'fast-glob';
import { cdnDistPath, npmDistPath, npmDistTmpPath } from '../projects/components-wrapper/environment';

const packageDir = path.resolve(__dirname, '..');

// TODO: this should happen during webpack build via define plugin
const readAndWriteFile = (targetFile: string): void => {
  const oldContent = fs.readFileSync(targetFile, 'utf8');
  const [, documentKey] = oldContent.match(/,document\[([a-z])]\.cdn=/) || [];
  const newContent = oldContent.replace(
    '"%%%CDN_BASE_URL_DYNAMIC%%%',
    `document${documentKey ? '[' + documentKey + ']' : '.porscheDesignSystem'}.cdn.url+"`
  );
  fs.writeFileSync(targetFile, newContent);

  console.log(`Updated: ${targetFile.replace(packageDir, '.')}`);
};

const replaceCdnBaseUrlDynamicPlaceholder = () => {
  const componentsJsUmdFilePath = path.resolve(npmDistPath, 'cjs/index.cjs');
  const componentsJsEsmFilePath = path.resolve(npmDistPath, 'esm/index.mjs');
  const componentsJsLegacyFilePath = path.resolve(npmDistPath, 'index.js');
  const componentsJsIifeFilePath = path.resolve(npmDistTmpPath, 'index.js');
  const [coreFilePath] = globbySync(path.resolve(cdnDistPath, 'porsche-design-system.v*'));

  if (!coreFilePath) {
    throw new Error(`No core chunk found in ${cdnDistPath}`);
  }

  [
    componentsJsUmdFilePath, // core loader umd build
    componentsJsEsmFilePath, // core loader esm build
    componentsJsLegacyFilePath, // same as umd build under cjs folder but different file extension for webpack 4
    componentsJsIifeFilePath, // temporary core loader used for getLoaderScript partial
    coreFilePath, // core chunk on cdn
  ].forEach(readAndWriteFile);

  console.log(`Replaced: "%%%CDN_BASE_URL_DYNAMIC%%%" –> "document.porscheDesignSystem.cdn.url"`);
};

replaceCdnBaseUrlDynamicPlaceholder();
